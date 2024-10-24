//WE'LL BE USING THE ASYNCHANDLER WRAPPER FOR ALL THE CONTROLLERS
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary"

//REGISTER USER
export const registerUser = async (req, res) => {
  //1. GET DETAILS FROM CLIENT
  const { username, fullName, email, password } = req.body;
  //if any details is missing return err
  if (
    //if a field exists, but after trimming if it's "", then the field is missing
    [username, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //2. CHECK IF THE USER ALREADY EXISTS
  const existedUser = await User.findOne({
    $or: [{ username }, { email }], //checking if any of these field is already existing
  });
  if (existedUser) {
    throw new ApiError(409, "User with this username/email already exists!");
  }

  //3. CHECK FOR IMAGES IN LOCALPATH AND UPLOAD IN CLOUDINARY
  //just like how express provides "req.body", multer provides "req.files"
  const avatarLocalPath = req.file?.path;

  //since avatar is required, throw error if avatar is not found


  const avatar = await uploadOnCloudinary(avatarLocalPath);
 
  //just double checking
  // if (!avatar) throw new ApiError(400, "Avatar is required!");

  //4. ONCE WE HAVE ALL THE REQUIRED DETAILS SEND IT TO THE DATABASE
  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar?.url,
  });

  //5. CHECK IF THE USER IS CREATED SUCCESSFULLY
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); //deselect password and refreshToken

  if (!createdUser) throw new ApiError(500, "Failed to create the user");

  //6. ONCE USER IS CREATED SEND THE DETAILS AS RESPONSE
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
};

//LOGIN USER
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId); //get user from database using the id

    const accessToken = user.generateAccessToken(); //this method is declared in model
    const refreshToken = user.generateRefreshToken();

    //store the refresh token in the database
    user.refreshToken = refreshToken;
    //before saving the default is to check if every required field exists or not. So here we just care about saving the refreshToken.
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
export const loginUser = asyncHandler(async (req, res) => {
  //1. GET DATA FROM CLIENT AND CHECK IF THEY EXIST
  const { username, password } = req.body;
  if (!username) throw new ApiError(400, "Username is required!");

  //2. GET THE USER FROM DATABASE
  const user = await User.findOne({ username });
  if (!user) throw new ApiError(404, "User doesn't exist!");
  //3. CHECK IF THE PASSWORD IS CORRECT (WE HAVE ALREADY CREATED A FUNCTION FOR IT IN USER MODEL)
  const isPasswordValid = await user.isPasswordCorrect(password); //returns boolean
  if (!isPasswordValid) throw new ApiError(400, "Credentials Incorrect!");

  //4. GENERATE ACCESS AND REFRESH TOKENS USING A METHOD
  const { accessToken, refreshToken } = await generateTokens(user._id);

  //5. ONCE REFRESH TOKEN IS STORED GET THE USER WITHOUT PASSWORD AND REFRESH TOKEN
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //6. SEND THE TOKENS AS COOKIES AND THE USER DETAILS IN JSON
  const cookieOption = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, cookieOption)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully!"
      )
    );
});

//LOGOUT USER
export const logoutUser = asyncHandler(async (req, res) => {
  //1. GET THE USER DETAILS FROM REQ (AVAILABLE THROUGH MIDDLEWARE)
  const userId = req.user._id;

  //2. ONCE YOU GET THE USER ID, DELETE THE REFRESH TOKEN FOR THE USER
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const cookieOption = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOption)
    .clearCookie("refreshToken", cookieOption)
    .json(new ApiResponse(200, {}, "User logged out Successfully!"));
});

