import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    // FavoriteBorderOutlines,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";


const AdminPostWidget = ({
    postId,
    blogPath,
    title,
    description,
    picturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const ip = useSelector((state) => state.ip);
    const user = useSelector((state) => state.user);

    const isLiked = Boolean(likes.includes(ip));
    const likeCount = likes.length;

    const theme = useTheme();
    const { palette } = useTheme();
    const dark = theme.palette.neutral.dark;
    const alt = theme.palette.background.alt;

    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

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

    return (
        <WidgetWrapper>
            <FlexBetween
                overflow={isNonMobileScreens ? "hidden" : "visible"}
                sx={{ maxHeight: isNonMobileScreens ? "300px" : "none", borderRadius: "0.75rem" }}
            >
                {picturePath && (
                    <img
                        onClick={() => {
                            navigate(`/blog/${postId}`);
                            // navigate(0);
                        }}
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={`http://localhost:3001/assets/${picturePath}`}
                    />
                )}
            </FlexBetween>
            <Typography color={main} sx={{ fontWeight: "bold", fontSize: 17, mt: "0.5rem" }}>
                {title}
            </Typography>
            <Typography color={main}>
                {description}
            </Typography>
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton
                            // onClick={patchLike}
                        >
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

                </FlexBetween>
                <FlexBetween>
                    {user && (
                        <IconButton
                            // sx={{
                            //     position: 'absolute',
                            //     top: theme.spacing(1),
                            //     right: theme.spacing(1),
                            // }}
                            color={dark}
                            onClick={() => navigate(`/edit/${postId}`)}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </FlexBetween>

            </FlexBetween>
            {isComments && (
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
        </WidgetWrapper>
    )
};

export default AdminPostWidget;