require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.disabled("x-powered-by");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`Server running at ${PORT}`);
});
