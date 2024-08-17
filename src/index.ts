import pc from "picocolors";
import Elysia from "elysia";
import * as fmt from "./formatters";
import { Options } from "./options";

export const logger = (options?: Options) => {
  const startTime = performance.now();

  return new Elysia({ name: "logely" })
    .state("requestStartTime", [Number.NaN, Number.NaN] as [number, number])
    .onStart(({ server }) => {
      if (options?.showBanner !== false && server) {
        const startDuration = performance.now() - startTime;
        fmt.printBanner(startDuration, String(server.url));
      }
    })
    .onRequest(({ store, request }) => {
      store.requestStartTime = process.hrtime();

      if (options?.logRequest && fmt.shouldLog("info", options?.logLevel)) {
        // Extract specific information from the request
        const method = request.method;
        const url = request.url;
        const userAgent = request.headers.get("user-agent");
        const host = request.headers.get("host");

        // Log the extracted information with styling
        console.log(pc.cyan(pc.bold("\nRequest Information:")));
        console.log(pc.magenta(`Method: ${method}`));
        console.log(pc.blue(`URL: ${url}`));
        console.log(pc.yellow(`User-Agent: ${userAgent}`));
        console.log(pc.green(`Host: ${host}`));
        console.log(" ");
      }
    })
    .onError({ as: "global" }, ({ request, error, store }) => {
      const url = new URL(request.url);
      const duration = store.requestStartTime;
      const status = "status" in error ? error.status : "-/-";

      const components: string[] = [
        pc.red("✗"),
        pc.bold(fmt.method(request.method)),
        url.pathname,
        fmt.status(status) ?? "",
        pc.dim(`[${fmt.duration(duration)}]`),
      ];

      if (options?.includeTimestamp) {
        components.unshift(pc.dim(fmt.formatTimestamp(new Date())));
      }

      if (fmt.shouldLog("error", options?.logLevel)) {
        fmt.logMessage(components.filter(Boolean), options?.logToFile);
      }
    })
    .onAfterResponse({ as: "global" }, ({ request, set, store, response }) => {
      const url = new URL(request.url);
      const duration = store.requestStartTime;

      const components: string[] = [
        pc.green("✓"),
        pc.bold(fmt.method(request.method)),
        url.pathname,
        fmt.status(set.status) ?? "",
        pc.dim(`[${fmt.duration(duration)}]`),
      ];

      if (options?.includeTimestamp) {
        components.unshift(pc.dim(fmt.formatTimestamp(new Date())));
      }

      if (fmt.shouldLog("info", options?.logLevel)) {
        fmt.logMessage(components.filter(Boolean), options?.logToFile);
      }

      if (options?.logResponse && fmt.shouldLog("info", options?.logLevel)) {
        console.log(pc.dim("\nResponse:"));
        console.log(response);
        console.log(" ");
      }
    });
};
