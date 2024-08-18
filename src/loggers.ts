import { promises as fs } from "fs";

// Determine if the log level allows logging the current message
export function shouldLog(
  level: "info" | "error",
  logLevel: "info" | "error" = "info",
) {
  const levels = { info: 0, error: 1 };
  return levels[level] >= levels[logLevel];
}

// Function to log messages
export function logToConsole(components: string[]) {
  const message = components.join(" ");
  console.log(message);
}

// Function to log to a file, appending to a JSON log array
export async function logToFile(
  filePath: string,
  logEntry: Record<string, any>,
) {
  try {
    let fileContent: string;

    // Check if the file exists
    try {
      fileContent = await fs.readFile(filePath, "utf8");
    } catch (error) {
      if (error instanceof Error && (error as any).code === "ENOENT") {
        // If file does not exist, create it with the initial structure
        fileContent = JSON.stringify(
          {
            logelyVersion: "1.0",
            logs: [],
          },
          null,
          2,
        );
      } else {
        throw error;
      }
    }

    const logData = JSON.parse(fileContent);
    logData.logs.push(logEntry);
    const updatedLogString = JSON.stringify(logData, null, 2);

    // Write the updated log data back to the file
    await fs.writeFile(filePath, updatedLogString, "utf8");
  } catch (error) {
    console.error("Failed to write log to file:", error);
  }
}
