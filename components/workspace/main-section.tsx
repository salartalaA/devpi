"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Editor from "@monaco-editor/react";
import JsonView from "@uiw/react-json-view";
import { githubDarkTheme } from "@uiw/react-json-view/githubDark";
import axios from "axios";
import { Loader, Save, Send } from "lucide-react";
import type * as Monaco from "monaco-editor";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import RequestMethodCombobox from "@/components/workspace/req-method-combobox";
import { cn, getStatusColor } from "@/lib/utils";
import { type RequestData, RequestSchema } from "@/schemas/request";
import { useRequestStore } from "@/store/request-store";

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Intentional
export default function MainSection() {
  const [monaco, setMonaco] =
    useState<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const requests = useRequestStore((state) => state.requests);

  const activeRequestId = useRequestStore((state) => state.activeRequestId);

  const activeRequest = requests.find((req) => req.id === activeRequestId);

  const responseResult = activeRequest?.response;

  const responseStats = activeRequest?.response?.stats;

  const responseContentType = activeRequest?.response.stats?.contentType;

  const activeStatusOption = activeRequest?.response?.activeTab;

  const requestError = activeRequest?.response.error;

  const unsupportedResponse = activeRequest?.response.unsupportedResponse;

  const monacoError = activeRequest?.response.monacoError;

  const activeRequestUrl = activeRequest?.url;

  const isRaw = activeRequest?.response.isRaw;

  const activeOption = activeRequest?.activeOption;

  const activeAuthOption = activeRequest?.options.auth.type;

  const {
    formState: { errors },
    // handleSubmit,
  } = useForm<RequestData>({
    resolver: zodResolver(RequestSchema),
    // values: {
    //   URL: activeRequestUrl as string,
    // },
  });

  useEffect(() => {
    if (errors.URL) {
      toast.error(errors.URL.message);
    }
  }, [errors.URL]);

  const updateRequest = useRequestStore((state) => state.updateRequest);

  const onsubmit = async () => {
    setIsSubmitting(true);

    let parsedBody: unknown;

    const requestBodyValue = activeRequest?.options.body.value;

    if (activeRequest?.options.body.type === "json" && requestBodyValue) {
      try {
        parsedBody = JSON.parse(requestBodyValue);
      } catch {
        toast.error("Invalid JSON");
        return;
      }
    }

    const auth =
      activeRequest?.options.auth.type === "basic-auth"
        ? {
            password: activeRequest.options.auth.value.password ?? "",
            username: activeRequest.options.auth.value.username ?? "",
          }
        : undefined;

    try {
      const startTime = performance.now();

      const response = await axios.request({
        auth,
        data: parsedBody,
        method: activeRequest?.method,
        url: activeRequestUrl,
        validateStatus: () => true,
      });

      const duration = Math.round(performance.now() - startTime);

      const contentType = response.headers["content-type"];

      if (typeof contentType !== "string") {
        updateRequest(activeRequestId!, {
          response: {
            stats: {
              contentType: null,
              duration: 0,
              headerStats: {
                connection: "",
                date: "",
                keepAlive: "",
                transferEncoding: "",
                vary: "",
              },
              size: "",
              status: {
                code: 0,
                text: "",
              },
            },
          },
        });
        updateRequest(activeRequestId!, {
          response: {
            unsupportedResponse: true,
          },
        });

        setIsSubmitting(false);
        return;
      }

      if (!contentType.includes("application/json")) {
        updateRequest(activeRequestId!, {
          response: {
            stats: {
              contentType,
              duration: 0,
              headerStats: {
                connection: "",
                date: "",
                keepAlive: "",
                transferEncoding: "",
                vary: "",
              },
              size: "",
              status: {
                code: 0,
                text: "",
              },
            },
          },
        });
        updateRequest(activeRequestId!, {
          response: {
            unsupportedResponse: true,
          },
        });

        setIsSubmitting(false);
        return;
      }

      const blob = new Blob([JSON.stringify(response.data)]);

      const responseSize = (blob.size / 1024).toFixed(1);

      updateRequest(activeRequestId!, {
        response: {
          data: response.data,
          error: null,
          isRaw: false,
          monacoError: [],
          stats: {
            contentType,
            duration,
            headerStats: {
              connection: response.headers.connection,
              date: response.headers.date,
              keepAlive: response.headers["keep-alive"],
              transferEncoding: response.headers["transfer-encoding"],
              vary: response.headers.vary,
            },
            size: responseSize,
            status: {
              code: response.status,
              text: response.statusText,
            },
          },
          unsupportedResponse: false,
        },
      });

      setIsSubmitting(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        updateRequest(activeRequestId!, {
          response: {
            error: error.message,
          },
        });

        setIsSubmitting(false);
        return;
      }

      updateRequest(activeRequestId!, {
        response: {
          error: "Something went wrong!",
        },
      });

      setIsSubmitting(false);
    }
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

  const jsonBody = [
    { label: "None", value: "none" },
    { label: "JSON", value: "json" },
  ];

  const authTabItems = [
    { label: "No Auth", value: "no-auth" },
    { label: "Basic Auth", value: "basic-auth" },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-40">
            <RequestMethodCombobox />
          </div>

          <form
            className="flex w-full items-center gap-3"
            // onSubmit={handleSubmit(onsubmit)}
            onSubmit={(e) => {
              e.preventDefault();
              onsubmit();
            }}
          >
            <Input
              autoComplete="off"
              className="h-9"
              onChange={(e) =>
                updateRequest(activeRequestId!, {
                  url: e.target.value,
                })
              }
              placeholder="https://jsonplaceholder.typicode.com/users/"
              type="text"
              value={activeRequestUrl?.trim()}
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

        <div className="mt-2 flex items-center gap-1">
          <Button
            className="w-fit"
            onClick={() =>
              updateRequest(activeRequestId!, {
                activeOption: "body",
              })
            }
            variant={activeOption === "body" ? "default" : "outline"}
          >
            Body
          </Button>

          <Button
            className="w-fit"
            onClick={() =>
              updateRequest(activeRequestId!, {
                activeOption: "auth",
              })
            }
            variant={activeOption === "auth" ? "default" : "outline"}
          >
            Auth
          </Button>
        </div>

        {activeOption === "auth" && (
          <Select
            items={authTabItems}
            onValueChange={(type) =>
              updateRequest(activeRequestId!, {
                options: {
                  auth: {
                    ...activeRequest?.options.auth,
                    type: type as "no-auth" | "basic-auth",
                  },
                },
              })
            }
            value={activeRequest?.options.auth.type ?? "no-auth"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="No Auth" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {authTabItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {activeOption === "body" && (
          <>
            <div className="flex items-center gap-2">
              <Select
                defaultValue="none"
                items={jsonBody}
                onValueChange={(type) => {
                  if (!(activeRequestId && activeRequest)) {
                    return;
                  }

                  updateRequest(activeRequestId, {
                    options: {
                      body: {
                        type: type as "none" | "json",
                        value:
                          type === "json" && !activeRequest.options.body.value
                            ? `{
  "key": "value"
}`
                            : activeRequest.options.body.value,
                      },
                    },
                  });
                }}
                value={activeRequest?.options.body.type}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="None" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {jsonBody.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {activeRequest?.options.body.type === "json" && (
                <Button
                  onClick={() =>
                    monaco?.getAction("editor.action.formatDocument")?.run()
                  }
                  variant="outline"
                >
                  Format
                </Button>
              )}
            </div>

            {activeRequest?.options.body.type === "json" && (
              <Editor
                height="300px"
                language="json"
                onChange={(value) => {
                  if (!(activeRequestId && activeRequest)) {
                    return;
                  }

                  updateRequest(activeRequestId, {
                    options: {
                      body: {
                        type: activeRequest.options.body.type,
                        value: value ?? "",
                      },
                    },
                  });
                }}
                onMount={setMonaco}
                onValidate={(error) =>
                  updateRequest(activeRequestId!, {
                    response: {
                      monacoError: error,
                    },
                  })
                }
                options={{
                  automaticLayout: true,
                  fontSize: 13,
                  formatOnPaste: true,
                  formatOnType: true,
                  insertSpaces: true,
                  lineNumbers: "on",
                  minimap: {
                    enabled: false,
                  },
                  scrollBeyondLastLine: false,
                  tabSize: 2,
                  wordWrap: "on",
                }}
                theme="vs-dark"
                value={activeRequest?.options.body.value ?? ""}
              />
            )}

            {monacoError!.length > 0 && (
              <div className="mt-2 space-y-1">
                {monacoError?.map((error) => (
                  <p
                    className="text-destructive text-sm"
                    key={`${error.startLineNumber}-${error.startColumn}-${error.message}`}
                  >
                    Line {error.startLineNumber}: {error.message}
                  </p>
                ))}
              </div>
            )}
          </>
        )}

        {isSubmitting && (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-border bg-surface px-8 py-6">
            <Loader className="animate-spin text-primary" size={16} />

            <span className="text-sm text-text-subtle">
              Sending Request ...
            </span>
          </div>
        )}
        {activeAuthOption === "basic-auth" && (
          <div className="flex items-center gap-2">
            <div className="w-full">
              <label className="text-sm" htmlFor="username">
                Username
              </label>
              <Input
                autoComplete="off"
                id="username"
                onChange={(e) =>
                  updateRequest(activeRequestId!, {
                    options: {
                      auth: {
                        ...activeRequest?.options.auth,
                        value: {
                          ...activeRequest?.options.auth.value,
                          username: e.target.value,
                        },
                      },
                    },
                  })
                }
                placeholder="john_doe"
                type="text"
              />
            </div>

            <div className="w-full">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <Input
                autoComplete="off"
                id="password"
                onChange={(e) =>
                  updateRequest(activeRequestId!, {
                    options: {
                      auth: {
                        ...activeRequest?.options.auth,
                        value: {
                          ...activeRequest?.options.auth.value,
                          password: e.target.value,
                        },
                      },
                    },
                  })
                }
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
        )}

        {!isSubmitting && requestError && (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-destructive/30 bg-surface p-8">
            <span className="font-medium text-destructive">Request failed</span>

            <span className="text-sm text-text-subtle">{requestError}</span>
          </div>
        )}

        {!isSubmitting && unsupportedResponse && (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-8">
            <span className="font-medium">Request completed</span>

            <span className="text-center text-sm text-text-subtle">
              The response was received, but this response format is not
              supported.
            </span>

            {responseContentType && (
              <span className="font-mono text-text-subtle text-xs">
                Content-Type: {responseContentType}
              </span>
            )}
          </div>
        )}

        {!(isSubmitting || requestError || unsupportedResponse) &&
          responseResult?.data === null && (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-8">
              <span className="text-sm text-text-subtle">
                No response yet — click Send to execute this request
              </span>
            </div>
          )}

        {!isSubmitting && responseResult?.data !== null && (
          <>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div
                className={cn(
                  "inline-flex items-center rounded-md border border-transparent px-2 py-0.5 font-bold text-xs transition-colors",
                  getStatusColor(responseStats?.status.code as number)
                )}
              >
                {responseStats?.status.code} {responseStats?.status.text}
              </div>

              <span className="text-muted-foreground text-xs">
                {responseStats?.duration}ms
              </span>

              <span className="text-muted-foreground text-xs">
                {responseStats?.size} KB
              </span>

              <span className="text-text-subtle text-xs">
                {responseStats?.contentType}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="w-fit"
                onClick={() =>
                  updateRequest(activeRequestId!, {
                    response: {
                      activeTab: "body",
                    },
                  })
                }
                variant={activeStatusOption === "body" ? "default" : "outline"}
              >
                Body
              </Button>

              <Button
                className="w-fit"
                onClick={() =>
                  updateRequest(activeRequestId!, {
                    response: {
                      activeTab: "headers",
                    },
                  })
                }
                variant={
                  activeStatusOption === "headers" ? "default" : "outline"
                }
              >
                Headers
              </Button>
            </div>
            {activeStatusOption === "body" && responseResult?.data && (
              <>
                <div className="flex items-center">
                  <Button
                    className={cn(
                      "rounded-e-none",
                      isRaw &&
                        "border-border bg-transparent hover:bg-transparent"
                    )}
                    onClick={() =>
                      updateRequest(activeRequestId!, {
                        response: {
                          isRaw: false,
                        },
                      })
                    }
                  >
                    Pretty
                  </Button>

                  <Button
                    className={cn(
                      "rounded-s-none",
                      !isRaw &&
                        "border-border bg-transparent hover:bg-transparent"
                    )}
                    onClick={() =>
                      updateRequest(activeRequestId!, {
                        response: {
                          isRaw: true,
                        },
                      })
                    }
                  >
                    Raw
                  </Button>
                </div>
                <ScrollArea className="h-120 rounded-xl border border-border bg-surface p-3">
                  {isRaw ? (
                    <pre className="m-1 whitespace-pre-wrap font-mono text-muted-foreground text-sm">
                      {JSON.stringify(responseResult.data, null, 2)}
                    </pre>
                  ) : (
                    <JsonView
                      displayDataTypes={false}
                      displayObjectSize={false}
                      enableClipboard
                      style={prettyTheme}
                      value={responseResult?.data}
                    />
                  )}
                </ScrollArea>
              </>
            )}

            {activeStatusOption === "headers" && (
              <div className="rounded-xl border border-border">
                <Table className="w-full text-xs **:hover:bg-transparent">
                  <TableBody>
                    <TableRow className="border-b last:border-0">
                      <TableCell
                        className="px-3 py-1.5 font-mono font-semibold"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        vary
                      </TableCell>

                      <TableCell
                        className="px-3 py-1.5 font-mono"
                        style={{ color: "var(--foreground)" }}
                      >
                        {responseStats?.headerStats.vary}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border-b last:border-0">
                      <TableCell
                        className="px-3 py-1.5 font-mono font-semibold"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        content-type
                      </TableCell>

                      <TableCell
                        className="px-3 py-1.5 font-mono"
                        style={{ color: "var(--foreground)" }}
                      >
                        {responseStats?.contentType}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border-b last:border-0">
                      <TableCell
                        className="px-3 py-1.5 font-mono font-semibold"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        Date
                      </TableCell>

                      <TableCell
                        className="px-3 py-1.5 font-mono"
                        style={{ color: "var(--foreground)" }}
                      >
                        {responseStats?.headerStats.date}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border-b last:border-0">
                      <TableCell
                        className="px-3 py-1.5 font-mono font-semibold"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        Connection
                      </TableCell>

                      <TableCell
                        className="px-3 py-1.5 font-mono"
                        style={{ color: "var(--foreground)" }}
                      >
                        {responseStats?.headerStats.connection}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border-b last:border-0">
                      <TableCell
                        className="px-3 py-1.5 font-mono font-semibold"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        Keep-Alive
                      </TableCell>

                      <TableCell
                        className="px-3 py-1.5 font-mono"
                        style={{ color: "var(--foreground)" }}
                      >
                        {responseStats?.headerStats.keepAlive}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border-b last:border-0">
                      <TableCell
                        className="px-3 py-1.5 font-mono font-semibold"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        Transfer-Encoding
                      </TableCell>

                      <TableCell
                        className="px-3 py-1.5 font-mono"
                        style={{ color: "var(--foreground)" }}
                      >
                        {responseStats?.headerStats.transferEncoding}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
