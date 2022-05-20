import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { User } from 'src/app/service/user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentUser: User = {
    _id: '',
    dni: '',
    full_name: '',
    age: 0,
    phone: 0
  };
  message = '';
  constructor(
    private userService: CrudService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }
  getUser(dni: string): void {
    this.userService.GetUser(dni)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  deleteUser(): void {
    if (confirm("Are you sure that you want to delete this user !!")) {
      this.userService.deleteUser(this.currentUser.dni)
        .subscribe(
          response => {
            this.router.navigate(['/users-list']);
          },
          error => {
            console.log(error);
          });
    }
  }

}
