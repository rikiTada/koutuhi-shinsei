import { z } from "zod";

export const formSchema = z.object({
  recipient: z.string().email(),
  month: z.string().min(1),
  name: z.string().min(1),
  draft: z.boolean(),
  options: z
    .object({
      attachments: z.array(z.instanceof(Blob)).optional(),
    })
    .nullable(),
});

export type FormData = z.infer<typeof formSchema>;
