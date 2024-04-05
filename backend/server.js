const sequelize = require("./util/database");
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors({
  credentials: true,
  origin: "http://127.0.0.1:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: [
  //   "Content-Type",
  //   "Authorization",
  //   "Access-Control-Allow-Credentials",
  // ],
}));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


const dataRouter = require("./routes/Data");
app.use("/data", dataRouter);
const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);
const ordersRouter = require("./routes/Orders");
app.use("/orders", ordersRouter);
const deliverersRouter = require("./routes/Deliverers");
app.use("/delivery", deliverersRouter);
const analyticsRouter = require("./routes/Analytics");
app.use("/analytics", analyticsRouter);
app.use("/images", express.static('images'));


const PORT = process.env.PORT || 3001;
sequelize.sync().then((req) => {
  app.listen(PORT, function () {
    console.log(`Server listening on ${PORT}`);
  });
});