import React, { useEffect } from "react";
import { Button, Container, PostCard } from "../components/index";
import dbService from "../appwrite/db.config";
import { Query } from "appwrite";
import { useDispatch, useSelector } from "react-redux";
import { setMyPosts } from "../store/postSlice";
import { Link } from "react-router-dom";
function AllPosts() {
  const myPosts = useSelector((state) => state.posts.myPosts);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (myPosts.length === 0) {
      dbService
        .getPosts([Query.equal("userId", userData?.$id)])
        .then((data) => {
          if (data) {
            dispatch(setMyPosts(data.documents));
          }
        });
    }
  }, [userData]);
  return (
    <div className="py-8">
      <Container>
        {myPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {myPosts.map((post) => (
              <PostCard key={post.$id} {...post} editBtn={true} />
            ))}
          </div>
        ) : (
          <div className="min-h-[70vh] w-full flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold m-4">
              You haven't posted anything..
            </h1>
            <Link to={"/add-post"}><Button>Add Post now</Button></Link>
            
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
