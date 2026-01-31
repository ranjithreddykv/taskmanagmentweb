/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice.js";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice.js";
import Loading from "../components/Loader.jsx";
import { useGetNotificationsQuery } from "../redux/slices/api/userApiSlice.js";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
 // const [data,{refetch}] = useGetNotificationsQuery();
  const submitHandler = async (data) => {
    try {
      const result = await login(data);
      console.log(result);
      if (result.error) {
        console.log(result.error);
        const errorMessage =
          result.error.data?.message || "An unknown error occoured";
        toast.error(errorMessage);
        return;
      }
      toast.success("Login Successfully!");
      dispatch(setCredentials(result));
      //refetch();
      navigate("/dashboard");
    } catch (error) {
      console.log("Unexpected error:", error);
      toast.error("An unexepected application error occurred");
    }
  };
  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-10 overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-fade-in-left">
        <p className="text-gray-600 border border-gray-300 rounded-full px-4 py-1 shadow-sm">
          Manage all your tasks in one place
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-700 leading-tight drop-shadow">
          Cloud-based <br /> Task Manager
        </h1>

        {/* Decorative Circle Animation */}
        <div className="relative w-40 h-40 mt-4">
          <div className="absolute w-full h-full bg-blue-200 rounded-full animate-pulse blur-xl opacity-60" />
          <div className="absolute w-32 h-32 bg-blue-500 rounded-full animate-bounce opacity-80" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center mt-14 lg:mt-0 animate-fade-in-right">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-[1.03]">
          <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">
            Welcome back!
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            Keep all your credentials safe!
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
            <TextInput
              label="Email Address"
              type="email"
              placeholder="Enter your Email"
              register={register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />

            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be at most 20 characters only",
                },
                // pattern: {
                //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                //   message:
                //     "Password must include uppercase, lowercase, number, and special character",
                // },
              })}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              label={
                isLoading ? (
                  <span
                    className="inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"
                    role="status"
                  >
                    <span className="sr-only">Loging In...</span>
                  </span>
                ) : (
                  "Login"
                )
              }
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white p-4 w-full rounded-xl shadow-md transition`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
