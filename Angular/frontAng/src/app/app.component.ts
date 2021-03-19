import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from './service/connectionService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontAng';

  constructor(public SignalRService: SignalRService, private http: HttpClient){}

  ngOnInit(){
    // this.SignalRService.startConnection();
    // this.startHttpRequest();


  }

  private startHttpRequest = () =>{

    this.http.get('https://localhost:5001/chat/get').subscribe(res=>{console.log(res)})

  }

}
