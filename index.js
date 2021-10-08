require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./database/db");
const quote = require("./routes/quote");

connectDB();
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use("/api", quote);

const PORT = process.env.PORT;
app.listen(PORT, () => {
      console.info(`Server running at ${PORT}`);
});