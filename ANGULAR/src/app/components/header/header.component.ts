import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar is-bold is-dark">
  <!-- logo -->
  <div class="hero-head"> 
    <div class="navbar-brand">
      <a class="navbar-item">
    <p>
    <style>
 p {
 color:red;
}
</style>
    <img src="assets/img/book-logo.jpg">
    BOOK INVENTORY SYSTEM
    </p> 
      </a>
      </div>
    </div>
    </nav>
    `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
