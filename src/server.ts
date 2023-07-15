import app from "./app";
import config from "./config";
import { Server } from "http";
import { connectDB } from "./helpers/db.helper";

process.on("uncaughtException", (error) => {
  console.log("UncaughtException", error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await connectDB();
    console.log(`🛢 Database is connected successfully!`);

    server = app.listen(config.port, () => {
      console.log(`⚡Application listening on port - ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }

  process.on("unhandledRejection", () => {
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
