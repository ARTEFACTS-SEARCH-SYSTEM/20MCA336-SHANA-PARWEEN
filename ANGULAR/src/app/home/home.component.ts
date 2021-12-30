import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <nav class="hero is-bold is-fullheight is-warning">
  <div class="hero-body">
  <div class="container has text-centered">
  <style>
  {
    background: <img src="assets/img/pexels.jpg">
    background-size: 100px 80px;
    background-repeat: no-repeat;
  }
  </style>
    <h1 class="title">
   !!!THANK YOU FOR YOUR TIME!!!
   </h1>
  </div>
  </div>
</nav>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
