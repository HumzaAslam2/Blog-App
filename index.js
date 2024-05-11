import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs", {blogPosts: blogPosts});
});

app.get("/remove", (req, res) => {
    res.render("remove.ejs", {blogPosts: blogPosts});
});

app.post("/submit", (req, res) => {
    blogPosts.push(`\"${req.body["blogPost"]}\" - ${new Date().toDateString()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
    res.render("index.ejs", {blogPosts: blogPosts});
});

app.post("/edit", (req, res) => {
    blogPosts[req.body["postNumber"] - 1] = `\"${req.body["blogPost"]}\" - ${new Date().toDateString()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    res.render("index.ejs", {blogPosts: blogPosts});
});

app.post("/remove", (req, res) => {
    blogPosts.splice(req.body["postNumber"] - 1, 1);
    res.render("index.ejs", {blogPosts: blogPosts});
});

app.listen(port, () => console.log(`Server started on port ${port}`));