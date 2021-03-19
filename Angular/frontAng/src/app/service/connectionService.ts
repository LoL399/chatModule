import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import chatService from './chatService';

@Injectable({
    providedIn: 'root'
})

export class SignalRService {

    private hubConnection: signalR.HubConnection;

    chatData: any
    
    
    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/testing').build();
        this.hubConnection.start().then(()=> console.log('Connection Started')).catch((err)=> console.log('error connection' + err));
    }


    public helloSocket=()=>{
        this.hubConnection.on('Test' ,data =>{
            console.log(data)
        })
    }

    public roomSocket(room){

        console.log({room})

        this.hubConnection.on(room ,data =>{
            chatService.getById({id: data}).then((res)=>{
                const {data} = res
                return data.data.Result
                // this.chatData = data.data.Result
                // console.log(this.chatData)
            })
        })
    }



    constructor(){}
}