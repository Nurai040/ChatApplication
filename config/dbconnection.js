"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbURL = 'mongodb+srv://nuraynurzhaskyzy:Letitsnowbro_99@messages.iddxebn.mongodb.net/?retryWrites=true&w=majority&appName=Messages';
exports.default = mongoose_1.default.connect(dbURL).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Failed to connect to MongoDB', error);
});
;
