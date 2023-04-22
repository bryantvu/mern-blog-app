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

const BlogPage = () => {
    const { blogId } = useParams();
    const token = useSelector((state) => state.token);
    const [postContent, setPostContent] = useState(null);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px");

    /** custom img component used as sx component is not passed down to internal
     *  elements of ReactMarkdown
     * */
    const CustomImgComponent = ({ node, ...props }) => (
        <img {...props} style={{ maxWidth: "100%", height: "auto" }} />
    );

    const getBlogPost = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/blog/${blogId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "text/html"
                }
            });
            const contents = await response.text();
            setPostContent(contents);
            // console.log(contents);
        } catch (err) {
            console.err(`err >> ${err}`);
        }
    };

    useEffect(() => {
        getBlogPost();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <Navbar />
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
                        {postContent}
                    </ReactMarkdown>
                </Box>
            </Box>
        </Box>
    );
};

export default BlogPage;