import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  title = "Post List";
  postForm!: FormGroup;
  error!: string
  datasaved = false;
  showGrid = false;
  message!: string;
  posts!: Observable<Post[]>;
  regForm!: FormGroup;
  fileToUpload!: File;
  postImage: string = "/assets/images/noimage.jpg";
  @ViewChild("imageUrl") myInputVariable!: ElementRef;
  postIdToUpdate!: number;

  constructor(private postService: PostService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.regFormState();
    this.posts = this.getPosts();
    this.showGrid = true;
  }

  regFormState() {
    this.regForm = this.formBuilder.group({
      courseId: [''],
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      imageUrl: [''],
      author: ['', Validators.required]
    });
  }

  getPosts(): Observable<Post[]> {
    return this.postService.getPosts();
  }

  onDelete(courseId: number) {
    this.postService.deletePostById(courseId).subscribe(response => {
      this.showGrid = true;
      console.log("Course deleted with courseId " + courseId);
      this.posts = this.getPosts();
    });
  }

  onSubmit() {
    this.regForm.patchValue({
      imageUrl: this.fileToUpload == null ? null : this.fileToUpload.name,
    });

    let postForm = this.regForm.value;
    if (this.postIdToUpdate == 0) {
      this.postService.createPost(postForm).subscribe(response => {
        if (response) {
          console.log("Post saved successfully!!");
          this.datasaved = true;
          this.showGrid = true;
          this.regForm.reset();
          this.error = null as any;
          this.message = "Post saved successfully!!";
          this.postIdToUpdate = 0;
        } else {
          this.datasaved = false;
          this.showGrid = false;
          this.error = response;
          this.postIdToUpdate = 0;
        }
      });
    } else {
      this.postService.updatePost(postForm, this.postIdToUpdate).subscribe(response => {
        if (response) {
          console.log("Post updated successfully!!");
          this.datasaved = true;
          this.showGrid = true;
          this.regForm.reset();
          this.error = null as any;
          this.message = "Post updated successfully!!";
          this.postIdToUpdate = 0;
        } else {
          this.datasaved = false;
          this.showGrid = false;
          this.error = response;
          this.postIdToUpdate = 0;
        }
      });
    }

  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList)[0];

    //Show Image Preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.postImage = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  cancel() {
    this.showGrid = true;
  }

  addPost() {
    this.showGrid = false;
    this.datasaved = false;
    this.message = "";
    this.postIdToUpdate = 0;
    this.postImage = "/assets/images/noimage.jpg";
  }

  editPost(courseId: number) {
    this.showGrid = false;
    this.error = null as any;
    this.datasaved = false;
    this.message = "";
    this.postService.getPostById(courseId).subscribe(response => {
      if (response) {
        this.regForm.patchValue({
          courseId: response.courseId,
          title: response.title,
          shortDescription: response.shortDescription,
          fullDescription: response.fullDescription,
          imageUrl: response.imageUrl,
          author: response.author
        });
        this.postImage = 'http://localhost:4200/assets/images/' + response.imageUrl as any;
        this.postIdToUpdate = response.courseId as any;
      } else {
        alert('Post with ' + courseId + ' not found');
      }
    });

  }
}
