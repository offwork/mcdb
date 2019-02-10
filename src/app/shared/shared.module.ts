import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModule } from './design/design.module';
import { HttpModule } from './async-services/http/http.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DesignModule, HttpModule],
})
export class SharedModule {}
