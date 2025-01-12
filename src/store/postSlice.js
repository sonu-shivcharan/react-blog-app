import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allPosts: [],
    currentPost : null,
    myPosts : []
}
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        setAllPosts : (state,action)=>{
            state.allPosts = action.payload;
        },
        setCurrentPost : (state, action)=>{
            state.currentPost = action.payload
        },
        setMyPosts : (state, action)=>{
            state.myPosts = action.payload
        }
    }
})
export const {setAllPosts, setCurrentPost, setMyPosts} = postSlice.actions;
export default postSlice.reducer;