import { Request, Response } from "express";
import Author, { IAuthor } from "../models/author-model";
import BaseController from "./base-controller";

/**
 * Extends Express Request to type the request body.
 */
interface CreateAuthorRequest extends Request {
  body: IAuthor;
}

/**
 * Class to handle actions related to authors.
 */
class AuthorController extends BaseController {
  /**
   * Create a new author.
   * @param {CreateAuthorRequest} req -The Express request.
   * @param {Response} res -The response from Express.
   */
  async createAuthor(req: CreateAuthorRequest, res: Response) {
    try {
      const { name } = req.body;
      const author = await Author.create({ name });

      this.sendSuccess({ res, data: author, statusCode: 201 });
    } catch (error: unknown) {
      this.handleError({ res, error, message: "Error creating author" });
    }
  }

  /**
   * Gets all authors.
   * @param {Request} _req -The Express request.
   * @param {Response} res -The response from Express.
   */
  async getAllAuthors(_req: Request, res: Response) {
    try {
      const authors = await Author.find().populate("books", "title");
      this.sendSuccess({ res, data: authors, statusCode: 200 });
    } catch (error: unknown) {
      this.handleError({ res, error, message: "Error getting authors" });
    }
  }
}

export default new AuthorController();
