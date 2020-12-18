import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../login';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message!: string;
  error: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('user');
    this.setFormState();
  }

  setFormState(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let login = this.loginForm.value;
    this.login(login);
    this.loginForm.reset();
  }

  login(login:Login){
    debugger;
   this.userService.loginUser(login).subscribe(response=>{
        debugger;
        var success = response;
        if(success){
          this.loginForm.reset();
          localStorage.setItem('user', JSON.stringify(success));
          this.router.navigate(['dashboard']);
        }else{
          this.error = true;
          this.message ='Username or Password is wrong!';
        }
   });
  }

  


}
