import express from 'express'; 
const app = express();
import env from 'dotenv';
import mongoose from 'mongoose';
import { userRouter } from './routes/index';
import ejs from 'ejs';
env.config();
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ytq6kou.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`).then(()=>{
        console.log("mongodb connected successfully");
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', userRouter);
app.use(express.static("public"));


app.set('view engine', 'ejs');

app.listen(process.env.PORT, function () { 

    console.log(`listening on port ${process.env.PORT}`);

 });