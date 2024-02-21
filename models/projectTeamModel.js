import mongoose from "mongoose";
const projectTeamSchema = new mongoose.Schema({
  login_id: {
    required: true,
    type: mongoose.Schema.Types.Array,
    ref: "teamleads",
  },
  projectManager_id: {
    required: true,
    type: mongoose.Schema.Types.Array,
    ref: "teamleads",
  },
  projectId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
  },
  projectManagerName:Array,
  projectName:String,
  // projectCost: String,
  resources: Array,
});
const projectTeamData = mongoose.model("projectteams", projectTeamSchema);

export default projectTeamData;
