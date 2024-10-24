import mongoose, { Schema } from "mongoose";

const initiativeSchema = new Schema(
  {
    initiative_name: {
      type: String,
      required: true,
    },

    area_conducted: {
      type: String,
      required: true,
    },

    event_date: {
      type: Date,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    banner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Initiative = mongoose.model("Initiative", initiativeSchema)