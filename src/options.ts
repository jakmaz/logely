export interface Options {
  showBanner?: boolean;
  logLevel?: "info" | "warn" | "error";
  detailLevel?: "minimal" | "full";
  includeTimestamp?: boolean;
  logToFile?: string;
}
