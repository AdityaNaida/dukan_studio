import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password.length > 6 || formData.password.length === 6) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error || !data.session) {
          const message =
            error?.message === "Invalid login credentials"
              ? "Wrong email or password."
              : (error?.message ?? "Could not sign you in. Try again.");
          toast.error(message, {
            autoClose: 1000,
            position: "bottom-right",
          });
          setIsSubmitting(false);
          return;
        }

        localStorage.setItem("UserSession", data.session.access_token);
        toast.success("Login successful!", {
          autoClose: 600,
          position: "bottom-right",
        });

        setIsSubmitting(false);
        window.location.reload();

        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error connecting to server.", {
          autoClose: 1000,
          position: "bottom-right",
        });
        setIsSubmitting(false);
      }
    } else {
      toast.error("Password min 6 characters.", {
        autoClose: 600,
        position: "bottom-right",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dukaan bg-paper text-ink min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          Sign in
        </p>
        <h1 className="font-display mt-3 text-3xl md:text-4xl">
          Welcome back<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-2 text-ink-soft">
          Your posters are waiting for a verdict.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5 rounded-xl border border-ink/12 bg-paper-raised p-6 shadow-[0_16px_40px_rgba(34,29,24,0.12)] sm:p-8"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
            >
              Email ID<span className="text-vermilion">*</span>
            </label>
            <input
              className="h-12 w-full rounded-lg border border-ink/20 bg-paper px-3 text-sm outline-none transition-colors placeholder:text-ink-soft/60 focus:border-vermilion focus:ring-2 focus:ring-vermilion/20"
              placeholder="you@example.com"
              type="email"
              required
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
            >
              Password<span className="text-vermilion">*</span>
            </label>
            <div className="relative">
              <input
                className="h-12 w-full rounded-lg border border-ink/20 bg-paper px-3 pr-10 text-sm outline-none transition-colors placeholder:text-ink-soft/60 focus:border-vermilion focus:ring-2 focus:ring-vermilion/20"
                placeholder="min 6 characters"
                type={viewPassword ? "text" : "password"}
                required
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
              />
              {viewPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-ink-soft"
                  onClick={() => {
                    setViewPassword((prev) => !prev);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-ink-soft"
                  onClick={() => {
                    setViewPassword((prev) => !prev);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className="mt-2 h-12 cursor-pointer rounded-full bg-vermilion text-sm font-semibold text-paper-raised shadow-[0_10px_24px_rgba(197,48,12,0.3)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  className="size-5 animate-spin"
                >
                  <path
                    fill="currentColor"
                    d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75v-2.437A7.312 7.312 0 1 1 19.313 12h2.437c0-5.384-4.366-9.75-9.75-9.75"
                  ></path>
                </svg>
              </div>
            ) : (
              <>Login</>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Don&apos;t have an account?{" "}
          <NavLink
            to={"/signup"}
            className="font-medium text-vermilion underline underline-offset-4"
          >
            Signup
          </NavLink>
        </p>
      </div>
    </div>
  );
}
