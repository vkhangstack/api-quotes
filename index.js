require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./database/db");
const quote = require("./routes/quote");
const home = require("./routes/home");
const RateLimit = require("express-rate-limit");
const PORT = process.env.PORT;
connectDB();

const limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute only 15 request
  max: 75,
});
app.use(
  cors({
    origin: process.env.BASE_URL,
  }),
);
app.use(limiter);
app.use(express.json());
app.disable("x-powered-by");

app.use("/api", quote);
app.use("/", home);

app.listen(PORT, () => {
  console.info(`Server running at ${PORT}`);
});
