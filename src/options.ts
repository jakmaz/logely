export interface Options {
  showBanner?: boolean;
  logLevel?: "info" | "warn" | "error";
  logRequest?: boolean;
  logResponse?: boolean;
  includeTimestamp?: boolean;
  logToFile?: string;
}
