import { keyframes } from "@angular/animations";
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
        map((response: IDatabaseResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }))
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get(`${environment.database}/posts.json`)
      .pipe(map((res: {[key: string]: any}) => {
        return Object.keys(res).map(key=> ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))
      }))
  }

  removePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.database}/posts/${id}.json`)
  }

  getOistById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.database}/posts/${id}.json`)
      .pipe(
        map((post: IPost) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }))
  }

}
