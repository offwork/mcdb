import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from './http.service';
import { HttpResponseHandlerService } from './http-response-handler.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class HttpModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpModule,
      providers: [HttpService, HttpResponseHandlerService],
    };
  }
}
