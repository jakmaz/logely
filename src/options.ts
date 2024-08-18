export interface Options {
  showBanner?: boolean;
  logLevel?: "info" | "error";
  detailLevel?: "minimal" | "full";
  includeTimestamp?: boolean;
  logToFile?: string;
}
