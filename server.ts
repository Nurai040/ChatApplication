import express from 'express';
import mongooseConnection from './config/dbconnection';
import {createServer} from 'http';
import {Server as SocketioServer} from 'socket.io';
import {messRouter} from './routes/message';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

const httpServer = createServer(app);
const io = new SocketioServer(httpServer);

io.on('connection', (socket)=>{
    console.log("User is connected");
    socket.on('disconnect', ()=>{
        console.log("User is disconneted");
    });
});

app.set("io", io);

app.use('/api/messages', messRouter());

httpServer.listen(3000, async()=>{
    try {
        await mongooseConnection;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
    console.log(`Server is running on the port 3000`);
});

