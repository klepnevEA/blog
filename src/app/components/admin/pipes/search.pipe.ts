import { Pipe, PipeTransform } from "@angular/core";
import { IPost } from "src/app/shared/interfaces";

@Pipe(  {
    name: 'searchPost'
  })
export class SearchPipe implements PipeTransform{
  transform(posts: IPost[], search = ''): IPost[] {
    if(!search.trim()) {
      return posts
    }

    return posts.filter((post) => {
      if(post.title === undefined) return
      return post.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
