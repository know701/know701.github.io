const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname ,"view",'static')));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("view", "index.html"))
});


app.listen(process.env.PORT || 8083, () => console.log("server starting"));