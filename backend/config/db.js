import mongoose from "mongoose";
/*mongodb+srv://Sssunithaaa:Suni1806@cluster1.ts89lah.mongodb.net/?retryWrites=true&w=majority */
const db = async () => {
  try {
    await mongoose.connect(`mongodb://mongodb:27017/test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};
export default db;
