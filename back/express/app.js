const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const whitelist = ['http://216.216.216.60:62112', 'http://localhost:5173', 'http://91.228.31.163:62100'];
app.use(cors({ credentials: true, origin: function (origin, callback) {
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
} }));
app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  console.log(
    `Time: ${new Date().toLocaleDateString("Ru-Ru", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}; Method: ${req.method}; URL: ${req.url}`
  );
  next();
});

app.use("/users", require("./routes/user.routes"));
app.use("/roles", require("./routes/roles.routes"));
app.use("/rights", require("./routes/rights.routes"));
app.use("/events", require("./routes/events.routes"));
app.use("/workgroups", require("./routes/workgroup.routes"));

module.exports = app;
