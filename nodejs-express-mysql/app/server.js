const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
 app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set port, listen for requests
const PORT = process.env.PORT || 8082;
require("./routes/userOb.routes")(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to outmane express page." });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});