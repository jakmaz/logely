import pc from "picocolors";
import Elysia from "elysia";
import { Options } from "./options";
import {
  formatMethod,
  printBanner,
  formatDuration,
  formatStatus,
  formatTimestamp,
} from "./formatters";
import { logToConsole, logToFile, shouldLog } from "./loggers";

export const logger = (options?: Options) => {
  const startTime = performance.now();

  return new Elysia({ name: "logely" })
    .state("requestStartTime", [Number.NaN, Number.NaN] as [number, number])
    .onStart(({ server }) => {
      if (options?.showBanner !== false && server) {
        const startDuration = performance.now() - startTime;
        printBanner(startDuration, String(server.url));
      }
    })
    .onRequest(({ store }) => {
      store.requestStartTime = process.hrtime();
    })
    .onError({ as: "global" }, ({ request, error, store }) => {
      const url = new URL(request.url);
      const duration = store.requestStartTime;
      const status = "status" in error ? error.status : "-/-";

      const components: string[] = [
        pc.red("✗"),
        pc.bold(formatMethod(request.method)),
        url.pathname,
        formatStatus(status) ?? "",
        pc.dim(`[${formatDuration(duration)}]`),
      ];

      if (options?.includeTimestamp) {
        components.unshift(pc.dim(formatTimestamp(new Date())));
      }

      if (shouldLog("error", options?.logLevel)) {
        logToConsole(components.filter(Boolean));
      }
    })
    .onAfterResponse(
      { as: "global" },
      ({ request, body, set, store, response, headers, cookie }) => {
        const responseDuration = store.requestStartTime;
        const url = new URL(request.url);

        // File logging
        const logEntry = {
          timestamp: new Date(),
          duration: responseDuration,
          request: {
            method: request.method,
            url: url.href,
            headers: request.headers,
            body: body,
          },
          response: {
            status: set.status,
            headers: headers,
            cookie: cookie,
            body: response,
          },
        };

        if (options?.logToFile) {
          logToFile(options.logToFile, logEntry);
        }

        // Console logging
        const consoleComponents: string[] = [
          pc.green("✓"),
          pc.bold(formatMethod(request.method)),
          url.pathname,
          formatStatus(set.status) ?? "",
          pc.dim(`[${formatDuration(responseDuration)}]`),
        ];

        if (options?.includeTimestamp) {
          consoleComponents.unshift(pc.dim(formatTimestamp(new Date())));
        }

        // Add detailed request and response info if detailLevel is "full"
        if (options?.detailLevel === "full") {
          consoleComponents.push(
            pc.magenta(
              `\nRequest Headers:\n${JSON.stringify(logEntry.request.headers, null, 2)}`,
            ),
          );
          consoleComponents.push(
            pc.magenta(
              `\nRequest Body:\n${JSON.stringify(logEntry.request.body, null, 2)}`,
            ),
          );
          consoleComponents.push(
            pc.cyan(
              `\nResponse Headers:\n${JSON.stringify(logEntry.response.headers, null, 2)}`,
            ),
          );
          consoleComponents.push(
            pc.cyan(
              `\nResponse Body:\n${JSON.stringify(logEntry.response.body, null, 2)}`,
            ),
          );
        }

        if (shouldLog("info", options?.logLevel)) {
          logToConsole(consoleComponents);
        }
      },
    );
};
