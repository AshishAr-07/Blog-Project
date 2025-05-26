import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
        type: String,
      },
      slug: {
        type: String,
        lowercase: true,
      },
})

export default mongoose.model("category", CategorySchema);