import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log("✅MongoDB Connected SuccessFully!");
            
        })
        connection.on('error',(err)=>{
            console.log('❌ MongoDB connection Error . Please check sure that MongoDB is running!' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something Went wrong!')
        console.log(error);
        
    }
}