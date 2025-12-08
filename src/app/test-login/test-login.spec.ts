import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLogin } from './test-login';

describe('TestLogin', () => {
  let component: TestLogin;
  let fixture: ComponentFixture<TestLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
