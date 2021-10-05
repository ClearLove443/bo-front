import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformCoreService } from 'src/app/business/services/platform-core.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  public username = 'admin';
  public password = 'password';
  /**
   * submitForm
   *
   * @memberof LoginComponent
   */
  // public submitForm(): void {
  //   const { router } = this;
  //   this.platformCoreService
  //     .login(this.username, this.password, null)
  //     .subscribe(() => {
  //       router.navigateByUrl('/system/home');
  //     });
  // }
  submitForm(params: { username: string; password: string }): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    // alert(JSON.stringify(params));
    const { router } = this;
    this.platformCoreService
      .login(params.username, params.password, '')
      // .pipe(untilDestroyed(this))
      .subscribe(() => {
        router.navigateByUrl('/system/home');
      });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private platformCoreService: PlatformCoreService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
