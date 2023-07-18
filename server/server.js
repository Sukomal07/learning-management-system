import app from "./app.js";
import {connectDb} from './database/db.js'


app.listen(process.env.PORT, ()=>{
    connectDb()
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})