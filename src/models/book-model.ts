import { Schema, model, Document, ObjectId } from "mongoose";

export interface IBook extends Document {
  title: string;
  chapters: number;
  pages: number;
  authors: ObjectId[];
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  chapters: { type: Number, required: true },
  pages: { type: Number, required: true },
  authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
});

const Book = model<IBook>("Book", BookSchema);

export default Book;
