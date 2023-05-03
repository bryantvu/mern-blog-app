import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from "scenes/navbar";
// import FriendListWidget from "scenes/widgets/FriendListWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";
// import UserWidget from "scenes/widgets/UserWidget";
import TitleImageWidget from "scenes/widgets/TitleImageWidget";
import BlogHeaderWidget from "scenes/widgets/BlogHeaderWidget";
import CommentsWidget from "scenes/widgets/CommentsWidget";

const BlogPage = () => {
    const { blogId } = useParams();
    const token = useSelector((state) => state.token);
    const [postContent, setPostContent] = useState(null);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px");

    /** custom img component used as sx component is not passed down to internal
     *  elements of ReactMarkdown
     * */
    const CustomImgComponent = ({ node, ...props }) => (
        <img {...props} style={{ maxWidth: "100%", height: "auto" }} alt={node.alt || ""} />
    );

    const getBlogPost = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/blog/${blogId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            });
            const contents = await response.json();
            setPostContent(contents);
            // console.log(contents);
        } catch (err) {
            console.error(`err >> ${err}`);
        }
    };

    useEffect(() => {
        getBlogPost();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <Navbar />
            {postContent && (
                <>
                    <TitleImageWidget
                        title={false}
                        imagePath={postContent.post.picturePath}
                    />
                    <BlogHeaderWidget
                        postId={postContent.post._id}
                        title={postContent.post.title}
                        likes={postContent.post.likes}
                        comments={postContent.post.comments}
                        createdAt={postContent.post.createdAt}
                    />
                </>

            )}
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    width="100%"
                    overflowwrap="break-word"
                >
                    <ReactMarkdown components={{ img: CustomImgComponent }}>
                        {postContent && (postContent.data)}
                    </ReactMarkdown>
                </Box>
            </Box>{postContent && (
                <CommentsWidget comments={postContent.post.comments} />
            )}

        </Box>
    );
};

export default BlogPage;