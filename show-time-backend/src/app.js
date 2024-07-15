const config = require("config");
const env = require("dotenv");
const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const authenticationRouter = require("./routes/authentication");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");
const logger = require("./util/logger");

// Constants
const HOST = config.get("server.host");
const PORT = config.get("server.port");
const DB_CONNECTION_STRING = config.get("db.connectionstring");

//Swagger definition

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Show Time API",
      version: "1.0.0",
      description: "Show Time Backed API documentation",
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json());

// logger configuration
// const accessLogStream = rfs.createStream("access.log", {
//   size: "10M",
//   interval: "1d",
//   path: path.join(__dirname, "./../logs"),
//   stream: {
//     write: (message) => {
//       logger.info(message);
//     },
//   },
// });
const morganFormat = ":method :url :status :response-time ms";

// app.use(morgan("dev"));
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use("/authentication", authenticationRouter);

app.get("/", async (req, res) => {
  res.send(`Show time backedn is running`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  logger.info("Server is running");
  logger.debug("Server is running");
});
