import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[]=[];
  private postSub :Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postSub = this.postsService.getUpdatedPostListener().subscribe((res: Post[])=>{
      this.posts = res;
    });

    
  }

  onDelete(PostId: string){
    this.postsService.deletePost(PostId);
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }


  // posts=[
  //   {title:"First", content:"This is post1 title"},
  //   {title:"Second", content:"This is post2 title"},
  //   {title:"Third", content:"This is post3 title"}
  // ]
  

}
