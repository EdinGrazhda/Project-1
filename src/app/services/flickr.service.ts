

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpClientJsonpModule } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

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
  getImageById(id: string) {
    // Update the URL to fetch a specific photo by ID
    const url = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK&id=${id}`;

    // Ensure the method returns an observable
    return this.http.jsonp(url, 'JSONP_CALLBACK').pipe(
      map((res: any) => {
        return {
          title: res.title,
          url: res.media.m,
          ownername: res.author,
          tags: res.tags,
        };
      })
    );
  }
}



