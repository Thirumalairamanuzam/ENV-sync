import { Initiative } from "../models/initiative.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createInitiative = asyncHandler(async (req, res) => {
  //1. GET THE DETAILS
  const { initiative_name, area_conducted, event_date } = req.body;
  const userId = req.user._id;
  if(!userId) throw new ApiError("400", "You are not authorized!")

  //if any details is missing return err
  if (
    //if a field exists, but after trimming if it's "", then the field is missing
    [initiative_name, area_conducted, event_date].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //2. GET BANNER IMAGE
  const bannerLocalPath = req.file?.path;
  console.log(req.file)
  //since avatar is required, throw error if avatar is not found
  if (!bannerLocalPath) throw new ApiError(400, "Banner image is required!");

  const banner = await uploadOnCloudinary(bannerLocalPath);
 
  //just double checking
  if (!banner) throw new ApiError(400, "Banner is required!");

  //3. CREATE AN ENTRY
  const initiative = await Initiative.create({
    initiative_name,
    area_conducted,
    event_date,
    owner: userId,
    banner: banner.url
  })

  if(!initiative) throw new ApiError(500, "Initiative creation failed!");

  return res 
  .status(200)
  .json(
    new ApiResponse(200, initiative, "Initiative Created successfully!")
  )
});
