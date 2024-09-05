import { Schema, Document } from 'mongoose';

export type UserDocument = User & Document;

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarPath: string;
}

export const UserSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  avatarPath: { type: String, required: true }, // This will store the base64 string
});
