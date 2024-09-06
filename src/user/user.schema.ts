import { Schema, Document } from 'mongoose';
export type UserDocument = User & Document;

// Define the User class. 
// This serves as a TypeScript class that outlines the properties of a User.
export class User {
  // _id: Schema.Types.ObjectId;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarPath: string;
}

// Define the Mongoose schema for the User model.
// The schema maps the User class properties to the MongoDB document fields.
export const UserSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  avatarPath: { type: String, required: true },
});
