import type Monaco from "monaco-editor";
import { create } from "zustand";
import type { RequestData } from "@/schemas/request";
import type { RequestMethod } from "@/types";

interface MethodState {
  method: RequestMethod | null;
  setMethod: (newMethod: RequestMethod) => void;
}

interface RequestOptionsUpdate {
  auth?: Partial<RequestAuth>;
  body?: Partial<RequestBody>;
}

interface RequestTabUpdate {
  activeOption?: ActiveOption;
  id?: string;
  method?: RequestMethod;
  name?: string;
  options?: RequestOptionsUpdate;
  response?: Partial<RequestResponse>;
  url?: string;
}

interface RequestBody {
  type: "none" | "json";
  value: RequestData["body"];
}

interface RequestAuth {
  type: "no-auth" | "basic-auth";
  value: RequestData["auth"]["basicAuth"];
}

interface RequestOptions {
  auth: RequestAuth;
  body: RequestBody;
}

interface HeaderStats {
  connection: string;
  date: string;
  keepAlive: string;
  transferEncoding: string;
  vary: string;
}

interface ResponseStats {
  contentType: string | null;
  duration: number;
  headerStats: HeaderStats;
  size: string;
  status: {
    code: number;
    text: string;
  };
}

type ActiveStatusOption = "body" | "headers" | "cookies";

type ActiveOption = "body" | "params" | "auth" | "headers";

interface RequestResponse {
  activeTab?: ActiveStatusOption;

  data: unknown | null;

  error: string | null;

  isRaw: boolean;

  monacoError: Monaco.editor.IMarker[] | [];

  stats: ResponseStats | null;

  unsupportedResponse: boolean;
}

interface RequestTab {
  activeOption: ActiveOption;
  id: string;
  method: RequestMethod;
  name: string;

  options: RequestOptions;

  response: RequestResponse;

  url: string;
}

interface RequestStore {
  activeRequestId: string | null;

  closeRequest: (id: string) => void;

  createRequest: () => void;

  requests: RequestTab[];

  setActiveRequest: (id: string) => void;

  updateRequest: (id: string, updates: RequestTabUpdate) => void;
}

const defaultJsonBody = `{
  "key": "value"
}`;

const defaultResponse: RequestResponse = {
  activeTab: "body",
  data: null,
  error: null,
  isRaw: false,
  monacoError: [],
  stats: null,
  unsupportedResponse: false,
};

export const useMethod = create<MethodState>((set) => ({
  method: "GET",

  setMethod: (newMethod) => set({ method: newMethod }),
}));

export const useRequestStore = create<RequestStore>((set) => ({
  activeRequestId: "6a4f4cd5-d09f-4cd9-a7b8-f0d620ac998d",

  closeRequest: (id) => {
    set((state) => {
      const index = state.requests.findIndex((request) => request.id === id);

      const requests = state.requests.filter((request) => request.id !== id);

      if (state.activeRequestId !== id) {
        return {
          requests,
        };
      }

      const nextRequest = requests[index] ?? requests[index - 1] ?? null;

      return {
        activeRequestId: nextRequest?.id ?? null,
        requests,
      };
    });
  },

  createRequest: () => {
    const newRequest: RequestTab = {
      activeOption: "body",
      id: crypto.randomUUID(),

      method: "GET",

      name: "New Request",

      options: {
        auth: {
          type: "no-auth",
          value: {
            password: "",
            username: "",
          },
        },
        body: {
          type: "none",
          value: defaultJsonBody,
        },
      },

      response: defaultResponse,

      url: "",
    };

    set((state) => ({
      activeRequestId: newRequest.id,

      requests: [...state.requests, newRequest],
    }));
  },

  requests: [
    {
      activeOption: "body",
      id: "6a4f4cd5-d09f-4cd9-a7b8-f0d620ac998d",
      method: "GET",
      name: "New Request",

      options: {
        auth: {
          type: "no-auth",
          value: {
            password: "",
            username: "",
          },
        },
        body: {
          type: "none",
          value: defaultJsonBody,
        },
      },

      response: defaultResponse,

      url: "",
    },
  ],

  setActiveRequest: (id) => {
    set({
      activeRequestId: id,
    });
  },

  // updateRequest: (id, updates) => {
  //   set((state) => ({
  //     requests: state.requests.map((request) =>
  //       request.id === id
  //         ? {
  //             ...request,
  //             ...updates,

  //             options: {
  //               ...request.options,
  //               ...updates.options,
  //             },

  //             response: {
  //               ...request.response,
  //               ...updates.response,
  //             },
  //           }
  //         : request
  //     ),
  //   }));
  // },

  updateRequest: (id, updates) => {
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === id
          ? {
              ...request,
              ...updates,
              options: {
                ...request.options,
                ...updates.options,

                auth: {
                  ...request.options.auth,
                  ...updates.options?.auth,
                  type:
                    updates.options?.auth?.type ?? request.options.auth.type,
                  value: {
                    ...request.options.auth.value,
                    ...updates.options?.auth?.value,
                  },
                },

                body: {
                  ...request.options.body,
                  ...updates.options?.body,
                },
              },
              response: {
                ...request.response,
                ...updates.response,
              },
            }
          : request
      ),
    }));
  },
}));
