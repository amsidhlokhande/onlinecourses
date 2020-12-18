import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm!: FormGroup;
  isUserSaved: boolean = false;
  message!: string;
  error: boolean = false;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  setFormState(): void {
    this.regForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setFormState();
  }


  onSubmit() {
    let user: User = this.regForm.value;
    this.saveUser(user);
    this.regForm.reset();
  }

  saveUser(user: User) {
    this.userService.createUser(user).subscribe(() => {
      this.isUserSaved = true;
      this.message = 'User saved successfully!';
      this.regForm.reset();
    });
  }
}
