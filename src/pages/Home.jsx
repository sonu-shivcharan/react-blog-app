import React, { useEffect, useState } from "react";
import { Button, Container, PostCard } from "../components";
import appwriteDBService from "../appwrite/db.config";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../store/postSlice";
import { Link } from "react-router-dom";

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
  if(posts.length<=0){
    return <div className="bg-white dark:bg-slate-900 min-h-screen py-[40px] flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl text-gray-200">No posts available. Why not create one?</h1> 
      <Link to={"/add-post"}><Button>Create Now</Button></Link>
    </div>
  }else{
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
}

export default Home;
