import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  template: `
    <h1>Add</h1>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div>
      <label for="name">name:</label>
      <input id="name" type="text" formControlName="name"/>
    </div>

    <div>
      <label for="cuisine">text:</label>
      <input id="cuisine" type="text" formControlName="text"/>
    </div>

    <button type="submit">add</button>
  </form>
  `,
})
export class CatalogViewComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = {
        name: this.form.get('name').value,
        text: this.form.get('text').value,
      };
      const formDataJson = JSON.stringify(formData);

      this.http
        .post<any[]>('http://localhost:8000/api/posts', formDataJson)
        .subscribe((data) => {
          console.log(data);
        });
      this.router.navigate(['/list']);
    } else {
      alert('Not valid');
    }
  }
}
