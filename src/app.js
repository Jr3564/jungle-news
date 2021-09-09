const express = require("express");
const route = require("./routes");

const app = express();
app.use(express.json());

route(app);

app.listen(process.env.PORT || "8080");
