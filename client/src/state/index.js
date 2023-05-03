import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    ip: null,
    title: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        // setFriends: (state, action) => {
        //     if (state.user) {
        //         state.user.friends = action.payload.friends;
        //     } else {
        //         console.error("user friends non-existant :(");
        //     }
        // },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setTitleState: (state, action) => {
            state.title = action.payload.newTitle;
        },
        setPost: (state, action) => {
            console.log(`setPost >> ${action.payload.post}`);
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setIpAddress: (state, action) => {
            state.ip = action.payload.ip;
        }

    }
});

export const { 
    setMode, 
    setLogin,
    setLogout,
    setPosts, 
    setPost, 
    setTitleState, 
    setBlogPost, 
    setIpAddress 
} = authSlice.actions;

export default authSlice.reducer;