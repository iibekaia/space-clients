import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountsFormComponent } from './client-accounts-form.component';

describe('ClientAccountsFormComponent', () => {
  let component: ClientAccountsFormComponent;
  let fixture: ComponentFixture<ClientAccountsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAccountsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAccountsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
