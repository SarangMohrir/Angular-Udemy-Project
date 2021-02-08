import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { throwError } from "rxjs";

export interface AuthResponseData {
  kind: String;
  idToken: String;
  email: String;
  refreshToken: String;
  expiresIn: String;
  localId: String;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(email: String, password: String) {
    const S="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+ environment.firebaseAPIKey
    return this.http.post<AuthResponseData>(
      S,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    .pipe(catchError((this.HandleError)));
  }

  login(email: string, password: string){
    const login="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+ environment.firebaseAPIKey
     return  this.http.post<AuthResponseData>(login,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
      )
      .pipe(catchError(this.HandleError));
  }
  private HandleError(errorRes: HttpErrorResponse){
    let errorMessage="Email or PAssword is incorrect"
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
    } 
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = "This Email already exists"
    }
    return throwError(errorMessage)
  }
}
