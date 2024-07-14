const config = require("config");
const cors = require("cors");
const express = require("express");

const HOST = config.get("server.host");
const PORT = config.get("server.port");
const DB_CONNECTION_STRING = config.get("db.connectionstring");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send(`Show time backedn is running`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
