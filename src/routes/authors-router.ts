import { Router } from "express";
import AuthorController from "../controllers/author-controller";

import { ROUTE_PATHS } from "../constants/routesPaths";

const authorRouter = Router();

authorRouter.post(ROUTE_PATHS.AUTHOR.CREATE, AuthorController.createAuthor);
authorRouter.get(ROUTE_PATHS.AUTHOR.GET_ALL, AuthorController.getAllAuthors);

export default authorRouter;
