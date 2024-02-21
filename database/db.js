import mongoose from "mongoose";
const DB_Connection = async () => {
  //  const URL='mongodb://127.0.0.1:27017/googlesheetdatabase';
   const URL ="mongodb+srv://Google-Sheet-Admin:10Pi2xpjyQ3ZG3pE@mongo-db-server.n0xvzzq.mongodb.net/googlesheetdatabase";
  //   const URL="mongodb+srv://Google-Sheet-Admin:10Pi2xpjyQ3ZG3pE@mongo-db-server.n0xvzzq.mongodb.net/test";
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {}
};

export default DB_Connection;
