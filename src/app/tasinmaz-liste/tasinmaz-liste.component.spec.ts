import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasinmazListeComponent } from './tasinmaz-liste.component';

describe('TasinmazListeComponent', () => {
  let component: TasinmazListeComponent;
  let fixture: ComponentFixture<TasinmazListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasinmazListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasinmazListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
