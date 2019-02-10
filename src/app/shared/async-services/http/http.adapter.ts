import { HttpResponse } from '@angular/common/http';

export class HttpAdapter {
  public static baseAdapter(res: HttpResponse<any>, adapterFn?: Function): any {
    if (res.status >= 200 && res.status <= 299) {
      try {
        return adapterFn ? adapterFn.call(undefined, res.body) : {};
      } catch (error) {
        console.log(
          `%cCaught an error in the HTTP Request\n ${error}`,
          'background: red; color: black; font-size: x-large'
        );
        return res;
      }
    }
  }
}
