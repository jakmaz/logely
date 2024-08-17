# 📝 LogEly 🦊

A **simple**, **clean**, and **sleek** logging middleware for the [Elysia](https://elysiajs.com) web framework. Developed with [Bun](https://bun.sh), Logely is designed to be **minimalistic** yet powerful, giving you the essential tools to keep track of your application's requests and responses effortlessly.

## 📸 Screenshot Preview

Here's a glimpse of what your logs will look like with Logely:

<div align="center">
  <img width="466" alt="image" src="https://github.com/user-attachments/assets/c8617d33-6b5a-4137-be30-1f17ce510afc">
</div>


With Logely, your logs are clear, concise, and easy to understand, ensuring that you can quickly grasp what's happening in your application.

## 📦 Installation

Getting started with Logely is a breeze. Install it via Bun with a single command:

```sh
bun add logely
```

## 🚀 Usage

Integrating Logely into your Elysia application is straightforward:

```typescript
import { logger } from "@logely";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(logger()) // Add this line
  .get("/", () => "Get method!")
  .post("/", () => "Post method!")
  .listen(3000);
```

## ⚙️ Configuration

Logely comes with a variety of options that allow you to customize the logging behavior to fit your application's needs:

|        Option        | Description                                                                                       | Default Value             |
|:--------------------:|:--------------------------------------------------------------------------------------------------|:--------------------------|
|    **`showBanner`**  | Displays a startup banner when the server starts. Set to `false` to disable.                       | `true`                    |
|    **`logLevel`**    | Sets the logging level. Options are `"info"`, `"warn"`, `"error"`. Controls what gets logged.      | `"info"`                  |
|    **`logRequest`**  | Logs the incoming request details. Great for debugging incoming data.                              | `false`                   |
|   **`logResponse`**  | Logs the outgoing response details. Perfect for ensuring your responses are as expected.           | `false`                   |
| **`includeTimestamp`** | Adds a timestamp to each log entry, helping you track when each request was handled.             | `false`                   |
|   **`logToFile`**    | Outputs logs to a specified file instead of the console. Provide the file path as a string.        | `undefined`               |

### 🛠 Example Configuration

Here's an example of how you can customize Logely to log requests, include timestamps, and change the log level:

```typescript
import { logger } from "@jakmaz/logely";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(logger({
    logLevel: "info",
    logRequest: true,
    includeTimestamp: true,
    logToFile: "./logs/app.log"
  }))
  .get("/", () => "Get method!")
  .post("/", () => "Post method!")
  .listen(3000);
```

## 💡 Acknowledgements

This library was inspired by code from the following projects:

- [tanishqmanuja/todos-react-elysia](https://github.com/tanishqmanuja/todos-react-elysia): Provided foundational concepts for request logging.
- [tristanisham/logysia](https://github.com/tristanisham/logysia): Influenced the design of the package.

A huge thanks to the authors and contributors of these projects for their invaluable work.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
