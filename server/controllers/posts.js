import mongoose from "mongoose";
import Post from "../models/post.js";
import User from "../models/users.js";
import Title from "../models/title.js"
import { marked } from "marked";
import fs from 'fs';
import requestIp from "request-ip";

/** CREATE */
export const createPost = async(req, res) => {
    try{
        const { 
            title, 
            description, 
            picturePath,
            content
        } = req.body;

        const blogId = new mongoose.Types.ObjectId();
        const filePath = `./public/blogPosts/${blogId}.md`;
        console.log(`blog file path -> ${filePath}`);
        // console.log(`editBlogPost >> ${newContent}`);

        fs.writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                res.status(500).json({ message: "Failed to create the file." });
            }
        });
        // const user = await User.findById(userId);
        const newPost = new Post({
            _id: blogId,
            blogPath: blogId,
            title: title,
            description: description,
            picturePath: picturePath,
            likes: [],
            comments: []
        })
        await newPost.save();

        const post = await Post.findOne().sort({ createdAt: -1 });
        res.status(201).json(post);

    }catch(err){
        res.status(409).json({message: err.message});
    }
}

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
        const { ip } = req.body.ip;
        const post = await Post.findById(id);
        const isLiked = post.likes.includes(ip);

        console.log(isLiked);

        if (isLiked) {
            const index = post.likes.indexOf(ip);
            post.likes.splice(index,1);
        } else {
            post.likes.push(ip);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
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
        const post = await Post.findById(blogId);
        const filePath = `./public/blogPosts/${post.blogPath}.md`;
        console.log(`blog file path -> ${filePath}`);
        fs.readFile(filePath, 'utf8', (err, data) => {
            res.status(200).json({
                data,
                post
            });
        });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/** EDIT BLOG POST */
export const editBlogPost = async (req, res) => {
    try {
        const { blogId } = req.params;
        const filePath = `./public/blogPosts/${blogId}.md`;
        console.log(`blog file path -> ${filePath}`);
        const newContent = req.body.content;
        // console.log(`editBlogPost >> ${newContent}`);

        fs.writeFile(filePath, newContent, 'utf8', (err) => {
            if (err) {
                res.status(500).json({ message: "Failed to update the file." });
            } else {
                res.status(200).json({ message: "File updated successfully." });
            }
        });

    } catch (err) {
        console.error(`err >> ${err}`);
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