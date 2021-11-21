import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlatformCoreService } from 'src/app/business/services/platform-core.service';
import { BasePage } from 'src/app/core/abstract/base.page';
import { AuthQuery } from 'src/app/core/auth/auth.query';
import { AuthService } from 'src/app/core/auth/auth.service';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate(
    '1s ease-in',
    style({
      opacity: 1,
    })
  ),
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate(
    '1s ease-out',
    style({
      opacity: 0,
    })
  ),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);

const fadeOut = trigger('fadeOut', [leaveTrans]);

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class Login2Component extends BasePage implements OnInit, AfterViewInit {
  public username!: string;
  public password!: string;

  // @ViewChild('tref', { read: ElementRef })
  // tref!: ElementRef;

  public loginshow: boolean = true;
  public addtest: boolean = false;
  public addtesttwo: boolean = false;
  // @ViewChild('loginel', { read: ElementRef })
  // loginel!: ElementRef;

  public authentshow: boolean = false;
  // @ViewChild('authentel', { read: ElementRef })
  // authentel!: ElementRef;

  public successshow: boolean = false;
  // @ViewChild('successel', { read: ElementRef })
  // succesel!: ElementRef;

  public failshow: boolean = false;

  constructor(
    private router: Router,
    injector: Injector,
    private platformCoreService: PlatformCoreService,
    private authService: AuthService,
    private authQuery: AuthQuery // private render: Renderer2
  ) {
    super(injector);
    this.authQuery.isLoggedIn$.pipe(untilDestroyed(this)).subscribe((res) => {
      if (res) {
        this.successshow = true;
        setTimeout(() => {
          router.navigateByUrl('/system/home');
        }, 3200);
      }
    });
  }
  ngAfterViewInit(): void {
    // console.log(this.tref.nativeElement.textContent);
    // debugger;
    // this.render.addClass(this.tref.nativeElement, 'test');
  }

  public ngOnInit(): void {}

  public login(): void {
    // this.render.addClass(this.loginel.nativeElement, 'test');
    this.addtest = true;
    setTimeout(() => {
      // this.render.addClass(this.loginel.nativeElement, 'testtwo');
      this.addtesttwo = true;
    }, 300);
    setTimeout(() => {
      this.authentshow = true;
    }, 500);
    setTimeout(() => {
      this.authentshow = false;
      // this.render.removeClass(this.loginel.nativeElement, 'testtwo');
      this.addtesttwo = false;
    }, 2500);
    setTimeout(() => {
      // this.render.removeClass(this.loginel.nativeElement, 'test');
      this.addtest = false;
      this.loginshow = false;
    }, 2500);
    const { router } = this;
    this.authService.login({ userId: this.username, password: this.password });
    //   this.platformCoreService
    //     .login(this.username, this.password, '')
    //     .pipe(untilDestroyed(this))
    //     .subscribe((obs) => {
    //       if (obs) {
    //         this.successshow = true;
    //         setTimeout(() => {
    //           router.navigateByUrl('/system/home');
    //         }, 3200);
    //       } else {
    //         // this.failshow = true;
    //         setTimeout(() => {
    //           console.log('Adjustment errorDialog style');
    //         }, 2);
    //       }
    //     });
  }
}
