import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // posts=[
  //   {title:"First", content:"This is post1 title"},
  //   {title:"Second", content:"This is post2 title"},
  //   {title:"Third", content:"This is post3 title"}
  // ]
  @Input() posts: Post[]=[]

}
