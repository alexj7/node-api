import { Schema, model, Document, ObjectId } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  books: ObjectId[];
}

const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const Author = model<IAuthor>("Author", AuthorSchema);

export default Author;
