const express = require('express');
const cors = require("cors");
const usersRoutes = require('./app/routes/users.routes');

const app = express();

var corsOptions = {
    origin: "http://localhost:80"
  };
//implements the use of CORs
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sample test route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to test API application." });
});

//require('./app/routes/users.routes.js')(app);
require("./app/routes/users.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`Server listening in http://localhost:3000 ON PORT ${PORT}`);
})