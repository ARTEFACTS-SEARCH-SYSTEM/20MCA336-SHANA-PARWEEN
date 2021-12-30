import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
  <section class="hero is-primary is-bold">
  <div class="hero-body">
  <div class="container">

  <!-- form goes here -->
<form (ngSubmit)="submitForm()">
<h1 class="title">CONTACT US!!!</h1>
  <!-- name -->
  <div class="field">
    <input type="text" name="name" class="input" placeholder="Your Name">
  </div>

  <!-- email -->
  <div class="field">
    <input type="email" name="email" class="input" placeholder="Your Email">
  </div>

  <!-- message -->
  <div class="field">
    <textarea class="textarea" name="message" placeholder="What's on your mind?"></textarea>
  </div>

  <button type="submit" class="button is-danger is-large">Submit</button>

</form>

  </div>
  </div>
  </section>
  `,
  styles: [
  ]
})
export class ContactComponent implements OnInit {
  constructor() { }

  ngOnInit() {}
  submitForm(){
  }

}
