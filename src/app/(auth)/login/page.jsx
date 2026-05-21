"use client";

import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
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

      if (res?.error) {
        toast.error(res.error.message || "Login failed!");
        return;
      }

      // ✅ Success toast
      toast.success("Login successful! 🎉");

      // ✅ Redirect after short delay
      setTimeout(() => {
        router.push("/");
      }, 2200);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-96 bg-base-100 shadow-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Submit */}
        <button className="btn btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Google Login */}
        <button
          type="button"
          onClick={async () => {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/",
              errorCallbackURL: "/register?error=google-failed",
            });
          }}
          className="flex items-center justify-center gap-3 w-full border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
      </form>
    </div>
  );
}