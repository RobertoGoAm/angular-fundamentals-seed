import { Component } from '@angular/core';

@Component({
  selector: "app-root",
  styleUrls: ["app.component.scss"],
  template: `
    <div class="app">
      <a routerLink="/">
        Home
      </a>

      <a routerLink="/oops">
        404
      </a>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {

}
