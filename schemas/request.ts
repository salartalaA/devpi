import { z } from "zod";

export const RequestSchema = z.object({
  auth: z.object({
    basicAuth: z.object({
      password: z.string().optional(),
      username: z.string().optional(),
    }),
  }),
  body: z.string().optional(),
  URL: z.url("Please enter a valid URL").trim(),
});

export type RequestData = z.infer<typeof RequestSchema>;
