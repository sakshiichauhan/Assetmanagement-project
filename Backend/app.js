import express from 'express'; 
import cors from 'cors'; 
import cookieParser from 'cookie-parser';  // Import cookie-parser
import router from './routes/index.js'; 
import { connectDB } from './config/db.js'; 
import dotenv from 'dotenv'; 

dotenv.config();  
const PORT = process.env.PORT || 3000;
const app = express();  
connectDB();  
app.use(cookieParser());  
const origins = [ 'http://localhost:5173','http://localhost:5174'];
const corsOptions = {
    origin: origins, 
    credentials: true,
    methods: ['*'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions)); 

app.use(express.json());  

app.use('/api/', router);  
app.get("/",(req,res) => {
  res.send("Server running")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
