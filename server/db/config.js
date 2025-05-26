import mongoose from 'mongoose';
var conn = mongoose.connect(
    `${process.env.MONGODB_URL}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(()=> console.log("connection successfull"))
.catch((err)=> console.log(err));

export default conn;