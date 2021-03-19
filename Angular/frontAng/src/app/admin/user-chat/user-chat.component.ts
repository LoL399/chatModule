import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import roomService from 'src/app/service/roomService';
@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  id : string

  info: any

  roomInfo: any
  constructor(private route: ActivatedRoute) { 

  }
  fetchData(){
    // const data ={
    //   room: this.route.snapshot.paramMap.get('id'),
    //   skip: 0,
    //   limit: 4
    // }

    // chatService.getRoom(data).then((chatlog)=>{
    //   const {data} = chatlog;
    //   // console.log(data.data)
    //   this.chatList= data.data
    // })

    roomService.roomInfo(this.route.snapshot.paramMap.get('id')).then((room)=>{
        const {data} = room;
        this.roomInfo = data.data
    })

  }

  ngOnInit(): void {

    this.route.params.subscribe(paramsId => {
      this.fetchData()

    });

  }

}
