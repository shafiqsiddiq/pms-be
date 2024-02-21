import mongoose from "mongoose";
const generateBlogRequestSchema = new mongoose.Schema({
  login_id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  projectId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
  },
  projectManager_id: {
    required: true,
    type: mongoose.Schema.Types.Array,
    ref: "teamleads",
  },
  taskName: String,
  createdTime: String,
  createdDate: String,
  projectName: String,
  resourceName: String,
  estimatedTime: String,
  estimatedDate: String,
  estimatedTaskTime: String,
  projectManagerName:Array,
  status: {
    type: String,
  },
});
const generateBlogRequestData = mongoose.model(
  "resourcetasks",
  generateBlogRequestSchema
);

export default generateBlogRequestData;
