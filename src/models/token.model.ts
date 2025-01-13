import mongoose, {Document, Model, Schema} from 'mongoose';
import TOKEN_TYPES from '../constants/tokenTypes';

interface ITokenDocument extends Document {
  token: string;
  user: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
type ITokenModel = Model<ITokenDocument>;
type IToken = ITokenDocument;

const TokenSchema = new Schema<ITokenDocument>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        TOKEN_TYPES.REFRESH,
        TOKEN_TYPES.RESET_PASSWORD,
        TOKEN_TYPES.VERIFY_EMAIL,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const Token = mongoose.model<ITokenDocument, ITokenModel>(
  'Token',
  TokenSchema,
);
