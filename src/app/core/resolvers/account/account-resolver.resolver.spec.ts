import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { accountResolverResolver } from './account-resolver.resolver';

describe('accountResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => accountResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
