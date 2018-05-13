const mongoose = require('mongoose');

import commentSchema from "./comments";

const IssuesSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema]
});

const Issues = mongoose.model('Issues', IssuesSchema);

export default Issues;
