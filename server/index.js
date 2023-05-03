import express from "express";
import pug from "pug";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import titleRoutes from "./routes/title.js"
import { register } from "./controllers/auth.js";
import { updateTitleHeader } from "./controllers/title.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/users.js";
import Post from "./models/post.js";
import Title from "./models/title.js";
import { users, title, posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/** VIEW ENGINE */
app.engine('pug', pug.__express);
app.set('view engine', 'pug');

// /** BLOG POST */
// app.use('/blog-posts', express.static('blog-posts'));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/title/update", verifyToken, upload.single("picture"), updateTitleHeader);
app.post("/post/create", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/title", verifyToken, titleRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((err, client) => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /** ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
    // Title.insertMany(title);
}).catch((error) => console.log(`${error} did not connect`));