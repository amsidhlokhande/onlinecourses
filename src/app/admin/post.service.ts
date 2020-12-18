import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  POST_BASE_URL = 'http://localhost:8181/courses';
  constructor(private httpClient: HttpClient) { }

  createPost(post: Post): Observable<Post> {
    debugger;
    return this.httpClient.post<Post>(this.POST_BASE_URL, post);
  }

  updatePost(post: Post, courseId: number): Observable<Post> {
    return this.httpClient.put<Post>(this.POST_BASE_URL, post);
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.POST_BASE_URL);
  }

  getPostById(courseId: number): Observable<Post> {
    return this.httpClient.get<Post>(this.POST_BASE_URL + "/" + courseId);
  }

  deletePostById(courseId: number): Observable<void> {
    return this.httpClient.delete<void>(this.POST_BASE_URL + "/" + courseId);
  }


}
