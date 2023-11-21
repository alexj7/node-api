import { Router } from "express";
import BookController from "../controllers/book-controller";
import { ROUTE_PATHS } from "../constants/routesPaths";

const bookRouter = Router();

bookRouter.post(ROUTE_PATHS.BOOK.CREATE, BookController.createBook);
bookRouter.get(ROUTE_PATHS.BOOK.GET_ALL, BookController.getAllBooks);
bookRouter.get(
  ROUTE_PATHS.BOOK.GET_AVERAGE_PAGES,
  BookController.getAveragePagesPerChapter
);

export default bookRouter;
