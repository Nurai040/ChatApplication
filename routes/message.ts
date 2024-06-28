import { Router } from "express";
import { Messages } from "../service/messageService";

const route = Router();
const mesService = new Messages();

export const messRouter = ()=>{

route.get('/', async(req,res)=>{
    try {
        const messages = await mesService.getMessage();
        return res.status(200).json({messages});
    } catch (error) {
        console.error('Error with fetching messages', error);
        return res.status(505).json({message: 'Something went wrong on the server'});
    }
});

route.post('/', async(req,res)=>{
    try {
        const newMessage = await mesService.addMessage(req.body);
        req.app.get('io').emit('message', newMessage);
        return res.status(200).json(newMessage);
    } catch (error) {
        console.error('Error with adding messages', error);
        return res.status(505).json({message: 'Something went wrong on the server'}); 
    }
})

return route;
}
