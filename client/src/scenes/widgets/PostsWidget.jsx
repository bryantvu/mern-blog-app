import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import Grid from "@mui/material/Grid";
import { Box, useMediaQuery } from "@mui/material";

const PostsWidget = () => {
    // const dispatch = useDispatch();
    // const posts = useSelector((state) => state.post);
    const token = useSelector((state) => state.token);

    // Added state variable for fetched posts
    const [fetchedPosts, setFetchedPosts] = useState(null);

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // const returnPosts = (posts) => {
    //     if (posts) {
    //         return (
    //             <Grid item xs={12}>
    //                 <Grid container spacing={2}>
    //                     {posts.map(
    //                         ({
    //                             _id,
    //                             blogPath,
    //                             description,
    //                             picturePath,
    //                             likes,
    //                             comments,
    //                         }) => (
    //                             <Grid item xs={isNonMobileScreens ? 4 : 6} key={_id}>
    //                                 <Box
    //                                     sx={{
    //                                         minHeight: '100px',
    //                                         display: 'flex',
    //                                         justifyContent: 'center',
    //                                         alignItems: 'center',
    //                                     }}
    //                                 >
    //                                     <PostWidget
    //                                         postId={_id}
    //                                         blogPath={blogPath}
    //                                         description={description}
    //                                         picturePath={picturePath}
    //                                         likes={likes}
    //                                         comments={comments}
    //                                     />
    //                                 </Box>
    //                             </Grid>
    //                         ))}
    //                 </Grid>
    //             </Grid>

    //         )
    //     }
    // }

    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:3001/posts/feed", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            // dispatch(setPosts({ posts: data }));
            setFetchedPosts(data);
        } catch (err) {
            console.err(`err >> ${err}`);
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
                        blogPath,
                        description,
                        picturePath,
                        likes,
                        comments,
                    }) => (
                        <Grid item xs={isNonMobileScreens ? 4 : 6} key={_id}>
                            <Box
                                sx={{
                                    minHeight: '100px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <PostWidget
                                    postId={_id}
                                    blogPath={blogPath}
                                    description={description}
                                    picturePath={picturePath}
                                    likes={likes}
                                    comments={comments}
                                />
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Grid>

    );
};

export default PostsWidget;