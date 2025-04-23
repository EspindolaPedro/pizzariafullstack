import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './router';
import fileUpload from 'express-fileupload'

dotenv.config();

const server = express();

server.use(
    '/files',
    express.static(path.resolve(__dirname,'../tmp'))
)
server.use(express.json());
server.use(cors());
server.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))


server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado!' });
});

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if ( err instanceof Error) {
        return res.status(400).json({error: err.message})
    } 
    return res.status(500).json({status: 'error', message: 'Interna Server Error'})
})

server.listen(3333,'0.0.0.0', () => {
    console.log("Server running on http://localhost:3333");
});
