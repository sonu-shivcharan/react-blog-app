import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "./../../appwrite/db.config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({ post }) {
  console.log("entereed post form");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData.$id, "userdata");
  const submitPost = async (data) => {
    setLoading(true);
    console.log("submit post", data);
    if (post) {
      console.log(post);
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }
      const updatedPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      console.log(updatedPost);
      if (updatedPost) {
        setLoading(false);
        navigate(`/post/${post.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        const newPost = await appwriteService.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id,
        });
        console.log("newpost", newPost);
        if (newPost.$id) {
          setLoading(false);

          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s{1,}/g, "-");
    }
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form
      onSubmit={handleSubmit(submitPost)}
      className="flex flex-wrap justify-center m-3"
    >
      <div className="px-1 max-sm:w-full md:max-w-[800px] mb-3">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>


      <div className="px-2 ">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 bg-slate-800 rounded border border-slate-500 p-2"
          {...register("status", { required: true })}
        />
        <Button
          onClick={() => submitPost(getValues())}
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full mx-auto"
        >
          {post
            ? loading
              ? "Updating..."
              : "Update"
            : loading
            ? "Adding Post..."
            : "Add Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
