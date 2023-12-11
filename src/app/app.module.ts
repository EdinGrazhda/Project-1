import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchImagesComponent } from './search-images/search-images.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ZoomComponent } from './zoom/zoom.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
 
  { path: '', component: SearchImagesComponent },
  { path: 'zoom/:id', component: ZoomComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchImagesComponent,
    ZoomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(routes),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
  
})
export class AppModule { }