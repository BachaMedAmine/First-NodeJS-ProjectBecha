const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");   
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!!!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BECHBECH application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8084;
require("./app/routes/tutorial.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
