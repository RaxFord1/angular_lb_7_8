import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  template: `
    <div>
      <h1>List</h1>
      <div id="asd">
      <div *ngFor="let post of posts">
        <h2>{{ post.id }} {{ post.title }}</h2>
        <p>{{ post.text }}</p>
        <a routerLink="/delete/{{ post.id }}">Delete</a>
        <button (click)="onDelete(post.id)">Delete</button>
      </div>
      </div>
    </div>
  `,
})
export class HomeViewComponent implements OnInit {
  posts: any[] = [{ title: 'asd', text: 'qwe' }];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get<any[]>('http://localhost:8000/api/posts')
      .subscribe((data) => {
        this.posts = data;
      });
  }

  onDelete(id) {
    this.router.navigate(['/delete/'], { queryParams: { postId: id } });
  }
}
