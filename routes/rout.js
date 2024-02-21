import express from "express";
import {
  getUser,
  deleteUser,
  updateUser,
  loginUser,
  createNewUser,
  getUsersByLoginId,
  getAllTasks,
  createTask,
  deleteResource,
  getTasksByLoginId,
  deletTask,
  getTasksByProjectManager,
  getTasksByProjectId,
  projectProgressData,
  editTask,
  getAllMyResourcesTasks,
  getCurrentDateTasksByTeamLeadResurces,
  projectsGraphData,
} from "../controllers/userController.js";
import {
  createNewProject,
  deleteProject,
  editProject,
  getAllProject,
} from "../controllers/prjectsController.js";
import {
  createNewTeam,
  deleteTeam,
  editTeam,
  getAllTeams,
  getAllTeamsByoginID,
} from "../controllers/projectTeamController.js";
import {
  createNewSalleryResource,
  deleteSalleryResource,
  editSalleryResource,
  getAllSalleryResources,
  getSalleryByResourceId,
  matchEncryptionKeyValue,
} from "../controllers/salleryMangementCoontroller.js";
import {
  createExpenses,
  editExpense,
  getExpenses,
} from "../controllers/expensesSettingController.js";
const router = express.Router();
/**
 * @openapi
 * /getUsersData:
 *   post:
 *     - Bearer: []
 *      summary: test authorization
 *      tags: [User]
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getUsersData", getUser);
/**
 * @openapi
 * /getAllTasks:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *                resourceName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *                projectName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *                taskName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *                createdDate:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getAllTasks", getAllTasks);
/**
 * @swagger
 * /createTask:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *              projectId:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *              projectManager_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               taskName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               createdTime:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               createdDate:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               estimatedTime:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               estimatedDate:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               status:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               resourceName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectManagerName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               estimatedTaskTime:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *        description: Returns a mysterious string.
 */
router.post("/createTask", createTask);
/**
 * @swagger
 * /createTeam:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectManager_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectId:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               resources:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectManagerName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *        description: Returns a mysterious string.
 */
router.post("/createTeam", createNewTeam);
/**
 * @swagger
 * /editTask/{id}:
 *   put:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.put("/editTask/:id", editTask);
/**
 * @swagger
 * /editTeam/{id}:
 *   put:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.put("/editTeam/:id", editTeam);
/**
 * @swagger
 * /editProject/{id}:
 *   put:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.put("/editProject/:id", editProject);
/**
 * @swagger
 * /editSalleryResource/{id}:
 *   put:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.put("/editSalleryResource/:id", editSalleryResource);
/**
 * @swagger
 * /deleteTeam/{id}:
 *   delete:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.delete("/deleteTeam/:id", deleteTeam);
/**
 * @swagger
 * /deleteProject:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *        description: Returns a mysterious string.
 */
router.post("/deleteProject/", deleteProject);
/**
 * @swagger
 * /deleteSalleryResource:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resource_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *        description: Returns a mysterious string.
 */
router.post("/deleteSalleryResource/", deleteSalleryResource);
// /**
//  * @swagger
//  * /deleteProject/{id}:
//  *   delete:
//  *     summary: Retrieve a single JSONPlaceholder user.
//  *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: Numeric ID of the user to retrieve.
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *       description: Returns a mysterious string.
//  */
// router.delete("/deleteProject/:id", deleteProject);
/**
 * @openapi
 * /getAllProject:
 *   post:
 *     - Bearer: []
 *      summary: test authorization
 *      tags: [User]
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getAllProject", getAllProject);
/**
 * @openapi
 * /getAllTeams:
 *   post:
 *     - Bearer: []
 *      summary: test authorization
 *      tags: [User]
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getAllTeams", getAllTeams);
/**
 * @openapi
 * /getUsers:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/getUsers", getUser);
/**
 * @openapi
 * /getExpenses:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/getExpenses", getExpenses);
/**
 * @openapi
 * /createExpenses:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                resourceExpenses:
 *                 type: integer
 *                 description: The user's name.
 *                 example: integer
 *                dollarRate:
 *                 type: integer
 *                 description: The user's name.
 *                 example: integer
 *     responses:
 *       201:
 *         description: Returns a mysterious integer.
 */
