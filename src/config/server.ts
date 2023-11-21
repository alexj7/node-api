import express, { Express } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

// Config
import { dbConnection } from "./db";

// Routers
import bookRouter from "../routes/books-router";
import authorRouter from "../routes/authors-router";
import { API_V1, ROUTE_PATHS } from "../constants/routesPaths";

/**
 * Server configuration and initialization class.
 */
export class Server {
  app: Express;
  port: string | number;
  paths: { [key: string]: string };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    /**
     * Register all paths for the server.
     */
    this.paths = {
      books: `${API_V1}${ROUTE_PATHS.BOOK.BASE}`,
      authors: `${API_V1}${ROUTE_PATHS.AUTHOR.BASE}`,
    };

    // Initialize config of server.
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  /**
   * Connects to the database.
   */
  async connectDB(): Promise<void> {
    await dbConnection();
  }

  /**
   * Configures middlewares for the server.
   */
  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  /**
   * Configures the routes for the server.
   */
  routes(): void {
    console.log("available routes: ", this.paths);

    this.app.use(this.paths.books, bookRouter);
    this.app.use(this.paths.authors, authorRouter);
  }

  /**
   * Starts the server and listens on a specified port.
   */
  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
