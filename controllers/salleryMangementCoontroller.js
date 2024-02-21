import config from "../config/config.js";
import { decryptData, encryptData } from "../encryption.js";
import sallerymanagementData from "../models/salleryManagementModel.js";
const { secret_key, secret_iv, ecnryption_method } = config;
export const createNewSalleryResource = async (req, res) => {

  const user = req.body;
  const keyValue = req.body.keyValue;
  const encryptedDataSalaryPKR = encryptData(user.salleryPKR.toString(),keyValue);
  const encryptedDataSalaryDollar = encryptData(user.salleryDollar.toString(),keyValue);
  user.salleryPKR = encryptedDataSalaryPKR;
  user.salleryDollar = encryptedDataSalaryDollar;

  let newProject = new sallerymanagementData(user);
  sallerymanagementData.findOne(
    { resource_id: req.body.resource_id },
    function (err, user) {
      if (err) throw err;
      if (user) {
        res.status(404).json({
          status: "Resource already exists!",
          statusCode: 404,
        });
      } else {
        try {
          newProject.save();
          res.status(200).json({
            status: "Resource Added Successfully",
            statusCode: 200,
            newProject,
          });
        } catch (error) {
          res.status(409).json({
            status: "Network Error",
          });
        }
      }
    }
  );
};
export const getAllSalleryResources = async (req, res) => {
  let resourceName = req.body.resourceName;
  if (resourceName) {
    let data = await sallerymanagementData.find({
      resourceName: { $regex: new RegExp(resourceName, "i") },
      // lastName: { $regex: new RegExp(lastName, 'i') }
    });
    res.send(data);
  } else {
    let data = await sallerymanagementData.find();
    res.send(data);
  }
  // let data = await sallerymanagementData.find();
  // res.send(data);
};
export const getSalleryByResourceId = async (req, res) => {
  const resource_id = req.body.resource_id;
  let data = await sallerymanagementData.find({
    resource_id: { $in: resource_id },
  });
  res.send(data);
};
export const matchEncryptionKeyValue = async (req, res) => {
  let enteredKey=req.body.keyValue
  let data = await sallerymanagementData.find();

  const updatedSalaryData = data.map((data) => {
    try {
      data.salleryPKR = decryptData(data.salleryPKR,enteredKey);
      data.salleryDollar = decryptData(data.salleryDollar,enteredKey);
    } catch (error) {
    }
    let req = {
      resource_id: data.resource_id,
      resourceName: data.resourceName,
      salleryPKR: data.salleryPKR,
      salleryDollar: data.salleryDollar,
    };
    return req;
  });
  const keyValue = req.body.keyValue;
  let keyData = req.body.keyValue;

  if (keyData === keyValue) {
    res.send({ httpStatusCode: 200, data: updatedSalaryData });
  } else {
    res.send("Please enter valid key");
  }
};

export const editSalleryResource = async (req, res) => {
  try {
    await sallerymanagementData.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          salleryDollar: req.body.salleryDollar,
          salleryPKR: req.body.salleryPKR,
        },
      },
      { new: true }
    );

    res.send("Updated successfully");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
};
export const deleteSalleryResource = async (req, res) => {
  const selectedUser = { _id: req.body.resource_id };
  let data = await sallerymanagementData.deleteOne(selectedUser);
  res.send(data);
};
