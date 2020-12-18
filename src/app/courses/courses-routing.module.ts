import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseCategoriesComponent } from './course-categories/course-categories.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseRecentComponent } from './course-recent/course-recent.component';

const routes: Routes = [
  {
    path: 'course',
    component: CourseListComponent
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent
  }/* ,
  {
    path: 'course-categories',
    component: CourseCategoriesComponent
  },
  {
    path: 'course-recent',
    component: CourseRecentComponent
  } */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
