

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpClientJsonpModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

export interface FlickrPhoto {
  title: string;
  media: { m: string };
  date_taken: string;
  description: string;
  published: string;
  author: string;
  author_id: string;
  tags: string;
  author_name:string;
  id: number;
}

export interface FlickrOutput {
  items: FlickrPhoto[];
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
 
  private prevKeyword: string;
  private currPage = 1;
  snapshot: any;

  constructor(private http: HttpClient ,private route: ActivatedRoute, private router: Router) { }

  search_keyword(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;

    const url = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK&tags=${keyword}&page=${this.currPage}`;

    return this.http.jsonp(url, 'JSONP_CALLBACK').pipe(map((res: any) => {
      return res.items.map((item: FlickrPhoto) => {
        return {
          title: item.title,
          url: item.media.m,
          ownername: item.author,
          tags:item.tags,
          id:item.id,
        };
      });
    }));
  }
}



