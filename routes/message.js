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
Object.defineProperty(exports, "__esModule", { value: true });
exports.messRouter = void 0;
const express_1 = require("express");
const messageService_1 = require("../service/messageService");
const route = (0, express_1.Router)();
const mesService = new messageService_1.Messages();
const messRouter = () => {
    route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messages = yield mesService.getMessage();
            return res.status(200).json({ messages });
        }
        catch (error) {
            console.error('Error with fetching messages', error);
            return res.status(505).json({ message: 'Something went wrong on the server' });
        }
    }));
    route.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newMessage = yield mesService.addMessage(req.body);
            req.app.get('io').emit('message', newMessage);
            return res.status(200).json(newMessage);
        }
        catch (error) {
            console.error('Error with adding messages', error);
            return res.status(505).json({ message: 'Something went wrong on the server' });
        }
    }));
    return route;
};
exports.messRouter = messRouter;
