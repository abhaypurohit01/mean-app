import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  constructor(private http:HttpClient) { }
  getPosts(){
    this.http.get<{message:string, posts: any}>("http://localhost:3000/api/posts")
    .pipe(map((postData)=>{
      return postData.posts.map(post=>{
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts; 
      this.postUpdated.next([...this.posts]);
    })
  }
  getUpdatedPostListener(){
    return this.postUpdated.asObservable();
  }
  addPost(title:string, content:string){
    const post: Post ={id: null,title: title, content: content} ;
    
    this.http.post("http://localhost:3000/api/posts",post).subscribe((responseData)=>{
      console.log(responseData);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    })
  }
  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/"+postId).subscribe(()=>{
    const updatePosts = this.posts.filter(post=>post.id != postId);
    this.posts = updatePosts;
    this.postUpdated.next([...this.posts]);
    });
  }
  
}
