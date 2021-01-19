import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IDatabaseResponse, IPost } from "../interfaces";

@Injectable()

export class PostService {
  constructor(private http: HttpClient) {}

  create(post: IPost): Observable<IPost> {
    return this.http.post(`${environment.database}/posts.json`, post)
      .pipe(
        tap((res: any)=> {
          console.log(res)
        }),
        map((response: IDatabaseResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }))
  }

}