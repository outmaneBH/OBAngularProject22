import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  Users:any = [];
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users =res;
    }); 
  }

}
