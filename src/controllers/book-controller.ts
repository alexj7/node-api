import { Request, Response } from "express";
import Book, { IBook } from "../models/book-model";
import BaseController from "./base-controller";

/**
 * Extends Express Request to type the request body.
 */
interface CreateBookRequest extends Request {
  body: IBook;
}

/**
 * Class to handle actions related to books.
 */
class BookController extends BaseController {
  /**
   * Create a new book.
   * @param {CreateBookRequest} req - The Express request.
   * @param {Response} res - The response from Express.
   */
  async createBook(req: CreateBookRequest, res: Response) {
    try {
      const { title, chapters, pages, authors } = req.body;
      const book = await Book.create({ title, chapters, pages, authors });

      this.sendSuccess({ res, data: book, statusCode: 201 });
    } catch (error: unknown) {
      this.handleError({
        res,
        error,
        message: "Error creating book",
      });
    }
  }

  /**
   * Gets all books.
   * @param {Request} _req - The Express request.
   * @param {Response} res - The response from Express.
   */
  async getAllBooks(_req: Request, res: Response) {
    try {
      const books = await Book.find().populate("authors", "name");
      this.sendSuccess({ res, data: books });
    } catch (error: unknown) {
      this.handleError({
        res,
        error,
        message: "Error getting books",
      });
    }
  }

  /**
   * Calculates the average pages per chapter for a book.
   * @param {Request} req - The Express request.
   * @param {Response} res - The response from Express.
   */
  async getAveragePagesPerChapter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);

      if (!book) {
        throw {
          message: "Book not found",
          statusCode: 404,
        };
      }

      const average = book.pages / book.chapters;

      this.sendSuccess({ res, data: { average } });
    } catch (error: any) {
      const {
        message = "Error calculating average pages per chapter",
        statusCode,
      } = error;

      this.handleError({
        res,
        error,
        message,
        statusCode,
      });
    }
  }
}

export default new BookController();
