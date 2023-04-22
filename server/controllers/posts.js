import Post from "../models/post.js";
import User from "../models/users.js";
import Title from "../models/title.js"
import { marked } from "marked";
import fs from 'fs';
import requestIp from "request-ip";

/** CREATE */
// export const createPost = async(req, res) => {
//     try{
//         const { userId, description, picturePath} = req.body;
//         const user = await User.findById(userId);
//         const newPost = new Post({
//             userId,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             location: user.location,
//             description,
//             userPicturePath: user.picturePath,
//             picturePath,
//             likes: {},
//             comments: []
//         })
//         await newPost.save();

//         const post = await Post.find();
//         res.status(201).json(post);

//     }catch(err){
//         res.status(409).json({message: err.message});
//     }
// }

/** READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// export const getUserPosts = async (req,res) => {
//     try{
//         const { userId} = req.params;
//         const post = await Post.find({ userId });
//         res.status(200).json(post);

//     }catch(err){
//         res.status(404).json({message: err.message});
//     }
// }

/** UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { ip } = req.body;
        const post = await Post.findById(id);
        const isLiked = ip in post.likes;

        if (isLiked) {
            post.likes.delete(ip);
        } else {
            post.likes.push(ip);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
        );

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/** GET BLOG POST */
export const getBlogPost = async (req, res) => {
    try {
        const { blogId } = req.params;
        const filePath = `./public/blogPosts/${blogId}.md`;
        console.log(`blog file path -> ${filePath}`);
        fs.readFile(filePath, 'utf8', (err, data) => {
            res.status(200).send(data);
        });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/** IP ADDRESS */
export const getIpAddress = async (req, res) => {
    try {
        const clientIp = requestIp.getClientIp(req);
        res.status(200).json(clientIp);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};