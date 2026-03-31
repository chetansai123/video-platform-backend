import mongoose,{Schema} from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['viewer', 'editor', 'admin'],
      default: 'viewer'
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization'
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);