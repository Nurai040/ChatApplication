"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("./config/dbconnection"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const message_1 = require("./routes/message");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
io.on('connection', (socket) => {
    console.log("User is connected");
    socket.on('disconnect', () => {
        console.log("User is disconneted");
    });
});
app.set("io", io);
app.use('/api/messages', (0, message_1.messRouter)());
httpServer.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbconnection_1.default;
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
    console.log(`Server is running on the port 3000`);
}));
