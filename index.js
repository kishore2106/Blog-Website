import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const PORT = 3000;

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    // res.render("index.ejs");
    res.send("Testing!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});