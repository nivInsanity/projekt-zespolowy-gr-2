import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinPage } from './bin.page';

const routes: Routes = [
  {
    path: '',
    component: BinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BinPageRoutingModule {}
