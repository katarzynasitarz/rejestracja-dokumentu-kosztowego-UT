const bodyParser = require("body-parser");

module.exports = (app) => {
  const api = require("./api");
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  app.use("/api", api);
};
