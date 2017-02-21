import { Component, OnInit,EventEmitter, ViewRef, ElementRef, ViewChild, Renderer  } from '@angular/core';

@Component({
  selector: 'app-typed-text',
  templateUrl: './typed-text.component.html',
  styleUrls: ['./typed-text.component.css'],
  outputs: ['onTextChanged', 'onNextWord']
})
 export class TypedTextComponent implements OnInit {
  @ViewChild('typeInput') typeInput: ElementRef;
  onTextChanged: EventEmitter<any> = new EventEmitter<any>();
  onNextWord: EventEmitter<number> = new EventEmitter<number>();
  currentWordIndex: number = 0;
  currentWord: string = "";
  typedText: string = ""; //words typed

  onChange(e: KeyboardEvent, value:string) {
    if(e.keyCode === 32 || e.keyCode === 13) //Key pressed is space or enter
    {
      this.typedText = this.typedText + ' ' + this.currentWord;
      this.onNextWord.emit(++this.currentWordIndex);
      this.typeInput.nativeElement.value = "";
      this.currentWord = "";
    } else { 
      console.log(value);
      this.currentWord = value;
      this.onTextChanged.emit(value);
    }
  }

  constructor(private renderer: Renderer) { }

  ngOnInit() {
   this.focusOnInput();
  }

  focusOnInput() {
     this.typeInput.nativeElement.focus();
  }

}
