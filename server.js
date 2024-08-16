const express = require("express");
require("dotenv").config();
const { client } = require("./main");
const app = express();

app.use(express.json());
client.initialize();
const port = process.env.port;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
