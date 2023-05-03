import { Box, useMediaQuery } from "@mui/material";
// import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
// import UserWidget from "scenes/widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdminPostsWidget from "scenes/widgets/AdminPostsWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";

const PostsPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


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
                    <AdminPostsWidget/>
                </Box>
            </Box>
        </Box>);
};

export default PostsPage;