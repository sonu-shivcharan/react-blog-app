import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import appwriteService from "./../appwrite/db.config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { setCurrentPost } from "../store/postSlice";
function Post() {
  const { slug } = useParams();
    const [loading, setLoading] = useState(false)
  const currentPost = useSelector((state) => state.posts.currentPost);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData?.userId == currentPost?.userId ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    appwriteService
      .getPost(slug)
      .then((postData) => {
        dispatch(setCurrentPost(postData));
      }).finally(()=>setLoading(false))
  }, []);

  if (!currentPost || loading) {
    return (
      <div className="min-h-screen text-gray-400 flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  } else {
    return (
      currentPost && (
        <div className="min-h-screen">
          <Container>
            <article className="w-full flex flex-col items-center my-6 mx-auto ">
              {isAuthor && <Button onClick={()=>navigate(`/edit-post/${currentPost.$id}`)}>Edit Post</Button>}
              <div
                className="bg-center bg-cover w-full max-w-[700px] min-h-[300px] flex justify-center items-end "
                style={{
                  backgroundImage: `url(${appwriteService.getFilePreview(
                    currentPost.featuredImage
                  )})`,
                }}
              >
                <h2 className="text-2xl font-bold bg-gradient pt-36 p-4 w-full">
                  {currentPost.title}
                </h2>
              </div>
              <div
                id="post-content"
                className="content p-4 w-full bg-slate-800 mt-5 rounded-md"
              >
                {parse(currentPost.content)}
              </div>
            </article>
          </Container>
        </div>
      )
    );
  }
}

export default Post;
