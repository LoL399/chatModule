import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import chatService from '../../service/chatService'

import * as signalR from '@aspnet/signalr';
import getInfo from '../../common/getInfo'
import userService from 'src/app/service/userService';
import { SignalRService } from './../../service/connectionService';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {
  private hubConnection: signalR.HubConnection;
  @Input() chatContent: string
  chatList : any
  info :any


  constructor(private route: ActivatedRoute, public SignalRService: SignalRService) { }


  changeContent(e){
    this.chatContent = e.target.value
  }

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
            console.log(data.data.Result)
            this.chatList.push(data.data.Result)
            // this.chatData = data.data.Result
            // console.log(this.chatData)
        })
    })
}


  sendChat(){
    if(this.chatContent)
    {
          const data = {
      Room : this.route.snapshot.paramMap.get('id'),
      Content: this.chatContent
    }

    chatService.add(data).then(()=>{})

    }


  }



  fetchData(){
    const data ={
      room: this.route.snapshot.paramMap.get('id'),
      skip: 0,
      limit: 4
    }

    chatService.getRoom(data).then((chatlog)=>{
      const {data} = chatlog;
      console.log(data.data)
      this.chatList= data.data
    })
  }

  getInfo() {
    
    userService.info().then((info)=>{
      const{data} = info
      // console.log(data.data)
      this.info = data.data[0]
  })

  }


  ngOnInit(): void {
    this.route.params.subscribe(paramsId => {
      this.startConnection()
      this.roomSocket(this.route.snapshot.paramMap.get('id'))
      this.fetchData()
      this.getInfo()

    });
  }

}
