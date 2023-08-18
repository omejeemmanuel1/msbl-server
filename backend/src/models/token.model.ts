import mongoose, { Document, ObjectId } from 'mongoose';

interface Token extends Document {
  userId: ObjectId;
  token: string;
  createdAt: Date;
}

const TokenSchema = new mongoose.Schema<Token>({
  userId: { type: mongoose.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }, // Set token to expire after 1 hour
});

const TokenModel = mongoose.model<Token>('Token', TokenSchema);

export default TokenModel;
