import app from "./app.js";
import pool from "./config/db.js";
import "./config/env.js";
//hi

function validatePort(portVal) {
  const port = Number(portVal);
  if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(
      `Invalid PORT configuration: "${portVal}". Must be between 1 and 65535.`,
    );
  }
  return port;
}

async function startServer() {
  try {
    const PORT = validatePort(process.env.PORT || 3000);

    await pool.query("SELECT 1");
    console.log("Database connected successfully.");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const shutdown = async () => {
      console.log("Shutting down server");
      server.close(async () => {
        await pool.end();
        console.log("Pool closed Exiting process");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
