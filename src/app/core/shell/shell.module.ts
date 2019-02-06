import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreeLayoutComponent } from './layout/free-layout/free-layout.component';
import { ProtectedLayoutComponent } from './layout/protected-layout/protected-layout.component';

@NgModule({
  declarations: [FreeLayoutComponent, ProtectedLayoutComponent],
  imports: [
    CommonModule
  ],
  exports: [FreeLayoutComponent, ProtectedLayoutComponent]
})
export class ShellModule { }
