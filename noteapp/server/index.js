const express = require("express");
const cors = require("cors");
const connectToMongo= require("./db/MongoConn");
const UserRoutes = require("./Routes/UserRoute")
const NotesRoutes = require("./Routes/NotesRoutes")
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json());
// database connection
connectToMongo();

app.use("/user",UserRoutes)
app.use("/notes",NotesRoutes)


app.listen(process.env.PORT, () => {
    console.log(`app listening at http://localhost:${process.env.PORT}`)
  })