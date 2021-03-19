import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-chat',
  templateUrl: './your-chat.component.html',
  styleUrls: ['./your-chat.component.css']
})
export class YourChatComponent implements OnInit {

  @Input() chat: any

  constructor() { }

  ngOnInit(): void {
  }

}
