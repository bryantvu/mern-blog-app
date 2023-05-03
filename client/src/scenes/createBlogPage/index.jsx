import {
    IconButton,
    Box,
    Button,
    useMediaQuery,
    InputBase,
    Snackbar,
    Alert,
    Typography,
    useTheme,
} from "@mui/material";
// import { useSelector } from "react-redux";
import {
    EditOutlined,
    // DeleteOutlined,
    // AttachFileOutlined,
    // GifBoxOutlined,
    ImageOutlined,
    // MicOutlined,
    // MoreHorizOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import Navbar from "scenes/navbar";
// import UserWidget from "scenes/widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";
// import AdminPostsWidget from "scenes/widgets/AdminPostsWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import FlexBetween from "components/FlexBetween";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactMarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const CreateBlogPage = () => {
    // const { blogId } = useParams();
    const token = useSelector((state) => state.token);
    // const mode = useSelector((state) => state.mode);
    const navigate = useNavigate();

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [saveDisabled, setSaveDisabled] = useState(true);

    const initialValues = {
        title: "",
        description: "",
        image: null,
        content: null,
    }

    const [titleEdit, setTitleEdit] = useState(initialValues.title);
    const [descriptionEdit, setDescriptionEdit] = useState(initialValues.description);
    const [imageEdit, setImageEdit] = useState(initialValues.image);
    const [contentEdit, setContentEdit] = useState(initialValues.content);

    const theme = useTheme();
    const { palette } = useTheme();
    const dark = theme.palette.neutral.dark;
    const alt = theme.palette.background.alt;

    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    // const getBlogPost = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3001/posts/blog/${blogId}`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-type": "text/html"
    //             }
    //         });
    //         const contents = await response.text();
    //         setPostContent(contents);
    //     } catch (err) {
    //         console.error(`err >> ${err}`);
    //     }
    // };

    // useEffect(() => {
    //     getBlogPost();
    // }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const handleEditorChange = () => {
        if (
            titleEdit != initialValues.title &&
            descriptionEdit != initialValues.description &&
            imageEdit != initialValues.image &&
            contentEdit != initialValues.content
        ) {
            setSaveDisabled(false);
        }

    };

    // handleEditorChange call inside of the dropzone is called too early.
    useEffect(() => {
        // console.log("imageEdit changed:", imageEdit);
        handleEditorChange();
    }, [imageEdit]);

    const saveEditedContent = async () => {
        try {
            const formData = new FormData();

            formData.append("title", titleEdit);
            formData.append("description", descriptionEdit);
            formData.append("picture", imageEdit);
            formData.append("picturePath", imageEdit.name);
            formData.append("content", contentEdit);


            const response = await fetch(`http://localhost:3001/post/create`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const responseBody = await response.text();
            // console.log(`responseBody >> ${responseBody}`);
            const newPost = responseBody ? JSON.parse(responseBody) : {};

            if (response.ok) {
                // setSnackbarMessage("Blog post created successfully");
                // setSnackbarSeverity("success");
                // console.log(newPost);
                navigate(`/blog/${newPost.blogPath}`);
            } else {
                setSnackbarMessage("Failed to create the blog post");
                setSnackbarSeverity("error");
            }
            setSnackbarOpen(true);
        } catch (err) {
            console.error(`err >> ${err}`);
            setSnackbarMessage(`Error creating blog post: ${err}`);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <Box>
            <Navbar />
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
                            mb={2}
                        >
                            Create New Post
                        </Typography>
                    </Box>
                    <Box m="0.5rem 0">
                        <label htmlFor="postTitle">Title</label>
                    </Box>
                    <FlexBetween gap="1.5rem">
                        <InputBase
                            placeholder="Title goes here..."
                            onChange={(e) => {
                                setTitleEdit(e.target.value)
                                handleEditorChange();
                            }}
                            value={titleEdit}
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "5px",
                                padding: "0.5rem 1.5rem",
                                border: `1px solid ${medium}`
                            }}
                        />
                    </FlexBetween>
                    <Box m="0.5rem 0">
                        <label htmlFor="postDescription">Description</label>
                    </Box>
                    <FlexBetween gap="1.5rem">
                        <InputBase
                            placeholder="Description goes here..."
                            onChange={(e) => {
                                setDescriptionEdit(e.target.value);
                                handleEditorChange();
                            }}
                            value={descriptionEdit}
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "5px",
                                padding: "0.5rem 1.5rem",
                                border: `1px solid ${medium}`
                            }}
                        />
                    </FlexBetween>
                    <Box
                        border={`1px solid ${medium}`}
                        borderRadius="5px"
                        m="1rem 0"
                        p="1rem"
                    >
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                setImageEdit(acceptedFiles[0]);
                                handleEditorChange();
                            }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <FlexBetween>
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        width="100%"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!imageEdit ? (
                                            <p>Add Image Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{imageEdit.name}</Typography>
                                                <EditOutlined />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                    {imageEdit && (
                                        <IconButton
                                            onClick={() => setImageEdit(null)}
                                            sx={{ width: "15%" }}
                                        >

                                        </IconButton>
                                    )}
                                </FlexBetween>
                            )}

                        </Dropzone>

                    </Box>
                    <ReactMarkdownEditor
                        // value={postContent}
                        placeholder="Blog content goes here..."
                        onChange={({ html, text }) => {
                            setContentEdit(text);
                            handleEditorChange();
                        }}
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
                            height: "calc(100vh - 300px)",
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

export default CreateBlogPage;