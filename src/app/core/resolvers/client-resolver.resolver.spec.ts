import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { clientResolverResolver } from './client-resolver.resolver';

describe('clientResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => clientResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
