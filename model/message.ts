import {Schema, model} from 'mongoose';

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export const Message = model('Message', messageSchema);