import mongoose from "mongoose";
const sallerymanagementSchema = new mongoose.Schema({
  resource_id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "teamleads",
  },
 
  resourceName:String,
  salleryPKR:String,
  salleryDollar:String,
});
const sallerymanagementData = mongoose.model("sallerymanagement", sallerymanagementSchema);

export default sallerymanagementData;
