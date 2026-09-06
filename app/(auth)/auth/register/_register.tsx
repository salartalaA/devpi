"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  Boxes,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  UserIcon,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Branding from "@/components/auth/branding";
import { Rule } from "@/components/auth/rules";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type RegisterData, registerSchema } from "@/schemas/auth.schema";
import { registerUser } from "@/server/actions/auth";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    watch,
  } = useForm<RegisterData>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const password = watch("password") ?? "";
  const username = watch("username") ?? "";

  const usernameRules = {
    length: username.length >= 5,
    // biome-ignore lint/performance/useTopLevelRegex: Regexes are only used in this component.
    lowercase: /^[a-z]/.test(username) || /^[a-z0-9_]+$/.test(username),
    // biome-ignore lint/performance/useTopLevelRegex: Regexes are only used in this component.
    validChars: /^[a-z0-9_]+$/.test(username),
  };

  const rules = {
    length: password.length >= 8,
    // biome-ignore lint/performance/useTopLevelRegex: Regexes are only used in this component.
    lowercase: /[a-z]/.test(password),
    // biome-ignore lint/performance/useTopLevelRegex: Regexes are only used in this component.
    number: /\d/.test(password),
    // biome-ignore lint/performance/useTopLevelRegex: Regexes are only used in this component.
    special: /[^A-Za-z0-9]/.test(password),
    // biome-ignore lint/performance/useTopLevelRegex: Regexes are only used in this component.
    uppercase: /[A-Z]/.test(password),
  };

  const showPasswordFunc = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (newUser: RegisterData) => {
    const result = await registerUser(newUser);

    if (result?.field === "email" || result?.field === "username") {
      return toast.error(result?.message);
    }

    toast.success("Account created successfully!");

    router.push("/auth/login");
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center px-4 py-8 md:px-8">
      <div className="db-anim-fade-in relative grid w-full max-w-6xl grid-cols-1 items-center gap-8 rounded-2xl border border-border bg-card p-[clamp(1.5rem,4vw,3rem)] text-card-foreground shadow-lg lg:grid-cols-2 lg:gap-12">
        <Branding />

        {/* AUTH SECTION */}
        <div className="order-1 mx-auto flex w-full max-w-md flex-col gap-7 lg:order-2">
          <div className="flex flex-col gap-3">
            <div className="db-anim-fade-up flex items-center gap-2.5">
              <span className="rounded-full bg-gradient-primary p-2 shadow-glow">
                <Boxes />
              </span>
              <span className="font-bold text-foreground text-lg tracking-tight">
                DevBox
              </span>
            </div>
            <div className="db-anim-fade-up db-delay-1 flex flex-col gap-1.5">
              <h1 className="font-bold text-3xl text-foreground leading-tight tracking-tight md:text-[2rem]">
                Create your account
              </h1>
              <p className="text-muted-foreground text-sm">
                Join DevBox and get every developer tool in one place.
              </p>
            </div>
          </div>

          <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5">
              <div className="db-anim-fade-up db-delay-2 flex flex-col gap-4">
                {/* Fullname */}

                <div className="flex flex-col gap-4">
                  <label
                    className="font-medium text-muted-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>

                  <div className="group relative -mt-2 flex items-center rounded-xl border border-border bg-surface transition-all focus-within:border-primary">
                    <span className="flex items-center pl-3.5 text-text-subtle transition-colors group-focus-within:text-primary">
                      <UserIcon size={17} />
                    </span>
                    <Input
                      autoComplete="off"
                      className="h-11 border-none px-3 py-3 text-foreground text-sm outline-0 ring-0 focus:outline-none focus:ring-0 focus-visible:border-input focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
                      id="fullName"
                      placeholder="John Doe"
                      type="text"
                      {...register("fullName")}
                    />
                    <div className="pr-3.5" />
                  </div>

                  {errors.fullName && (
                    <p className="-mt-4 font-semibold text-accent-lavender text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Username */}

                <div className="flex flex-col gap-4">
                  <label
                    className="font-medium text-muted-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="username"
                  >
                    Username
                  </label>

                  <div className="group relative -mt-2 flex items-center rounded-xl border border-border bg-surface transition-all focus-within:border-primary">
                    <span className="flex items-center pl-3.5 text-text-subtle transition-colors group-focus-within:text-primary">
                      <AtSign size={17} />
                    </span>
                    <Input
                      autoComplete="off"
                      className="h-11 border-none px-3 py-3 text-foreground text-sm outline-0 ring-0 focus:outline-none focus:ring-0 focus-visible:border-input focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
                      id="username"
                      placeholder="john_doe"
                      type="text"
                      {...register("username")}
                    />
                    <div className="pr-3.5" />
                  </div>

                  {username ? (
                    <div className="fade-in slide-in-from-top-2 -mt-2 animate-in space-y-2 rounded-lg border bg-muted/30 p-3 duration-200">
                      <Rule valid={usernameRules.length}>
                        At least 5 characters
                      </Rule>

                      <Rule valid={usernameRules.validChars}>
                        Only lowercase letters, numbers, and underscores
                      </Rule>
                    </div>
                  ) : (
                    <p className="-mt-3 text-muted-foreground text-xs">
                      Only lowercase letters, numbers, and underscores
                    </p>
                  )}
                </div>

                {/* Email */}

                <div className="flex flex-col gap-4">
                  <label
                    className="font-medium text-muted-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email address
                  </label>

                  <div className="group relative -mt-2 flex items-center rounded-xl border border-border bg-surface transition-all focus-within:border-primary">
                    <span className="flex items-center pl-3.5 text-text-subtle transition-colors group-focus-within:text-primary">
                      <Mail size={17} />
                    </span>
                    <Input
                      autoComplete="off"
                      className="h-11 border-none px-3 py-3 text-foreground text-sm outline-0 ring-0 focus:outline-none focus:ring-0 focus-visible:border-input focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
                      id="email"
                      placeholder="example@gmail.com"
                      type="email"
                      {...register("email")}
                    />
                    <div className="pr-3.5" />
                  </div>

                  {errors.email && (
                    <p className="-mt-4 font-semibold text-accent-lavender text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}

                <div className="flex flex-col gap-4">
                  <label
                    className="font-medium text-muted-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <div className="group relative -mt-2 flex items-center rounded-xl border border-border bg-surface transition-all focus-within:border-primary">
                    <span className="flex items-center pl-3.5 text-text-subtle transition-colors group-focus-within:text-primary">
                      <Lock size={17} />
                    </span>
                    <Input
                      autoComplete="off"
                      className="h-11 border-none px-3 py-3 text-foreground text-sm outline-0 ring-0 focus:outline-none focus:ring-0 focus-visible:border-input focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
                      id="password"
                      placeholder="Create a strong password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <button
                      className="flex items-center rounded-r-xl px-3.5 transition-colors disabled:opacity-50"
                      onMouseDown={showPasswordFunc}
                      type="button"
                    >
                      {showPassword ? (
                        <EyeOff className="text-primary" size={17} />
                      ) : (
                        <Eye className="text-text-subtle" size={17} />
                      )}
                    </button>
                  </div>

                  {password.length > 0 ? (
                    <div className="fade-in slide-in-from-top-2 -mt-2 animate-in space-y-2 rounded-lg border bg-muted/30 p-3 duration-200">
                      <Rule valid={rules.length}>At least 8 characters</Rule>

                      <Rule valid={rules.lowercase}>One lowercase letter</Rule>

                      <Rule valid={rules.uppercase}>One uppercase letter</Rule>

                      <Rule valid={rules.number}>One number</Rule>

                      <Rule valid={rules.special}>One special character</Rule>
                    </div>
                  ) : (
                    <p className="-mt-3 text-muted-foreground text-xs">
                      Use 8+ characters with uppercase, lowercase, number, and
                      symbol
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="group db-anim-fade-up db-delay-3 -mt-2 flex flex-col gap-4">
              <Button
                className="h-11 w-full rounded-xl bg-gradient-primary px-5 py-2.5 font-semibold text-primary-foreground text-sm shadow-md outline-none transition-all hover:bg-primary-hover focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:bg-primary-active"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <Loader className="animate-spin" size={17} />
                ) : (
                  <>
                    <span>Create account</span>
                    <UserPlus
                      className={cn(
                        "transition-transform",
                        !isSubmitting &&
                          isValid &&
                          "group-hover:translate-x-0.5"
                      )}
                      size={17}
                    />
                  </>
                )}
              </Button>
            </div>
          </form>
          <div className="h-px w-full shrink-0 bg-border opacity-50" />

          <div className="db-anim-fade-up db-delay-4">
            <p className="text-center text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                className="rounded font-semibold text-primary transition-colors"
                href="/auth/login"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="h-px w-full shrink-0 bg-border opacity-50" />

          <div className="-mt-3 flex items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 text-[0.6875rem] text-text-subtle">
              <span
                className="h-1.5 w-1.5 rounded-full bg-success"
                style={{
                  animation:
                    "2s ease 0s infinite normal none running db-breathe",
                }}
              />
              Encrypted end-to-end
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
