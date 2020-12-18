import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: 'page/:slug',
    component: PageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticpagesRoutingModule { }
