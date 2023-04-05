import express, { json } from "express";
import cors from "cors";
import figurinhaRouter from "./src/routes/figurinha.router";


const app = express();
app.use(json())
app.use(cors())
app.use(figurinhaRouter)

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server running in port: ${port}`))