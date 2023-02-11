const express = require("express");
const app = express();
const port = 5000;
const userRouter = require("./router/userRouter");
const threeDRouter = require("./router/threeDRouter");
// const utilRouter = require("./router/utils");
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/3dmodel", threeDRouter);
// app.use("/util", utilRouter);

app.use(express.static("./static/uploads"));

app.get("/home", (req, res) => {
  res.send("hello express");
});
app.listen(port, () => {
  console.log("the server has been started");
});
