import {Document, Model, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

interface IAuthorDocument extends Document {
  firstName: string;
  lastName: string;
  namePrefix: string;
  email: string;
  password: string;
  isPasswordMatch(password: string): Promise<boolean>;
}

interface IAuthorModel extends Model<IAuthorDocument> {
  isEmailTaken(email: string, excludeAuthorId?: string): Promise<Boolean>;
}

const authorSchema = new Schema<IAuthorDocument, IAuthorModel>(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    namePrefix: {type: String, enum: ['Mr', 'Mrs', 'Miss'], required: true},
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      private: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  },
);

authorSchema.statics.isEmailTaken = async function (
  email: string,
  excludeAuthorId?: string,
): Promise<boolean> {
  const author = await this.findOne({email, _id: {$ne: excludeAuthorId}});
  return !!author;
};

authorSchema.methods.isPasswordMatch = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

authorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const Author = model<IAuthorDocument, IAuthorModel>('Author', authorSchema);