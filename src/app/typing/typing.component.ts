import { Component, Input, ViewChild } from '@angular/core';
import { TextService } from '../services/text.service';
import { RouteDataService } from '../route-data.service';
import { WordsPipe } from '../pipes/words.pipe';

import { Observable, BehaviorSubject } from 'rxjs';

import { TypingTextComponent } from './typing-text/typing-text.component';
import { Router } from '@angular/router';

import { Animations } from '../app.animations';

@Component({
    selector: 'typing',
    styleUrls: ['./typing.component.css'],
    templateUrl: './typing.component.html',
    host: { '[@routeAnimation]': 'true' },
  animations: Animations.routeAnimation
})
export class TypingComponent {
    // text: BehaviorSubject<string> = new BehaviorSubject<string>('');
    text: string;
    typedText: string;
    words: string[] = [];
    totalMinutes: number;
    totalSeconds: number;
    currentWordIndex: Number = 0;

    @ViewChild(TypingTextComponent) typingTextComponent: TypingTextComponent;

    constructor(private textService: TextService, private wordsPipe: WordsPipe,
                 private router: Router,
                 private rdService: RouteDataService
                 ) {
        this.textService.text.subscribe((res) => {
            if(this.words.length == 0) 
                this.words = wordsPipe.transform(res);
            else {
                let tempWords = wordsPipe.transform(res);
                this.words.concat(tempWords);
            }
            this.text = this.text + res;
        }, err => console.log(err));
        this.totalMinutes = rdService.getItem('totalMinutes');
        this.totalSeconds = rdService.getItem('totalSeconds');
    }

    onTypedTextChanged(e: any) {
        console.log(e);
        this.typedText = e; 
    }

    handleNextWord(wordIndex: number) {
        this.currentWordIndex = wordIndex;
        this.typingTextComponent.onWordIndexChanged(wordIndex);
    }

    onTimeUp() {
        this.router.navigate(['/results']);
    }
}