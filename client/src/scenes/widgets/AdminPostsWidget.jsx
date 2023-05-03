import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import AdminPostWidget from "./AdminPostWidget";
import Grid from "@mui/material/Grid";
import { Box, useMediaQuery } from "@mui/material";

const AdminPostsWidget = () => {
    // const dispatch = useDispatch();
    // const posts = useSelector((state) => state.post);
    const token = useSelector((state) => state.token);

    // Added state variable for fetched posts
    const [fetchedPosts, setFetchedPosts] = useState(null);

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:3001/posts/feed", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            // dispatch(setPosts({ posts: data }));
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFetchedPosts(data);
        } catch (err) {
            console.error(`err >> ${err}`);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Grid item xs={12}>
            <Grid container spacing={2}>
                {fetchedPosts && fetchedPosts.map(
                    ({
                        _id,
                        title,
                        blogPath,
                        description,
                        picturePath,
                        likes,
                        comments,
                    }) => (

                        <Box
                            key={_id}
                            m="0.5rem"
                            sx={{
                                minHeight: '100px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "100%",
                                display: "block"
                            }}
                        >
                            <AdminPostWidget
                                postId={_id}
                                blogPath={blogPath}
                                title={title}
                                description={description}
                                picturePath={picturePath}
                                likes={likes}
                                comments={comments}
                            />
                        </Box>

                    ))}
            </Grid>
        </Grid>

    );
};

export default AdminPostsWidget;