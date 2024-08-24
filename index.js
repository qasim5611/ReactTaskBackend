const express = require("express");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const connectDatabase = require("./config/connection");

const app = express();
const path = require("path");
const cors = require("cors");

// const { uploadall } = require("./helpers/filehelper");

app.use(cors());

// Parse URL-encoded data (equivalent to bodyParser.urlencoded)
app.use(express.urlencoded({ extended: false }));
// Parse JSON data (equivalent to bodyParser.json)
app.use(express.json());

const _dirname = path.resolve();
app.use("uploads", express.static(path.join(_dirname, "uploads")));

const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      // file.mimetype == "image/png" ||
      // file.mimetype == "image/jpg" ||
      // file.mimetype == "image/jpeg" ||
      // file.mimetype == "video/webm" ||
      // file.mimetype == "video/mp4" ||
      // file.mimetype == "video/mav"

      file
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      return cb(new Error("File is required"));
    }
  },
});

app.use("/uploads", express.static(path.join(_dirname, "uploads")));

let SiteUsers = require("./routes/Users/Users");
app.post("/addUser", upload.single("image"), SiteUsers.addUser);
app.get("/getUser", SiteUsers.getUser);
app.post("/deleteUser", SiteUsers.deleteUserByid);
app.post("/updateUser", upload.single("image"), SiteUsers.updateUser);
app.get("/getUserByid", SiteUsers.getUserByid);

app.use(express.static("./build"));
app.use(express.static(path.join(__dirname, "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

connectDatabase();
const PORT = process.env.PORT || 5050;
app.listen(PORT, function () {
  console.log("server is started on port " + PORT);
});
