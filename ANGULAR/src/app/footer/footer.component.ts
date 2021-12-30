import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <footer class="footer">
  <div class="container">
  <div class="content has-text-centered">
  <style>
  p {
    color:blue;
   }
   </style> 
    <p>
      Made by SHANA and RESHMA
    </p>
  </div>
  </div>
  </footer>
  `,
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
