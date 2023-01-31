import mongoose, { Schema, Types } from "mongoose";

interface Comment {
  author: Types.ObjectId,
  body: string;
  children: Comment[];
}

interface Tweet {
  body: string;
  author: Types.ObjectId,
  comments: Comment[];
  reactions: {
    // dislike or like
    value: -1 | 1,
    author: Types.ObjectId 
  }[];
}

const commentSchema = new mongoose.Schema<Comment>({
  body: {
    type: String,
    required: true
  },
  author: Schema.Types.ObjectId,
})

commentSchema.add({
  children: [commentSchema]
})

const schema = new mongoose.Schema<Tweet>({
 body: {
  type: String 
 },
 author: Schema.Types.ObjectId,
 comments: [commentSchema],
 reactions: [{
  value: Number,
  author: Types.ObjectId
 }] 
});  

export const Tweet = mongoose.model("tweet", schema);