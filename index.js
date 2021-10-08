require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./database/db");
const quote = require("./routes/quote");
const RateLimit = require("express-rate-limit");
connectDB();

const limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute only 15 request
  max: 15,
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(limiter);
app.use(express.json());
app.disable("x-powered-by");

app.use("/api", quote);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`Server running at ${PORT}`);
});
