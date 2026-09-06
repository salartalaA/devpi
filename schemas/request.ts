import { z } from "zod";

export const RequestURLSchema = z.object({
  URL: z.url("Please enter a valid URL").trim(),
});

export type RequestURLData = z.infer<typeof RequestURLSchema>;
