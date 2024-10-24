import { Initiative } from "../models/initiative.model.js";
import { Volunteer } from "../models/volunteer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

//1. REGISTER FOR AN INITIATIVE
export const regiterInitiative = asyncHandler(async(req, res)=>{
    const {eventId} = req.params
    if(!eventId) throw new ApiError(401, "Cannot get the innitiative id!")

    const availableEvent = await Initiative.findById(eventId);
    if(!availableEvent) throw new ApiError(404, "Event not found");

    //IF ALREADY REGISTERED, DON'T LET THEM REGISTER AGAIN
    const alreadyRegister = await Volunteer.find({initiative: eventId})
    if(alreadyRegister) throw new ApiError(400, "You are already registered for this event!");

    const userId = req.user._id;
    if(!userId) throw new ApiError(400, "You are unauthorized!");

    const volunteer = await Volunteer.create({
        user: userId,
        initiative: eventId
    })

    if(!volunteer) throw new ApiError(500, "Failed to register for the event!");

    return res 
    .status(200)
    .json(
        new ApiResponse(200, volunteer, "successfully registered for the event!")
    )
})


//2. VOLUNTEERS REGISTERED EVENTS
export const totalRegisteredEvents = asyncHandler(async(req, res)=>{
    const userId = req.user._id;

    const events = await Volunteer.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId) // Filter by user ID
          }
        },
        {
          $lookup: {
            from: "initiatives", // Name of the collection to perform the lookup (assuming it's named "events")
            localField: "initiative", // Field from the Volunteer collection
            foreignField: "_id", // Field from the Events collection
            as: "eventDetails" // Output array field that will contain the matched documents
          }
        },
        {
          $unwind: "$eventDetails" // Deconstruct the eventDetails array
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            user: 1, // Include the user field
            initiative: 1, // Include the initiative field
            eventDetails: 1 // Include the eventDetails field
          }
        }
      ]);

      if(!events) throw new ApiError(400, "Event not available!")

      return res 
      .status(200)
      .json(
        new ApiResponse(200, events, "Events fetched successfully!")
      )
      
})