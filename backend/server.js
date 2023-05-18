const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors=require("cors")
connectDb();
const app = express();
const port = process.env.PORT || 5881;
app.use(cors())

app.use(express.json());
app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/menu",require("./routes/menuRoutes"))

app.use(errorHandler)


app.listen(port,() => {
    console.log(`Server Running on port ${port}`);
}) 