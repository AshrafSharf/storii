import {Component} from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {NgForm, FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from 'angular2/common';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import { RegisterService }    from './register.service';
import { AuthenticationService }    from '../login/authentication.service';
import {HttpClient}           from '../../headerfct';

@Component({
  selector: 'register',
  templateUrl: `app/html/register/register.html`,
  styles:['a {cursor: pointer}'],
  providers:[RegisterService,AuthenticationService,HttpClient]
})
export class RegisterComponent {
	title = 'Registration';
	userName = 'Username';
	eMail = 'E-mail';
	passWord = 'Password';
	confirmPassWord = 'Confirm Password';
	
	form: ControlGroup;
  	errorPW: boolean = false;
  	error: boolean = false;
  	
	constructor(private fb: FormBuilder, private _router: Router,private _authenticationService: AuthenticationService, private _registerService: RegisterService, private _routeParams: RouteParams) {
		this.form = fb.group({
	      username:  ['', Validators.required],
	      email:  ['', Validators.required],
	      password:  ['', Validators.required],
	      confirmPassword:  ['', Validators.required]
       });
    }
    
    register(username,email,pw,conPw){
    	if(pw != conPw){
    		this.errorPW = true; 
    	}else{
    		 this._registerService.register(username,email,pw)
		             		  .subscribe((result) => {
		             		  		console.log(result);
	      							if (result) {	
	      								this._authenticationService.login(username,pw)
					             		  .subscribe((result) => {
					             		  		console.log(result);
				      							if (result) {
				        							this._router.navigate(['Search']);
				      							}else{
				      							
				      								 this.error = true;
				      							}
			    							},
			        						() => {
			        					
			        						 this.error = true; });
	      							}else{
	      								 this.error = true;
	      							}
    							},
        						() => { this.error = true; });
    	}
    }
	
	
	
	goHome() {
    this._router.navigate(['Search']);
   }	
}
