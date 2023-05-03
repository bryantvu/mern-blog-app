import {
    Box,
    Button,
    useMediaQuery,
    Snackbar,
    Alert,
    Typography,
    useTheme,
} from "@mui/material";
// import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
// import UserWidget from "scenes/widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";
// import AdminPostsWidget from "scenes/widgets/AdminPostsWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactMarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import TitleImageWidget from "scenes/widgets/TitleImageWidget";

const EditPage = () => {
    const { blogId } = useParams();
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const mode = useSelector((state) => state.mode);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const navigate = useNavigate();

    const [blogPost, setBlogPost] = useState(null);
    const [postContent, setPostContent] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [saveDisabled, setSaveDisabled] = useState(true);

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
            setBlogPost(contents.post);
            setPostContent(contents.data);
        } catch (err) {
            console.error(`err >> ${err}`);
        }
    };

    useEffect(() => {
        getBlogPost();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const handleEditorChange = ({ html, text }) => {
        setPostContent(text);
        setSaveDisabled(false);
    };

    const saveEditedContent = async () => {
        try {
            // console.log(`saveEditedContent >> ${postContent}`);
            const response = await fetch(`http://localhost:3001/posts/edit/${blogId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ content: postContent }),
            });
            // const result = await response.text();
            // console.log(result);
            if (response.ok) {
                setSnackbarMessage("Blog post updated successfully");
                setSnackbarSeverity("success");
                setSaveDisabled(true);
            } else {
                setSnackbarMessage("Failed to update the blog post");
                setSnackbarSeverity("error");
            }
            setSnackbarOpen(true);
        } catch (err) {
            console.error(`err >> ${err}`);
            setSnackbarMessage(`Error updating blog post: ${err}`);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <Box>
            <Navbar />
            {blogPost && (
                <TitleImageWidget
                    title={false}
                    imagePath={blogPost.picturePath}
                />
            )}
            <Box
                width="100%"
                padding="2rem 6%"
                display="block"
                column-count="1"
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box
                    flexBasis={undefined}
                >
                    <Box>

                        <Typography
                            fontSize={isNonMobileScreens ? "30px" : "24px"}
                            mb={1}
                            onClick={() => navigate(`/blog/${blogId}`)}
                            sx={{
                                display: 'inline-block',
                                "&:hover": {
                                    color: theme.palette.primary.main,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            Editing: "{blogPost && blogPost.title}"
                        </Typography>
                    </Box>
                    <ReactMarkdownEditor
                        value={postContent}
                        onChange={handleEditorChange}
                        config={{
                            view: {
                                menu: true,
                                md: true,
                                html: true,
                            },
                            canView: {
                                menu: true,
                                md: true,
                                html: true,
                                hideMenu: false,
                            },
                        }}
                        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                        style={{
                            height: "calc(100vh - 120px)",
                            width: "100%",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    />
                    <Box mt={2}>
                        <Button
                            onClick={saveEditedContent}
                            variant="contained"
                            color="primary"
                            disabled={saveDisabled}
                        >
                            Save
                        </Button>
                    </Box>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => setSnackbarOpen(false)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </Box>);
};

export default EditPage;