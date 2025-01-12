import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "./../appwrite/db.config";
import { Container, PostForm } from "../components";
function EditPost() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((postData) => {
        console.log(postData);
        if(postData){
          console.log(postData, "data");
            setPost(postData);
        }
      });
    }else{
        navigate("/")
    }
  }, [postId, navigate]);
  return post? (
    <Container>
      pjwfiub v8934u
        <PostForm post={post}></PostForm>
    </Container>
  ): null;
}

export default EditPost;
