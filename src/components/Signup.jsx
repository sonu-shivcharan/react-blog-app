import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Logo } from "./index";
function Signup() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // handles user data and sends it for ac creation
  const createAccount = async (data) => {
    setError("");
    setLoading(true);
    try {
        await authService.createAccount(data);
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData){
          dispatch(storeLogin(userData));
        }
        navigate("/");
    } catch (error) {
      setError(error.message);
    }finally{
      
      setLoading(false)
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-[350px] border border-slate-600 text-slate-300 p-6 rounded-md dark:bg-slate-800/50">
        <span className="inline-block">
          <Logo />
        </span>
        <h2 className="font-semibold text-2xl">Create Account</h2>

        {error && <p className="text-red-600 px-4">{error}</p>}
        <form
          onSubmit={handleSubmit(createAccount)}
          className="flex items-center flex-col"
        >
          <div className="space-y-5">
            <Input
              label="Name : "
              placeholder="Enter your name"
              type="name"
              {...register("name", {
                required: "true",
              })}
            />
            <Input
              label="Email : "
              type="email"
              placeholder="Enter Your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Enter valid email address",
                },
              })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                matchPattern: (value) =>
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                    value
                  ) || `Password must at least contain 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number`,
              })}
            />
          </div>
          <Button className={`w-full mx-auto my-3 font-bold ${loading?"bg-emerald-700":""}`} hoverColor={loading?"bg-transparent":""} disabled={loading} type="submit">
           {loading?"Creating Account...":"Create Account"}
          </Button>
        </form>
        <p className="mt-2 text-center text-base">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
