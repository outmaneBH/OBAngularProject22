import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService) {
    this.userForm = this.formBuilder.group({
      dni: [''],
      full_name: [''],
      age: [''],
      phone: [''],
    })
  }
  message = '';
  ngOnInit(): void {
  }
  onSubmit(): any {
    if (this.userForm.value.dni == '' ||
      this.userForm.value.full_name == '' ||
      this.userForm.value.age == '' ||
      this.userForm.value.phone == ''
    ) {
      this.message = 'Error en inputs ! All are requireds';
    }
    else {
      this.crudService.AddUser(this.userForm.value)
        .subscribe(() => {
          console.log('Data added successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
        }, (err) => {
          console.log(err);
        });
    }


  }

}
