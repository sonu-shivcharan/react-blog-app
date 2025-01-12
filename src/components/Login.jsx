import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async (data) => {
    setError("");
    setLoading(true)
    try {
      console.log(data);
      const result = await authService.login(data);
      if(result?.message){
        setError(result.message);
        return;
      }
      if (result) {
        const userData = await authService.getCurrentUser();
        if (userData){
          dispatch(storeLogin(userData));
          console.log(userData,"login.jsx");
          navigate("/")
        }
      }
    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-[350px] items-center border border-slate-600 text-slate-300 p-6 rounded-md mx-5 dark:bg-slate-800/50">
        <span className="inline-block">
          <Logo />
        </span>
        <h2 className="font-bold text-2xl text-center">Login</h2>
        {error && <p className="text-red-500">
          {error}
          </p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="flex items-center flex-col">
            <div className="space-y-5">
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
                })}
              />
            </div>
            <Button className={`w-full mx-auto my-3 font-bold ${loading?"bg-emerald-700":""}`} hoverColor={loading?"bg-transparent":""} disabled={loading} type="submit">
            {loading?"Logging In...":"Login"}
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-base">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
       
      </div>
    </div>
  );
}

export default Login;
