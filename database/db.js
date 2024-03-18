import mongoose from "mongoose";
const DB_Connection = async () => {
  //  const URL='mongodb://127.0.0.1:27017/googlesheetdatabase';
  const URL = "mongodb://xeven-mongo:GYlWafdbgLmpCuQWVSCzOvhrMNyqoj@ec2-13-233-57-130.ap-south-1.compute.amazonaws.com:27041/googlesheetdatabase"

  try {
    const resp = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("resp")
  } catch (error) {
    console.log("error", error)
  }
};

export default DB_Connection;
