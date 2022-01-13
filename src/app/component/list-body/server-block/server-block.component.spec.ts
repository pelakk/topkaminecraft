import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerBlockComponent } from './server-block.component';

describe('ServerBlockComponent', () => {
  let component: ServerBlockComponent;
  let fixture: ComponentFixture<ServerBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
