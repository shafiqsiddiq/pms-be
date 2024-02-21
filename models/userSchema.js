import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  login_id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teamleads',
  },
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  roleId: String,
  userProfileImageUrl:String,
  status: {
    type: Boolean,
    default: true,
  },
});
const UserData = mongoose.model("teamleads", userSchema);

export default UserData;
