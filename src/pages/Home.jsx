import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteDBService from "../appwrite/db.config";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../store/postSlice";
function Home() {
const posts = useSelector((state)=>state.posts.allPosts);
 console.log(posts);
 const dispatch = useDispatch()
  useEffect(() => {
    if(posts.length===0){
      appwriteDBService.getPosts().then((postData)=>{
        if(postData){
          dispatch(setAllPosts(postData.documents))
        }
      })
    }
  }, []);
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-[40px]">
      <Container>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
        ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
