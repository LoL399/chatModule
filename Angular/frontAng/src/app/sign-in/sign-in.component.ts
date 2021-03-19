import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
 import { Router } from '@angular/router';
import loginService from '../service/loginService';
import userService from '../service/userService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userList: any = 0;

  constructor(private router: Router) {
    localStorage.removeItem('info');
    this.fetchData();
   }

  signIn(userLogin){
    loginService.token({id: userLogin.Id}).then((token)=>{
      const { data } = token;
      if(data.err == 0)
      {

        localStorage.setItem('info', token.data.data);
        if(userLogin.Role == "user")
        {
          this.router.navigate(['/dummy'])

        }
        this.router.navigate(['/admin/user'])

      }
      // console.log(token)
    })
  }

  async fetchData(){
    
    userService.list().then((users)=>{
      const { data } = users;
      console.log(users)
      this.userList = data.data

    })

  }



  ngOnInit(): void {
  }

}
