import { Component, OnInit } from '@angular/core';
import roomService from '../service/roomService'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  yourRoomList : any

  constructor() { 
    this.fetchData()
  }

  fetchData(){
    roomService.list().then((roomList)=>{

      const {data} = roomList;
      console.log(data.data)
      this.yourRoomList = data.data;
      
    })
  }

  ngOnInit(): void {
  }

}
