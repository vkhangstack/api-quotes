require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./database/db");
const quote = require("./routes/quote");
const RateLimit = require("express-rate-limit");
connectDB();

// const limiter = new RateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute only 15 request
//   max: 15,
// });
// app.use(
//   cors({
//     origin: process.env.BASE_URL,
//   })

// app.use(limiter);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by");
app.set("view engine", "ejs");
// app.set("views", express.static(path.join(__dirname, "views")))
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api", quote);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`Server running at ${PORT}`);
});
