import { useState, useEffect } from "react";
import {
    IconButton,
    Box,
    Divider,
    // IconButton,
    // InputBase,
    Typography,
    // Select,
    // MenuItem,
    // FormControl,
    useTheme,
    useMediaQuery,
    // Dialog,
    // DialogTitle,
    // DialogContent,
    // DialogActions,
    // Button,
} from "@mui/material";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    // FavoriteBorderOutlines,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import EditIcon from '@mui/icons-material/Edit';
import {
    // EditOutlined,
    // DeleteOutlined,
    // AttachFileOutlined,
    // // GifBoxOutlined,
    // ImageOutlined,
    // MicOutlined,
    // MoreHorizOutlined,
} from "@mui/icons-material";
// import Dropzone from "react-dropzone";
import { setTitleState, setPost } from "state";

const BlogHeaderWidget = ({
    postId,
    title,
    likes,
    comments,
    createdAt
}) => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // const [uploadImage, setUploadImage] = useState(false);
    const [imageEdit, setImageEdit] = useState(null);
    const [titleEdit, setTitleEdit] = useState("");
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [isComments, setIsComments] = useState(false);

    const stateTitle = useSelector((state) => state.title);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const ip = useSelector((state) => state.ip);
    const isLiked = Boolean(likes.includes(ip));
    const likeCount = likes.length;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { palette } = useTheme();
    const dark = theme.palette.neutral.dark;
    const alt = theme.palette.background.alt;

    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // const mediumMain = palette.neutral.mediumMain;
    // const medium = palette.neutral.medium;

    const [imgHeight, setImgHeight] = useState('auto');
    const [openDialog, setOpenDialog] = useState(false);

    const patchLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                },
            });
            const updatedPost = await response.json();
            dispatch(setPost({ post: updatedPost }));
        } catch (err) {
            console.error(`err >> ${err}`);
        }
    };

    const getTitle = async () => {
        try {
            const response = await fetch("http://localhost:3001/title/get", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const newTitle = await response.json();
            dispatch(setTitleState({ newTitle }));
        } catch (err) {
            console.error(`err >> ${err}`);
        }
    };

    const handleTitleEdit = async () => {
        try {
            const formData = new FormData();
            if (titleEdit) {
                formData.append("title", titleEdit);
            }
            if (imageEdit) {
                formData.append("picture", imageEdit);
                formData.append("picturePath", imageEdit.name);
            }

            const response = await fetch(`http://localhost:3001/title/update`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const newTitle = await response.json();
            dispatch(setTitleState({ newTitle }));
            setImageEdit(null);
            setTitleEdit("");
            handleDialogClose();
            setRefreshCounter(refreshCounter + 1);
        } catch (err) {
            console.error(`err >> ${err}`);
        }
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        const handleResize = () => {
            const heightVal = window.innerHeight * (isNonMobileScreens ? 0.4 : 0.3)
            setImgHeight(heightVal + 'px');
        };

        handleResize(); // Set initial height
        window.addEventListener('resize', handleResize); // Update height on resize

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up event listener
        };
    }, [isNonMobileScreens]);

    useEffect(() => {
        getTitle();
    }, [refreshCounter]);

    return (
        <Box
            justifyContent="center"
            backgroundColor={alt}
            height="100%"
            p="1rem"
        >
            <FlexBetween>
                <Typography
                    height="100%"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    flex-direction="column"
                    alignItems="center"
                    color={dark}
                    fontSize={isNonMobileScreens ? "50px" : "24px"}
                >
                    {title ?? stateTitle.title}
                </Typography>
                {user && (
                    <IconButton

                        color={dark}
                        onClick={() => navigate(`/edit/${postId}`)}
                    >
                        <EditIcon />
                    </IconButton>
                )}
            </FlexBetween>

            <Box display="flex" justifyContent="center">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </FlexBetween>
            </Box>
            {(isComments && comments.length>0) && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>

                    ))}
                </Box>
            )}


        </Box>
    );
};

export default BlogHeaderWidget;