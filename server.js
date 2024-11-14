const express = require("express")
const app = express()
const connectDb = require("./config/db");
const userRoute = require('./routes/userRoute')

require('dotenv').config()
connectDb()

app.use(express.json())

app.use("/", userRoute);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);