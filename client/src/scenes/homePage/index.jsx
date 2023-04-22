import { Box, useMediaQuery } from "@mui/material";
// import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
// import UserWidget from "scenes/widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import TitleImageWidget from "scenes/widgets/TitleImageWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


    return (
        <Box>
            <Navbar />
            <TitleImageWidget/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "grid" : "block"}
                column-count={isNonMobileScreens ? "3" : "1"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                >
                    <PostsWidget/>
                </Box>
            </Box>
        </Box>);
};

export default HomePage;