import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
// import { UserListModule } from './modules/user-list.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from './components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// HTTP Obsrvsable
import { HttpClientModule } from '@angular/common/http';
import { NotFountComponent } from './components/not-fount/not-fount.component';
import { LoadingComponent } from './components/loading/loading.component';
// Spinner loading component
import { AsyncPipe, NgIf, NgTemplateOutlet, } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserDetailsComponent,
    UserListComponent,
    HeaderComponent,
    NotFountComponent,
    LoadingComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // UserListModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    AsyncPipe, NgIf, NgTemplateOutlet,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
