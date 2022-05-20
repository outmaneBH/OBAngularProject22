import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { User } from 'src/app/service/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  /**
   * declarar los datos del usuario que vamos a trabajar sobre el 
   * en un variable que se llama currentUser y el constructor
   */
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


  /**
   * llamar a la funcion getuser y pasarla nuestro dni 
   * y devolver sus datos 
   */
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }
  /**
   * La funcion devuelve los datos de el usario dado como parametro
   * y usamos estos datos para para mostrarlos en nuestra paginaweb
   * @param dni string para buscar usuario 
   */
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
  /**
   *definir una funcion   que recibe el dni de usuario para
    modificar sus datos despues de una confirmacion de update
   */
  updateUser(): void {
    this.message = '';
    if (confirm("This User will be updated , do you accept that ?? ")) {
      this.userService.updateUser(this.currentUser.dni, this.currentUser)
        .subscribe({
          next: (res) => {
            this.message = res.message ? res.message : 'This User was updated successfully!'
              + this.currentUser.dni;
          },
          error: (e) => console.error(e)
        });
    }
  }

  /**
   * definir una funcion   que recibe el dni de usuario para borrarlo
   * con una confirmacion de borrar
  */
  // deleteUser(): void {
  //   if (confirm("Are you sure that you want to delete this user !!")) {
  //     this.userService.deleteUser(this.currentUser.dni)
  //       .subscribe(
  //         response => {
  //           this.router.navigate(['/users-list']);
  //         },
  //         error => {
  //           console.log(error);
  //         });
  //   }
  // }

}
