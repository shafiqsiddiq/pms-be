import mongoose from "mongoose";
const prjectSchema = new mongoose.Schema({
  projectName: String,
  projectCost: Number,
  projectTimeline: Number,
  projectStartDate: String,
  projectEndDate: String,
  projectStatus: String,

});
const projectsData = mongoose.model(
  "projects",
  prjectSchema
);

export default projectsData;