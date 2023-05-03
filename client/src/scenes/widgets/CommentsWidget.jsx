import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    // FavoriteBorderOutlines,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";

const CommentsWidget = ({
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const ip = useSelector((state) => state.ip);

    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const light = palette.primary.light;

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // const patchLike = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
    //             method: "PATCH",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-type": "application/json"
    //             },
    //             body: JSON.stringify({ip: {ip}})
    //         });
    //         const updatedPost = await response.json();
    //         dispatch(setPost({ post: updatedPost }));
    //     } catch (err) {
    //         console.error(`err >> ${err}`);
    //     }
    // };

    return (
        <WidgetWrapper
        // sx={{
        //     padding: "1rem 5rem"
        // }}
        >
            <Typography
                color={main}
                sx={{
                    fontWeight: "bold",
                    fontSize: 17,
                    mt: "0.5rem",
                    mb: "1rem"
                }}>
                Comments
            </Typography>
            {comments && (
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

export default CommentsWidget;