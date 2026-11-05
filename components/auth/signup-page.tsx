"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FigmaAsset } from "../figma-asset";
import { Checkbox } from "../ui/checkbox";
import { AuthCard, AuthSocialRow, SegmentedToggle, authInputClass } from "./auth-card";

export function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password.trim() || password.length < 8) {
      next.password = "Use a password with at least 8 characters.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (role === "designer") {
      router.push("/signup/profile");
      return;
    }
    router.push("/post-project");
  }

  return (
    <main className="flex w-full flex-col items-center bg-white px-5 py-[69px]">
      <AuthCard>
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
          <div className="flex flex-col gap-2 pt-2">
            <h1 className="text-center font-sans text-2xl font-bold text-[#1a1a1a]">
              Create a Free Account
            </h1>
            <p className="text-center font-sans text-sm text-[#6b7280]">
              Please enter your details to sign in.
            </p>
          </div>
          <div className="flex flex-col gap-5 pt-2">
            <label className="flex flex-col gap-1">
              <span className="font-sans text-sm font-medium text-[#374151]">
                Full Name*
              </span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                className={authInputClass}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? (
                <span className="font-sans text-xs text-[#dc2626]">{errors.name}</span>
              ) : null}
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-sans text-sm font-medium text-[#374151]">
                Email Address*
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className={authInputClass}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <span className="font-sans text-xs text-[#dc2626]">{errors.email}</span>
              ) : null}
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-sans text-sm font-medium text-[#374151]">
                Password*
              </span>
              <span className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className={`${authInputClass} pr-10`}
                  aria-invalid={Boolean(errors.password)}
                />
                <button
                  type="button"
                  className="absolute top-0 right-3 flex h-[47px] items-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  <FigmaAsset src="/images/auth-icon-eye.svg" alt="" />
                </button>
              </span>
              {errors.password ? (
                <span className="font-sans text-xs text-[#dc2626]">
                  {errors.password}
                </span>
              ) : null}
            </label>
            <div className="flex items-center justify-between gap-4">
              <Checkbox
                id="signup-remember"
                label="Remember me"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              <button
                type="button"
                className="font-sans text-sm font-medium text-[#7b61ff]"
              >
                Forgot Password?
              </button>
            </div>
          </div>
          <SegmentedToggle
            value={role}
            onChange={setRole}
            options={[
              { value: "client", label: "I am a Client" },
              { value: "designer", label: "I am a Designer" },
            ]}
          />
          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-[#0f172a] font-sans text-base font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            Sign Up
          </button>
          <AuthSocialRow label="Or Sign up with" />
          <p className="pt-2 text-center font-sans text-sm text-[#6b7280]">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#7b61ff]">
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>
    </main>
  );
}
