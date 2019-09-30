import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
    console.log('hit');
  }
  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
  	var username = e.target.elements[0].value;
  	var password = e.target.elements[1].value;
  	
  	if(username == 'admin' && password == 'AdM!n@123') {
      this.user.setUserLoggedIn();
  		this.router.navigate(['dashboard']);
  	}else{
      alert('Username or password is incorrect')
    }
  }

}
