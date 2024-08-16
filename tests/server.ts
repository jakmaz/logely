import { logger } from "../src/index.ts";
import { Elysia } from "elysia";

if (import.meta.main) {
  const PORT = process.env.PORT || 3000;
  const app = new Elysia()
    .use(
      logger({
        includeTimestamp: true,
        logRequest: true,
        logResponse: true,
      }),
    )
    .get("/", () => "Get method!")
    .post("/", () => "Post method!")
    .put("/", () => "Put method!")
    .delete("/", () => "Delete method!")
    .patch("/", () => "Patch method!")
    .options("/", () => "Options method!")
    .head("/", () => "Head method!")
    .listen(PORT);
}
