import { SECRECT_KEY } from "../config/config.js";
import UserData from "../models/userSchema.js";
import { Configuration, OpenAIApi } from "openai";
import generateBlogRequestData from "../models/generateBogRequest.js";
import sallerymanagementData from "../models/salleryManagementModel.js";
import projectsData from "../models/projectsModel.js";
import moment from "moment";
import expensesData from "../models/expensesSettings.js";
import { decryptData } from "../encryption.js";
import jwt from "jsonwebtoken";
const API_TOKEN = "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";
const expiresIn = 60;
const configuration = new Configuration({ apiKey: API_TOKEN });
const openaai = new OpenAIApi(configuration);

export const createNewUser = async (req, res) => {
  const user = req.body;

  let newUser = new UserData(user);
  UserData.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err;
    if (user) {
      res.status(200).json({
        httpCode: 409,
        status: "User already exists!",
      });
    } else {
      try {
        newUser.save();
        res.status(200).json({
          httpCode: 200,
          status: "User Added Successfully",
          newUser,
        });
      } catch (error) {
        res.status(409).json({
          status: "Network Error",
        });
      }
    }
  });
};

export const getUser = async (req, res) => {
  let firstName = req.body.firstName;
  if (firstName) {
    let data = await UserData.find({
      firstName: { $regex: new RegExp(firstName, "i") },
      // lastName: { $regex: new RegExp(lastName, 'i') }
    });
    res.send(data);
  } else {
    let data = await UserData.find();
    res.send(data);
  }

  // let data = await UserData.find({ login_id: "6479412fa0fce64ba671ac80" });
  // res.send(data);
  // if (req.body.userTypeID === 1) {
  //   let data = await UserData.find();
  //   res.send(data);
  // } else if (req.body.userTypeID === 2) {
  //   let data = await UserData.find();
  //   let filterData = data
  //     .filter((item) => item.status === true)
  //     .map((filtered) => filtered);
  //   res.send(filterData);
  // } else if (req.body.userTypeID === 3) {
  //   let data = await UserData.find();
  //   let filterData = data
  //     .filter((item) => item.status === true)
  //     .map((filtered) => filtered);
  //   res.send(filterData);
  // } else if (req.body.userTypeID === 4) {
  //   let data = await UserData.find();
  //   let filterData = data
  //     .filter((item) => item.status === false)
  //     .map((filtered) => filtered);
  //   res.send(filterData);
  // } else {
  //   res.send("Not in db");
  // }
};
export const getUsersByLoginId = async (req, res) => {
  let data = await UserData.find({ login_id: req.body.login_id });
  res.send(data);
};
// export const getTasksByLoginId = async (req, res) => {
//   let data = await generateBlogRequestData.find({
//     login_id: req.body.login_id,
//   });
//   console.log("first",data)

