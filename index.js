import express from "express";
import DB_Connection from "./database/db.js";
import router from "./routes/rout.js";
import cors from "cors";
import bodyParser from "body-parser";
import DB_Connection2 from "./routes/rout.js";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";
import config from "dotenv";
const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Google Sheet Management",
      version: "1.0.0",
    },
    // servers: [
    //   {
    //     url: "",
    //   },
    // ],
  },

  apis: ["./routes/rout*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
const openapiSpecification = swaggerJSDoc(options);
app.use(
  "/api-docs",
  SwaggerUI.serve,
  SwaggerUI.setup(swaggerSpec, {
    explorer: true,
    security: [{ jwt: [] }],
  })
);
// app.use('/api-docs',SwaggerUI.serve,SwaggerUI.setup(openapiSpecification))
app.use(cors());
app.use(express.json());
app.use("/", router);
const PORT = process.env.PORT || 9000;
DB_Connection();

app.listen(PORT, () =>
  console.log(`server is running successfully on Port http://localhost:${PORT}`)
);
