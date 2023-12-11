import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';



@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css']
})
export class SearchImagesComponent implements OnInit {
  images = [];
  keyword: string;
  loading = false; // Flag to track whether a request is in progress
  router: any;
image: any;

  constructor(private flickrService: FlickrService) { }

  ngOnInit() {
  }

  search(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 2) {
      this.flickrService.search_keyword(this.keyword)
        .toPromise()
        .then(res => {
          this.images = res;
        });
    } else {
      // Clear the images if the keyword length is less than or equal to 3
      this.images = [];
    }
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0 && !this.loading) {
      this.loading = true; // Set the loading flag to true

      this.flickrService.search_keyword(this.keyword)
        .toPromise()
        .then(res => {
          this.images = this.images.concat(res);
          this.loading = false; // Reset the loading flag after the request is complete
        })
        .catch(error => {
          console.error('Error loading images:', error);
          this.loading = false; // Reset the loading flag in case of an error
        });
    }
  }

  sanitizeAuthorName(authorName: string): string {
    return this.removeQuotes(authorName);
  }

  private removeQuotes(input: string): string {
    return input.replace(/["']/g, ''); // This will remove both single and double quotes
  }

}
