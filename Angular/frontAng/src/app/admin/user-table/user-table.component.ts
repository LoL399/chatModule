import { Component, OnInit } from '@angular/core';
import "../service/userService"
import userService from '../service/userService';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  userData : any ;

  constructor() {
    this.fetchData()
   }

  async fetchData(){
    userService.list().then((users)=> 
    {
      let {data} = users
      this.userData = data.data
      this.createDataTable()
    })

  }

  createDataTable(){
    // $('table.display').DataTable(
    //   {
    //     destroy: true,
    //     autoWidth: true,
    //     "lengthMenu": [
    //       [16, 32, 64, -1],
    //       [16, 32, 64, "All"]
    //     ]
    //   });

  }

  ngOnInit(): void {
  }

}
