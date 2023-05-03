// import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import Navbar from "scenes/navbar";
// import UserWidget from "scenes/widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import TitleImageWidget from "scenes/widgets/TitleImageWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";

// import { setTitleState } from "state";


const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    // const token = useSelector((state) => state.token);

    // const [refreshCounter, setRefreshCounter] = useState(0);

    // const dispatch = useDispatch();

    // const getTitle = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3001/title/get", {
    //             method: "GET",
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         const newTitle = await response.json();
    //         dispatch(setTitleState({ newTitle }));
    //     } catch (err) {
    //         console.error(`err >> ${err}`);
    //     }
    // };

    // useEffect(() => {
    //     getTitle();
    // }, [refreshCounter]);


    return (
        <Box>
            <Navbar />
            <TitleImageWidget title={true}/>
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