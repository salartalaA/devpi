"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import JsonView from "@uiw/react-json-view";
import { githubDarkTheme } from "@uiw/react-json-view/githubDark";
import { Loader, Save, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RequestMethodCombobox from "@/components/workspace/req-method-combobox";
import { cn } from "@/lib/utils";
import { type RequestURLData, RequestURLSchema } from "@/schemas/request";
import { ScrollArea } from "../ui/scroll-area";

export default function MainSection() {
  const [responseResult, setResponseResult] = useState([]);
  const [isRaw, setIsRaw] = useState(false);

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<RequestURLData>({
    resolver: zodResolver(RequestURLSchema),
  });

  useEffect(() => {
    if (errors.URL) {
      toast.error(errors.URL.message);
    }
  }, [errors.URL]);

  const onsubmit = async ({ URL }: RequestURLData) => {
    const response = await fetch(URL)
      .then((req) => req.json())
      .then((data) => data);

    if (!response) {
      return toast.error("Something went wrong!");
    }

    setResponseResult(response);
  };

  const prettyTheme = {
    ...githubDarkTheme,

    "--w-rjv-background-color": "transparent",
    "--w-rjv-brackets-color": "var(--foreground-subtle)",
    "--w-rjv-colon-color": "var(--foreground-subtle)",
    "--w-rjv-color": "var(--foreground)",

    "--w-rjv-curlybraces-color": "var(--foreground-subtle)",

    "--w-rjv-key-string": "var(--accent-sky)",
    "--w-rjv-type-boolean-color": "var(--accent-lime)",
    "--w-rjv-type-float-color": "var(--accent-lime)",
    "--w-rjv-type-int-color": "var(--accent-lime)",
    "--w-rjv-type-string-color": "var(--accent-mint)",
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-40">
            <RequestMethodCombobox />
          </div>

          <form
            className="flex w-full items-center gap-3"
            onSubmit={handleSubmit(onsubmit)}
          >
            <Input
              {...register("URL")}
              autoComplete="off"
              className="h-9"
              placeholder="http://localhost:3000/api/users"
              type="text"
            />

            <Button
              className="flex h-9 w-24 items-center gap-2"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <Send />
                  <span>Send</span>
                </>
              )}
            </Button>

            <Button className="h-9" variant="ghost">
              <Save />
            </Button>
          </form>
        </div>

        {responseResult.length > 0 ? (
          <>
            <div className="flex items-center">
              <Button
                className={cn(
                  "rounded-e-none",
                  isRaw && "border-border bg-transparent hover:bg-transparent"
                )}
                onClick={() => setIsRaw(false)}
              >
                Pretty
              </Button>
              <Button
                className={cn(
                  "rounded-s-none",
                  !isRaw && "border-border bg-transparent hover:bg-transparent"
                )}
                onClick={() => setIsRaw(true)}
              >
                Raw
              </Button>
            </div>

            <ScrollArea className="h-120 rounded-xl border border-border bg-surface p-3">
              {isRaw ? (
                <pre className="m-1 whitespace-pre-wrap font-mono text-muted-foreground text-sm">
                  {JSON.stringify(responseResult, null, 2)}
                </pre>
              ) : (
                <JsonView
                  displayDataTypes={false}
                  displayObjectSize={false}
                  enableClipboard
                  style={prettyTheme}
                  value={responseResult}
                />
              )}
            </ScrollArea>
          </>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-8">
            <span className="text-sm text-text-subtle">
              No response yet — click Send to execute this request
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
