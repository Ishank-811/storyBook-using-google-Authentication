const express = require("express");
const dotenv = require("dotenv");
const app = express();
const methodoverride = require("method-override"); 
app.use(methodoverride('_method'));
const mongoose = require("mongoose");
const { stripTags } = require("./helpers/ejs");
const morgan = require("morgan");


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const passport = require("passport");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
require("./models/user");
const moment = require("moment");

app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});
const authrouter = require("./routes/auth");
require("./config/passport")(passport);

const indexrouter = require("./routes/index");
const expressEjsLayout = require("express-ejs-layouts");
const conDb = require("./config/db");
conDb();
const port = process.env.PORT || 8000;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layouts");

app.use(expressEjsLayout);
app.use(express.static("public"));
app.use("/", indexrouter);
app.use("/auth", authrouter);
app.use("/stories", require("./routes/story"));
dotenv.config({ path: "./config/config.env" });

app.listen(port, () => {
  console.log(`listening at port number ${port}`);
});
