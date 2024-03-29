import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NotFountComponent } from './components/not-fount/not-fount.component';

const routes: Routes = [
  {path: "", component: HomePageComponent },
  {path: "home", component: HomePageComponent },
  {path: "user/:id", component: UserDetailsComponent },
  {path: "**", component: NotFountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
