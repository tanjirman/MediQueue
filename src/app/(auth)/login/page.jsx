"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { authClient } from "@/lib/auth-client";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {

    try {

      const res = await authClient.signIn.email({

        email: data.email,

        password: data.password,

        callbackURL: "/",
      });

      const { data: tokenData } = await authClient.token();

      console.log(tokenData);

      if (res?.error) {

        toast.error(res.error.message || "Login Failed!");

        return;
      }

      toast.success("Welcome Back To MediQueue 🎉");

      setTimeout(() => {

        router.push("/");

      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-black dark:via-slate-950 dark:to-black px-4 py-20 overflow-hidden">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />

      {/* CARD */}
      <div className="relative w-full max-w-md rounded-[36px] border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-2xl overflow-hidden">

        {/* TOP */}
        <div className="relative p-10 text-center">

          {/* ICON */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">

            <FaGraduationCap className="text-white text-3xl" />
          </div>

          {/* TITLE */}
          <h1 className="mt-8 text-4xl font-black text-black dark:text-white">

            Welcome Back
          </h1>

          <p className="mt-4 text-default-600 leading-relaxed">

            Login to continue booking expert tutors and managing your learning sessions.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 pb-10 space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="font-semibold text-black dark:text-white">

              Email Address
            </label>

            <div className="relative mt-3">

              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full h-14 pl-14 pr-5 rounded-2xl bg-transparent border border-black/10 dark:border-white/10 outline-none focus:border-cyan-500 transition"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>

            <div className="flex items-center justify-between">

              <label className="font-semibold text-black dark:text-white">

                Password
              </label>

              <button
                type="button"
                className="text-sm text-cyan-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative mt-3">

              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full h-14 pl-14 pr-5 rounded-2xl bg-transparent border border-black/10 dark:border-white/10 outline-none focus:border-cyan-500 transition"
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold shadow-lg shadow-cyan-500/20"
          >

            {isSubmitting ? (
              "Logging In..."
            ) : (
              <div className="flex items-center gap-2">

                Login

                <FaArrowRight />
              </div>
            )}
          </Button>

          {/* DIVIDER */}
          <div className="relative flex items-center justify-center">

            <div className="absolute w-full border-t border-black/10 dark:border-white/10" />

            <span className="relative px-4 bg-white dark:bg-slate-950 text-default-500 text-sm">

              OR CONTINUE WITH
            </span>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={async () => {

              await authClient.signIn.social({

                provider: "google",

                callbackURL: "/",

                errorCallbackURL: "/login?error=google-failed",
              });
            }}
            className="w-full h-14 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition font-semibold"
          >

            <FcGoogle className="text-2xl" />

            Continue With Google
          </button>

          {/* REGISTER */}
          <p className="text-center text-default-600">

            Don’t have an account?{" "}

            <Link
              href="/signup"
              className="text-cyan-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}