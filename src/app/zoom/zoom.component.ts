import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  image: any;

  constructor(private route: ActivatedRoute, private flickrService: FlickrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.flickrService.getImageById(id).subscribe(data => {
        this.image = data;
      });
    });
  }
}