import { Message } from "../model/message";

export class Messages{
    async getMessage(){
        const messages = await Message.find({});
        return messages;
    }

    async addMessage(body:any){
        const newMessage = new Message(body);
        await newMessage.save();
        return newMessage;
    }
}