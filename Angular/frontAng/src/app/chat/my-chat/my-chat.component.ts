import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css']
})
export class MyChatComponent implements OnInit {

  @Input() chat: any;  
  
  constructor() { }

  ngOnInit(): void {
  }

}
