import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const PORT = 3000;
let day = "";
var blogData = {};

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/create", (req, res) => {
    day = new Date();
    req.body["date"] =  day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear();
    console.log("created at: " + day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds());
    console.log(req.body);
    blogData[req.body.title] = req.body;
    // blogData = req.body;
    res.send("Successfully created!");
});

app.put("/update", (req, res) => {
    res.send("Successfully updated!");
});

app.delete("/delete", (req, res) => {
    const { title } = req.body; // Extract the title from the request body

    if (title && blogData[title]) {
        console.log("Inside delete: ", blogData[title]); // Log the blog being deleted
        delete blogData[title]; // Remove the blog by title
        res.send(`Successfully deleted the blog with title: ${title}`);
    } else {
        res.status(404).send("Blog not found or invalid title provided!");
    }
});

app.get("/view", (req, res) => {
    console.log(typeof(blogData))
    console.log(blogData);
    res.render("view.ejs", {blogs: blogData});
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});