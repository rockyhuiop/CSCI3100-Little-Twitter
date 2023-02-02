import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./User";

export interface IComment {
  authorId: Types.ObjectId;
  body: string;
  children: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITweet {
  body: string;
  authorId: Types.ObjectId;
  author: IUser;
  // comments: Comment[];
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// const commentSchema = new mongoose.Schema<IComment>(
//   {
//     body: {
//       type: String,
//       required: true,
//     },
//     authorId: Schema.Types.ObjectId,
//   },
//   {
//     timestamps: true,
//   }
// );

// commentSchema.add({
//   children: [commentSchema],
// });

const schema = new mongoose.Schema<ITweet>(
  {
    body: {
      type: String,
    },
    authorId: Schema.Types.ObjectId,
    // comments: [commentSchema],
    likes: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

export const Tweet = mongoose.model("tweet", schema);
