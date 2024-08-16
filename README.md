# Logely

A logging middleware for the [Elysia](https://elysiajs.com) web framework. Developed with [Bun](https://bun.sh).

## Installation

```sh
bun add @jakmaz/logely
```

## Usage/Examples

```typescript
import { logger } from "@jakmaz/logely";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(logger())
  .get("/", () => "Get method!")
  .post("/", () => "Post method!")
  .listen(3000);
```

## Configuration

|  Option  | Description                                                    |
| :------: | :------------------------------------------------------------- |
| `logIP`  | Displays the incoming IP Address based on the XFF Header       |
| `writer` | Uses `write` function to send the log. Defaults to the console |

## Result

![Alt text](https://i.ibb.co/5YknHt6/image.png)

Logely also supports printing when there are errors in your application.

## Acknowledgements

This library is based on code from the following libraries:

- [Library One](https://github.com/user/library-one): Description of what you used or were inspired by.
- [Library Two](https://github.com/user/library-two): Description of what you used or were inspired by.

A special thanks to the authors and contributors of these projects for their work.