//   res.send(data);
// };
export const getTasksByLoginId = async (req, res) => {
  try {
    const data = await generateBlogRequestData
      .find({ login_id: req.body.login_id })
      .sort({ createdDate: -1 }); // Sorting by _id in descending order
    console.log("first", data);
    res.send(data);
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
    });
  }
};
export const editTask = async (req, res) => {
  let data = await generateBlogRequestData.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        login_id: req.body.login_id,
        estimatedTime: req.body.estimatedTime,
        createdDate: req.body.createdDate,
        estimatedTaskTime: req.body.estimatedTaskTime,
        taskName: req.body.taskName,
        status: req.body.status,
      },
    },
    { new: true }
  );
  res.send(data);
};
export const getTasksByProjectId = async (req, res) => {
  let data = await generateBlogRequestData.find({
    projectId: req.body.projectId,
  });
  res.send(data);
};
export const getCurrentDateTasksByTeamLeadResurces = async (req, res) => {
  let resorces = await UserData.find({ login_id: req.body.login_id });
  let resourceIds = resorces.map((item) => item._id);
  let taskList = await generateBlogRequestData.find();
  const tasksByResourceId = taskList.filter((task) =>
    resourceIds.toString().includes(task.login_id.toString())
  );
  const currentDate = new Date().toISOString().slice(0, 10);

  const tasksByCurrentDate = tasksByResourceId.filter(
    (task) => task.createdDate === currentDate
  );
  let totalResources = resourceIds.length;
  res.send({ tasksByCurrentDate, totalResources });
};
const projectIdFunction = async (id, keyValueData, res) => {
  let projectData = await generateBlogRequestData.find({
    projectId: id,
  });

  let allTask = await generateBlogRequestData.find();
  let findTaskWirthProjectIds = allTask.map((data) => data.projectId);
  let resources_ids = allTask.map((task) => task.login_id);

  let getExpenserate = await expensesData.find();
  let projectCostData = await projectsData.find({ _id: id });

  let resource_id = projectData.map((task) => task.login_id);
  let resourceTaskTime = projectData.map((task) => ({
    resourceName: task.resourceName,
    estimatedTime: task.estimatedTime,
    login_id: task.login_id,
  }));
  const estimatedTimes = {};

  for (let i = 0; i < resourceTaskTime.length; i++) {
    const loginId = resourceTaskTime[i].login_id;
    const estimatedTime = parseInt(resourceTaskTime[i].estimatedTime);
    const resourceName = resourceTaskTime[i].resourceName;

    if (estimatedTimes[loginId] !== undefined) {
      estimatedTimes[loginId].estimatedTime += estimatedTime;
    } else {
      estimatedTimes[loginId] = {
        estimatedTime,
        resourceName,
      };
    }
  }

  const calculatedResourceTime = [];

  for (const loginId in estimatedTimes) {
    calculatedResourceTime.push({
      login_id: loginId,
      loggedTime: parseFloat(
        (estimatedTimes[loginId].estimatedTime / 60).toFixed(2)
      ),
      resourceName: estimatedTimes[loginId].resourceName,
      salary:
        parseFloat((estimatedTimes[loginId].estimatedTime / 60).toFixed(2)) *
        10,
    });
  }
  let salaryData = await sallerymanagementData.find({
    resource_id: { $in: resource_id },
  });
  let taskCreatedByUsers = await UserData.find({
    _id: { $in: resource_id },
  });

  // Find resources from "salaryData" that match "_id" from "taskCreatedByUsers"
  const matchingResources = taskCreatedByUsers.map((user) => {
    const salary = findSalaryData(user._id);
    return salary
      ? { salary }
      : {
          salary: {
            resource_id: user._id,
            resourceName: user.firstName + " " + user.lastName,
            salleryPKR: "0",
            salleryDollar: "0",
            __v: 0,
          },
        };
  });
  function findSalaryData(resource_id) {
    let finalDataSalary = salaryData.find(
      (salary) => salary.resource_id.toString() === resource_id.toString()
    );
    return finalDataSalary;
  }

  const updatedSalaryData = matchingResources.map((data) => {
    try {
      data.salary.salleryPKR = decryptData(
        data.salary.salleryPKR,
        keyValueData
      );
      data.salary.salleryDollar = decryptData(
        data.salary.salleryDollar,
        keyValueData
      );
    } catch (error) {}
    let req = {
      resource_id: data.salary.resource_id,
      resourceName: data.salary.resourceName,
      totaExpanse: getExpenserate[0].resourceExpenses,
      salleryPKR: data.salary.salleryPKR,
      salleryDollar: data.salary.salleryDollar,
      totalSalaryInDollar:
        data.salary.salleryPKR / getExpenserate[0].dollarRate +
        data.salary.salleryDollar,
      salaryPerHour: parseFloat(
        (
          (data.salary.salleryPKR / getExpenserate[0].dollarRate +
            data.salary.salleryDollar) /
          (22 * 8)
        ).toFixed(2)
      ),
      expensePerHour: parseFloat(
        (
          getExpenserate[0].resourceExpenses /
          getExpenserate[0].dollarRate /
          (22 * 8)
        ).toFixed(2)
      ),
    };
    return req;
  });
  const combinedData = calculatedResourceTime
    .map((calculatedItem) => {
      const matchingItem = updatedSalaryData.find(
        (updatedItem) =>
          updatedItem?.resource_id?.toString() ===
          calculatedItem.login_id.toString()
      );

      if (matchingItem) {
        return {
          ...calculatedItem,
          ...matchingItem,
        };
      }

      return null;
    })
    .filter(Boolean);

  const finaResult = combinedData.map((data) => {
    // try {
    //   data.salleryPKR = decryptData(data.salleryPKR);
    //   data.salleryDollar = decryptData(data.salleryDollar);
    // } catch (error) {
    // }
    let req = {
      resource_id: data.resource_id,
      loggedTime: data.loggedTime,
      resourceName: data.resourceName,
      salleryPKR: data.salleryPKR,
      totaExpanse: data.totaExpanse,
      salleryDollar: data.salleryDollar,
      salaryPerHour: data.salaryPerHour,
      expensePerHour: data.expensePerHour,
      totalCostPerResource:
        data.salaryPerHour === 0
          ? 0
          : parseFloat(
              (
                (data.salaryPerHour + data.expensePerHour) *
                data.loggedTime
              ).toFixed(2)
            ),
    };
    return req;
  });
  let totalCost = 0;

  for (let i = 0; i < finaResult.length; i++) {
    totalCost += finaResult[i].totalCostPerResource;
  }
  //
  let finalProjectCost = projectCostData[0];
  let profitLossData = parseFloat(
    finalProjectCost?.projectCost - totalCost
  ).toFixed(2);
  res.json({
    matchingResources,
    taskCreatedByUsers,
    salaryData,
    findTaskWirthProjectIds,
    resources_ids,
    allTask,
    finaResult,
    // combinedData,
    // resourceTaskTime,
    //  calculatedResourceTime,
    // projectData,
    // updatedSalaryData,
    profitLossData,
    totalCost,
    finalProjectCost,
  });
};
export const projectProgressData = async (req, res) => {
  projectIdFunction(req.body.projectId, req.body.keyValue, res);
};

