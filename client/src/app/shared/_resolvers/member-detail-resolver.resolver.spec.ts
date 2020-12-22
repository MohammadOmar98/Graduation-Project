import { TestBed } from '@angular/core/testing';

import { MemberDetailResolverResolver } from './member-detail-resolver.resolver';

describe('MemberDetailResolverResolver', () => {
  let resolver: MemberDetailResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MemberDetailResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
