import generateBlogRequestData from "../models/generateBogRequest.js";
import projectTeamData from "../models/projectTeamModel.js";
import projectsData from "../models/projectsModel.js";

export const createNewProject = async (req, res) => {
  const user = req.body;
  let newProject = new projectsData(user);
  projectsData.findOne(
    { projectName: req.body.projectName },
    function (err, user) {
      if (err) throw err;
      if (user) {
        res.status(200).json({
          status: "Project already exists!",
        });
      } else {
        try {
          newProject.save();
          res.status(200).json({
            status: "Project Added Successfully",
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
export const getAllProject = async (req, res) => {
  let projectName = req.body.projectName;
  if (projectName) {
    let data = await projectsData.find({
      projectName: { $regex: new RegExp(projectName, "i") },
      // lastName: { $regex: new RegExp(lastName, 'i') }
    });
    res.send(data);
  } else {
    let data = await projectsData.find();
    res.send(data);
  }
};

export const editProject = async (req, res) => {
  try {
    // Update logic for Collection Tasks
    await generateBlogRequestData.findOneAndUpdate(
      { projectId: req.params.id },
      {
        $set: {
          projectName: req.body.projectName,
        },
      }
    );
     // Update logic for Collection Team Projects
    await projectTeamData.findOneAndUpdate(
      { projectId: req.params.id },
      {
        $set: {
          projectName: req.body.projectName,
        },
      }
    );

    // Update logic for Collection Projects
    await projectsData.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          projectName: req.body.projectName,
          projectCost: req.body.projectCost,
          projectTimeline: req.body.projectTimeline,
          projectStartDate: req.body.projectStartDate,
          projectEndDate: req.body.projectEndDate,
        },
      },
      { new: true }
    );

    // Update logic for Collection 3
    // await Collection3Model.updateMany({}, { $set: req.body });

    res.send("Collections updated successfully");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
  // let data = await projectsData.findOneAndUpdate(
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       projectName: req.body.projectName,
  //     },
  //   },
  //   { new: true }
  // );

  // res.send([data]);
};
export const deleteProject = async (req, res) => {
  // const selectedUser = { projectId: req.body.projectId,projectName:req.body.projectName };
  // let data = await projectsData.deleteOne(selectedUser);
  // res.send(data);
  const selectedUser = { projectName: req.body.projectName };
  let dataFind = await generateBlogRequestData.findOne({
    projectName: req.body.projectName,
  });
  if (dataFind) {
    res.send({
      message: "Project have tasks, Cann't delete this project",
      statucCde: 404,
    });
  } else {
    const selectedUser = {
      projectId: req.body.projectId,
      projectName: req.body.projectName,
    };
    let data = await projectsData.deleteOne(selectedUser);
    res.send({
      message: "Project deleted successfully",
      statucCde: 200,
      data: data,
    });
  }
};
export const getAllTasks = async (req, res) => {
  let data = await generateBlogRequestData.find(req.body);

  res.send(data);
};