export const projectsGraphData = async (req, res) => {
  const allTask = await generateBlogRequestData.find();
  const findTaskWithProjectIds = allTask.map((data) => data.projectId);

  // Remove duplicates from the findTaskWithProjectIds array and store only unique values
  const uniqueIds = Array.from(
    new Set(findTaskWithProjectIds.map((objId) => objId?.toString()))
  );
  const projectData = await generateBlogRequestData.find({
    projectId: { $in: uniqueIds },
  });
  let resource_id = projectData.map((task) => task.login_id.toString());

  const tasksWithResourceIds = allTask.filter((data) =>
    resource_id.includes(data.login_id.toString())
  );
  const estimatedTimes = {};

  for (let i = 0; i < tasksWithResourceIds.length; i++) {
    const loginId = tasksWithResourceIds[i].login_id.toString();
    const estimatedTime = parseInt(tasksWithResourceIds[i].estimatedTime);
    const resourceName = tasksWithResourceIds[i].resourceName;

    if (estimatedTimes[loginId] !== undefined) {
      estimatedTimes[loginId].estimatedTime += estimatedTime;
    } else {
      estimatedTimes[loginId] = {
        estimatedTime,
        loginId,
        resourceName,
      };
    }
  }
  res.send({
    estimatedTimes,
    tasksWithResourceIds,
    resource_id,
    projectData,
    uniqueIds,
  });
};
export const getAllMyResourcesTasks = async (req, res) => {
  try {
    let teamLeadData = await UserData.find({ login_id: req.body.login_id });
    let data = await generateBlogRequestData.find();
    function findTasksByLoginIds(loginIds) {
      return data.filter((task) => loginIds.includes(task.login_id.toString()));
    }
    const loginIdsToFind = teamLeadData.map((task) => task._id.toString()); 
    const tasks = findTasksByLoginIds(loginIdsToFind);
    // Sorting tasks based on createdDate in descending order
    tasks.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    res.send(tasks);
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
    });
  }
};
export const getTasksByProjectManager = async (req, res) => {
  let data = await generateBlogRequestData.find({
    projectManager_id: req.body.projectManager_id,
  });
  res.send(data);
};
export const getAllTasks = async (req, res) => {
  let data = await generateBlogRequestData.find(req.body);
  // Sorting tasks by created date
  data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  res.send(data);
};
export const createTask = async (req, res) => {
  const task = req.body;
  if (req.body.projectName) {
    const newTask = new generateBlogRequestData(task);
    try {
      await newTask.save();
      res.status(201).json({
        status: "success",
        message: "Task created successfully",
        newTask,
      });
    } catch (error) {
      res.status(409).json({
        status: "Something went wrong",
      });
    }
  } else {
    res.status(409).json({
      status: "Project is required to create a task",
    });
  }
};
export const deletTask = async (req, res) => {
  const selectedUser = { _id: req.params.id };
  let data = await generateBlogRequestData.deleteOne(selectedUser);
  res.send(data);
};
export const deleteResource = async (req, res) => {
  const selectedUser = { _id: req.params.id };
  let data = await generateBlogRequestData.deleteOne(selectedUser);
  res.send(data);
};
export const deleteUser = async (req, res) => {
  const selectedUser = { _id: req.params.id };
  let data = await UserData.deleteOne(selectedUser);
  res.send(data);
};
export const updateUser = async (req, res) => {
  let data = await UserData.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        roleId: req.body.roleId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    },
    { new: true }
  );
  res.send(data);
};

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const loginUser = await UserData.findOne({ password, email });
//   const data = await UserData.find();
//   if (loginUser) {
//     //assigning token
//     const userResult = {
//       loginUser,
//     };
//     const response = {
//       success: true,
//       msg: "User login successfully",
//       data: userResult,
//     };
//     if (response.data.loginUser.status === true) {
//       res.status(201).send(response);
//     } else {
//       res.status(409).json({
//         status: "blocked",
//         message: "Please unblock first",
//       });
//     }
//   } else {
//     res.status(409).json({
//       status: "fail",
//       verifiedCode: "Please enter valid credentials",
//     });
//   }
// };
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await UserData.findOne({ email, password }); // Make sure you're querying with the correct order
  const data = await UserData.find();

  if (loginUser) {
    if (loginUser.status === true) {
      // User is not blocked
      const userResult = {
        loginUser,
      };

      // Create a JWT token
      const token = jwt.sign({ userId: loginUser._id }, SECRECT_KEY, {
        expiresIn: moment().add(8, "h").unix(), // You can set the expiration time as per your requirements
      });

      const response = {
        success: true,
        msg: "User login successfully",
        data: userResult,
        tokenExpire: moment().add(8, "h").unix(),
        token: token, // Add the JWT token to the response
      };

      res.status(201).send(response);
    } else {
      res.status(409).json({
        status: "blocked",
        message: "Please unblock first",
      });
    }
  } else {
    res.status(409).json({
      status: "fail",
      verifiedCode: "Please enter valid credentials",
    });
  }
};
