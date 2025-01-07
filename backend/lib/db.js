import mongoose from "mongoose";

const connectDb=async()=>{
try {
    const connection=await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected successful'+' '+ connection.connection.host)
} catch (error) {
    console.log(error);
    resizeBy.status(500).json({message:error})
}
}

export default connectDb;