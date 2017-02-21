/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TypingTextComponent } from './typing-text.component';

describe('TypingTextComponent', () => {
  let component: TypingTextComponent;
  let fixture: ComponentFixture<TypingTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypingTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
