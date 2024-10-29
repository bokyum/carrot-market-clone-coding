import { z } from "zod";

export const productSchema = z.object({
  photo: z.string({
    required_error: "사진을 추가해주세요.",
  }),
  title: z.string().min(10),
  price: z.coerce.number(),
  description: z.string(),
});

export type ProductType = z.infer<typeof productSchema>;
