import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestsComponent } from './client-suggests.component';

describe('ClientSuggestsComponent', () => {
  let component: ClientSuggestsComponent;
  let fixture: ComponentFixture<ClientSuggestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSuggestsComponent]
    });
    fixture = TestBed.createComponent(ClientSuggestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
