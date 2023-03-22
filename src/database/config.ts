import mongoose from 'mongoose';

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('DB online');
  } catch (e) {
    console.log(e);
    throw new Error(`Failed to start DB`);
  }
};
