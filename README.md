# BoFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project instruction 

Use angular 12 、 akita、 and ng-zorro-antd 。 

* src/app/shared/components are some common components . When use them in a page , just import SharedComponentModule into page own module.

* src/app/shared/layout are some common layout. Include header、 footer 、 and sidebar. When use them in a page , need declarations them in app module. The page need into routes.

* src/app/service are global service. Need in app module provide them. IF the services don't need speclal definition provide. The service can definition provide in itself. Like @Injectable`({providedIn: 'root',})`. 
* Error-handler handle global errors. 
* Http-interceptor intercept the request, you can re-encapsulate the request parameters. also can handle errors.
* When in a page use [formGroup]. need import reactiveFormsModule in page's module.
* `ng g m session` generates a module. `ng g c session` generates a component. `ng g af session/session --plain` generates a basic store.


