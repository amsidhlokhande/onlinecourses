import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'post', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