//REFRESH ACCESS TOKENS: WE KNOW THAT ACCESS TOKEN HAVE SHORT LIFE SPAN, ONCE THE ACCESS TOKEN IS EXPIRED THE USER GETS LOGGED OUT AUTOMATICALLY AND HAS TO GO THROUGH THE LOGIN PROCESS AGAIN. TO OVER COME THIS RELOGIN, WE CAN USE THE REFRESH TOKEN TO GENERATE A NEW ACCESS TOKEN FOR THE USER AND MAKE THEM STAY LOGGED IN UNLESS THEY WILLINGLY LOGOUT
export const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    //assuming the access token has expired

    //1. GET THE REFRESH TOKEN FROM COOKIES
    const incomingRefreshToken = req.cookies?.refreshToken;
    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

    //2. DECODE THE REFRESH TOKEN
    const decodedRefreshToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    //3. WE HAVE ONLY USER ID IN THE REFRSH TOKEN PAYLOAD, USE IT TO GET THE USER FROM DB
    const user = await User.findById(decodedRefreshToken?._id);
    if (!user) throw new ApiError(401, "Invalid refresh Token");

    //4. NOW CHECK IF THE REFRESH TOKEN OF THE USER AND REFRESH TOKEN IN COOKIES IS THE SAME
    if (incomingRefreshToken != user.refreshToken)
      throw new ApiError("Refresh token doesn't match");

    //5. IF EVERYTHING'S FINE, GENERATE A NEW ACCESS TOKEN AND REFRESH TOKEN FOR THE USER
    const { newAccessToken, newRefreshToken } = await generateTokens(user._id);

    const cookieOption = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", newAccessToken, cookieOption)
      .cookie("refreshToken", newRefreshToken, cookieOption)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken, refreshToken: newRefreshToken },
          "Tokens refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

//CHANGE USER PASSWORD
export const changeCurrentPassword = asyncHandler(async (req, res) => {
  //1. GET THE REQUIRED DETAILS FROM CLIENT
  const { oldPassword, newPassword } = req.body;

  //2. GET USER ID FROM MIDDLEWARE AND FIND THE USER IN DATABASE
  const userId = req.user?._id;
  const user = await User.findById(userId);

  if (!user) throw new ApiError(400, "User does not exist");

  //3. CHECK THE OLD PASSWORD WITH THE CURRENT PASSWORD IN THE DATABASE
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) throw new ApiError(400, "Password incorrect");

  //4. IF OLD PASS IS CORRECT, SET NEW PASSWORD
  user.password = newPassword; //the password will be hashed using the method created in model
  await user.save({ validateBeforeSave: false }); //we don't need to check other validations

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully!"));
});

//GET CURRENT USER DETAILS
export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully!"));
});

//UPDATE USER DETAILS
export const updateUserDetails = asyncHandler(async (req, res) => {
  //1. GET THE DETAILS TO BE UPDATED
  const { username, email, fullName } = req.body;
  if (!username && !email && !fullName)
    throw new ApiError(400, "Atleast one field is required to update!");

  //2. GET THE USER FROM THE DATABASE AND UPDATE THE DETAILS
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        username,
        email,
        fullName,
      },
    },
    { new: true }
  ).select("-password -refreshToken");
  if (!user)
    throw new ApiError(400, "User cannot be found, while updating details!");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Details updated successfully"));
});

//UPDATE USER AVATAR
export const updateUserAvatar = asyncHandler(async (req, res) => {
  //1. GET THE LOCAL PATH OF AVATAR STORED USING MULTER MIDDLEWARE
  const avatarLocalPath = req.file?.path; //we are uploading only one file using multer, so req.file not req.files
  console.log(avatarLocalPath)
  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing!");

  //2. DELETE EXISTING FILE IN CLOUDINARY
  //get the user avatar link
  const currUser = await User.findById(req.user?._id);
  //if avatar already exists delete it in cloudinary
  if (currUser.avatar) {
    const avatarUrl = cloudinary.url(currUser.avatar);

    // match the image id using regex
    const match = avatarUrl.match(/\/v\d+\/(.+?)\.\w+$/);

    // if match found, store it in publicId and delete the existing image
    if (match && match[1]) {
      const imageId = match[1];
      await cloudinary.uploader.destroy(imageId);
    } else {
      console.error("Failed to extract image ID from the existing avatar URL.");
    }
  }

  //3. UPLOAD THE FILE IN CLOUDINARY
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) throw new ApiError(400, "Error while uploading the avatar!");
 
  // 4. UPDATE THE AVATAR IN DATABASE
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar?.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  //5. RETURN THE UPDATED DETAILS
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully!"));
});



