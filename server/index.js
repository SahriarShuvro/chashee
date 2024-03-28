const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
// Api Routes
const api_routes = require("./API/routers/router");


// Middleware
const middleware = [
  // express.static("public"),
  express.urlencoded({ extended: false }),
  express.json(),
];
// Use other middleware
// app.use(cors({
//   origin: "http://localhost:5173/"
// }));
app.use(middleware);

// API routes
app.use("/api", api_routes);

// Database Connection
const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_LOCAL;

// , { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB local!");
    app.listen(PORT, () => console.log(`Server running on port "http://localhost:${PORT}"`));
  })
  .catch((error) => console.error(error));
