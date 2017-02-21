/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TypedTextComponent } from './typed-text.component';

describe('TypedTextComponent', () => {
  let component: TypedTextComponent;
  let fixture: ComponentFixture<TypedTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypedTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
