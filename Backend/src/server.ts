import { appConfig } from "./Config/appConfig";
import { setupApp } from "./app";
export const startServer = async () => {
  try {
    const app = await setupApp(); // Setup services, routes, middleware
    app.listen(appConfig.Port, () => {
      console.log(`Server running on port ${appConfig.Port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

// Start server
startServer();
