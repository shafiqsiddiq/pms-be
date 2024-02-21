import projectTeamData from "../models/projectTeamModel.js";

export const createNewTeam = async (req, res) => {
  const team = req.body;
  const { projectName } = req.body;
  let newTeam = new projectTeamData(team);
  projectTeamData.findOne(
    {projectName},
    function (err, team) {
      if (err) throw err;
      if (team) {
        res.status(409).json({
          message: "Team already exists!",
        });
      } else {
        try {
          newTeam.save();
          res.status(200).json({
            status: "Team Added Successfully",
            newTeam,
          });
        } catch (error) {
          res.status(409).json({
            message: "Network Error",
          });
        }
      }
    }
  );
};
export const getAllTeams = async (req, res) => {
  let projectName = req.body.projectName;
  if (projectName) {
      let data = await projectTeamData.find({
        projectName: { $regex: new RegExp(projectName, 'i') },
        // lastName: { $regex: new RegExp(lastName, 'i') }
      });
      res.send(data);
    
  } else {
    let data = await projectTeamData.find();
    res.send(data);
  }
 
};
export const getAllTeamsByoginID = async (req, res) => {
  let data = await projectTeamData.find({ login_id: req.body.login_id });
  res.send(data);
};

export const editTeam = async (req, res) => {
  let data = await projectTeamData.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        login_id: req.body.login_id,
        resources: req.body.resources,
        projectManager_id: req.body.projectManager_id,
        projectManagerName: req.body.projectManagerName,
        projectName: req.body.projectName,
        // teamName: req.body.teamName,
      },
    },
    { new: true }
  );
  res.send(data);
};
export const deleteTeam = async (req, res) => {
  const selectedUser = { _id: req.params.id };
  let data = await projectTeamData.deleteOne(selectedUser);
  res.send(data);
};