router.post("/createExpenses", createExpenses);
/**
 * @swagger
 * /editExpense/{id}:
 *   put:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.put("/editExpense/:id", editExpense);
/**
 * @openapi
 * /projectsGraphData:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/projectsGraphData", projectsGraphData);
/**
 * @openapi
 * /projectProgressData:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                projectId:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *                keyValue:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/projectProgressData", projectProgressData);
/**
 * @openapi
 * /getUsersByLoginId:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getUsersByLoginId", getUsersByLoginId);
/**
 * @openapi
 * /getAllTeamsByLoginID:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getAllTeamsByLoginID", getAllTeamsByoginID);
/**
 * @openapi
 * /createProject:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectCost:
 *                 type: integer
 *                 description: The user's name.
 *                 example: integer
 *               projectTimeline:
 *                 type: integer
 *                 description: The user's name.
 *                 example: integer
 *               projectStartDate:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectEndDate:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               projectStatus:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/createProject", createNewProject);
/**
 * @openapi
 * /matchEncryptionKeyValue:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                keyValue:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/matchEncryptionKeyValue", matchEncryptionKeyValue);
/**
 * @openapi
 * /createNewSalleryResource:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resource_id:
 *                 type: string
 *                 description: The resource id.
 *                 example: string
 *               resourceName:
 *                 type: string
 *                 description: The resource Name.
 *                 example: string
 *               salleryDollar:
 *                  type: integer
 *                 description: The salleryDollar is.
 *                 example: integer
 *               salleryPKR:
 *                  type: integer
 *                 description: The salleryPKR is.
 *                 example: integer
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/createNewSalleryResource", createNewSalleryResource);
/**
 * @openapi
 * /getSalleryByResourceId:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                resource_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getSalleryByResourceId", getSalleryByResourceId);
/**
 * @openapi
 * /getAllSalleryResources:
 *   post:
 *     - Bearer: []
 *      summary: test authorization
 *      tags: [User]
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resourceName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getAllSalleryResources", getAllSalleryResources);
/**
 * @openapi
 * /createNewUser:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login_id:
 *                 type: string
 *                 description: The user login id.
 *                 example: string
 *               firstName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               lastName:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               password:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               roleId:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/createNewUser", createNewUser);
/**
 * @openapi
 * /getCurrentDateTasksByTeamLeadResurces:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post(
  "/getCurrentDateTasksByTeamLeadResurces",
  getCurrentDateTasksByTeamLeadResurces
);
/**
 * @openapi
 * /getTasksByProjectId:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                projectId:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getTasksByProjectId", getTasksByProjectId);
/**
 * @openapi
 * /getTasksByLoginId:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getTasksByLoginId", getTasksByLoginId);
/**
 * @openapi
 * /getAllMyResourcesTasks:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getAllMyResourcesTasks", getAllMyResourcesTasks);
/**
 * @openapi
 * /getTasksByProjectManager:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                login_id:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/getTasksByProjectManager", getTasksByProjectManager);
/**
 * @swagger
 * /loginUser:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: string
 *     responses:
 *       201:
 *         description: Returns a mysterious string.
 */
router.post("/loginUser", loginUser);
/**
 * @swagger
 * /deletTask/{id}:
 *   delete:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.delete("/deletTask/:id", deletTask);
/**
 * @swagger
 * /deleteResource/{id}:
 *   delete:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.delete("/deleteResource/:id", deleteResource);
/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.delete("/delete/:id", deleteUser);
/**
 * @swagger
 * /updateUser/{id}:
 *   put:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *       description: Returns a mysterious string.
 */
router.put("/updateUser/:id", updateUser);
export default router;
