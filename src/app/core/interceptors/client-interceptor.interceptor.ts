import {HttpInterceptorFn} from '@angular/common/http';

const generateGuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export const clientInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const headers: any = {'x-request-id': generateGuid()};
  const request = req.clone({
    withCredentials: true,
    setHeaders: headers,
  });
  return next(request);
};
