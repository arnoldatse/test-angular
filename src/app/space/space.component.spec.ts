import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SpaceComponent } from './space.component';

describe('SpaceComponent', () => {
  let component: SpaceComponent;
  let fixture: ComponentFixture<SpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
