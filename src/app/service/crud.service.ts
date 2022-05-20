import { Injectable } from '@angular/core';
import { User } from './user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:8082/api/users';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * @param data User pasar datos de usuario para insertarlos
   * en la base de datos
   * @returns 
   */
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  /**
   * llama al api de get usarios de la base de datos
   * 
   * @returns todos los datos de usuarios que estran en la bse de datos
   */
  GetUsers() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  /**
   * 
   * @param dni String para poder buscar el usuario con este Dni dado en 
   * la funcion 
   * @returns los datos encontrados y devueltos con api de users
   */
  GetUser(dni: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${dni}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  /**
   * Cambiamos los datos del usuario con el dni y sus datos que estan escritos
   * en el formulario para hacer el update 
   * 
   * @param dni String
   * @param data Object
   * @returns response with ok or Error
   */
  updateUser(dni: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${dni}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  /**
   * La funcion usa para borrar un userio usando el api de backend
   * 
   * @param dni String 
   * @returns si etsa borado bien o no esta borado
   */
  deleteUser(dni: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${dni}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }


  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}