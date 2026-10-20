import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const askAdvisor = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ concern: z.string().trim().min(5).max(800) }).parse(input))
  .handler(async ({ data }) => {
    const { runAdvisor } = await import("./advisor.server");
    return runAdvisor(data.concern);
  });
