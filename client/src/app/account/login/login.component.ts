import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  showError = false;

  constructor(private accountService: AccountService
    ,         private toaster: ToastrService , private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute. snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }

  // tslint:disable-next-line:typedef
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required),

    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.showError = false;
    this.accountService.login(this.loginForm.value).subscribe(() => {
      console.log('User logged in');
      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      this.showError = true;
      console.log(error);
    });
  }

}
