const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const middlewareConfig = require("./system/middleware.js/config");
const { default: mongoose } = require("mongoose");
const route = require("./api/Slot_Game/route");
const playerRoutes = require("./api/Players/route");

if (process.env.NODE_ENV === "local") {
  require("dotenv").config({
    path: `./${process.env.NODE_ENV}.env`,
  });
} else {
  require("dotenv").config({
    path: `./local.env`,
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(middlewareConfig.cors));
app.use(helmet());
app.use(morgan(middlewareConfig.morganRequestFormat));
app.use(express.urlencoded({ extended: true }));

//public route
app.get("/", () => {
  res.send("hello world");
});

mongoose
  .connect(
    `${process.env.MONGO_CONN_STRING}${process.env.MONGO_DB_NAME}?authSource=${process.env.MONGO_AUTH_SOURCE}`
  )
  .then(() => console.log("mongoose connected successfully"))
  .catch((err) => err);

app.use("/api/players", playerRoutes);
app.use("/api", route);

app.listen(process.env.PORT || 4000, function () {
  console.log("Server is running port " + (process.env.PORT || 4000));
});
