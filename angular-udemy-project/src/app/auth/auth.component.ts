import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  isLoginMode = true;
  isLoading = true;
  error: string=null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password =form.value.Password;

    let authObs: Observable<AuthResponseData>
     
    this.isLoading = false;
    if(this.isLoginMode){
      authObs=this.authService.login(email, password);
    }else{
      authObs=this.authService.signUp(email, password);
    }
    authObs.subscribe(
      resData =>{
        console.log(resData);
        this.isLoading= true;
      },
      errorMessage =>{
        
         this.error=errorMessage
        
        this.isLoading=true;
      }
    );
   
    form.reset();
  }


}
