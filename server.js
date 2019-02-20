const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.set("view engine", "ejs");

var db;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb:/localhost:27017",
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("Vitboken"); // whatever your database name is

    app.listen(3000, function() {
      console.log("listening on 3000");
    });
  }
);

app.get("/", function(req, res) {
  db.collection("Topography")
    .find()
    .toArray(function(err, results) {
      res.render("index.ejs", { knark: results });
    });
});

app.post("/tjena", (req, res) => {
  db.collection("knark").save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log("saved to database");
    res.redirect("/");
  });
});
