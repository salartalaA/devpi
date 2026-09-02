"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Boxes,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Branding from "@/components/auth/branding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type LoginData, loginSchema } from "@/schemas/auth.schema";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordFunc = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowPassword((prev) => !prev);
  };

  const onSubmit = async () => {
    await new Promise((resolver) => setTimeout(resolver, 1000));

    toast.success("Welcome back!", {
      classNames: { closeButton: "bg-card!" },
      closeButton: true,
      position: "top-center",
    });
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
                Welcome back
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to your toolbox and pick up where you left off.
              </p>
            </div>
          </div>

          <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5">
              <div className="db-anim-fade-up db-delay-2 flex flex-col gap-4">
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
                      placeholder="••••••••"
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

                  {errors.password && (
                    <p className="-mt-4 font-semibold text-accent-lavender text-sm">
                      {errors.password.message}
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
                    <span>Sign in</span>
                    <ArrowRight
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
              Don't have an account?{" "}
              <Link
                className="rounded font-semibold text-primary transition-colors"
                href="/auth/register"
              >
                Create one
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
