import React from "react";
import appwriteService from "./../appwrite/db.config";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
function PostCard({ $id, title, featuredImage, editBtn = false }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-[450px] w-full min-w-[200px] md:min-w-[200px] rounded-xl p-3 place-self-center bg-slate-50 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      {editBtn && <Button onClick={()=>navigate(`/edit-post/${$id}`)}>Edit</Button>}

      <Link to={`/post/${$id}`}>
        <div
          className="h-[200px] w-full flex justify-center bg-center bg-cover rounded-md mb-2"
          style={{
            backgroundImage: `url(${appwriteService.getFilePreview(
              featuredImage
            )})`,
          }}
        ></div>
        <h2 className="font-bold text-gray-900 dark:text-gray-200">{title}</h2>
      </Link>
    </div>
  );
}

export default PostCard;
