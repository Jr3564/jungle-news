const express = require("express");
const route = require("./routes");

const app = express();

app.use(express.json());

app.use("/api/login", route.login);
app.use("/api/admin", route.admin);
app.use("/api/authors", route.authors);
app.use("/api/sign-up", route.signUp);
app.use("/api/articles", route.articles);
app.use("/api/categories", route.categories);

app.listen(process.env.PORT || "8080");
