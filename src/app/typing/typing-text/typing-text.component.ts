import { Component, OnInit, Input, AfterContentInit, ViewChild,  } from '@angular/core';
import { WordStatus } from '../word-status';
import { Status }  from '../status.enum';
import { TextService } from '../../services/text.service';
import {trigger, state, animate, style, transition} from '@angular/core';
import { WordsPipe } from '../../pipes/words.pipe';
import { RouteDataService } from '../../route-data.service';
import { WindowRefService } from '../../services/window-ref.service';

// import { correcter, wronger } from '../../app.animations';

@Component({
  selector: 'app-typing-text',
  templateUrl: './typing-text.component.html',
  styleUrls: ['./typing-text.component.css'],
  animations: [
    
  ],
  outputs: ['remainingSeconds']
})
export class TypingTextComponent implements OnInit {
  @ViewChild('typingComponent') 
  @Input('type-text') typeText: string; //whole text tot write
  @Input('typed-text') typedText: string; //text Input value
  @Input('current-word-index') currentWordIndex: number;

  words: string[] = [];
  wordStatus: Object[] = [];
  constructor(private wordsPipe: WordsPipe, private rdService: RouteDataService, private windowRefService: WindowRefService, private textService: TextService) { 
    this.textService.text.subscribe((res) => {
        let tempWords = this.wordsPipe.transform(res);

        // let titleCounter = 0;
        let descriptionCounter = 0;
        for(var i = 0; i < tempWords.length; i++) {
            if(tempWords[i].includes('%title%')) {
                tempWords[i] = tempWords[i].replace('%title%', '');
                while(!tempWords[i].includes('$title$')) {
                    this.wordStatus.push({ title: true });
                    i++;
                }
                tempWords[i] = tempWords[i].replace('$title$', '');
                this.wordStatus.push({ titleEnd: true, title: true });
                console.log(tempWords[i]);
            }

            else if(tempWords[i].includes('%description%')) {
                tempWords[i] = tempWords[i].replace('%description%', '');
                while(!tempWords[i].includes('$description$')) {
                    this.wordStatus.push({description: true});
                    i++;
                }
                tempWords[i] = tempWords[i].replace('$description$','');
                this.wordStatus.push({ descriptionEnd: true, description: true });
                console.log(tempWords);
            }

            else {
                this.wordStatus.push({});
            }
        }

        this.words = this.words.concat(tempWords);
    });
  }

  checkIfNeedToScroll(): any {
    let padding = 40;

    let typingText = document.getElementById('typing-text');
    let typingTextClientRect = typingText.getBoundingClientRect();
    let currentWord = document.getElementsByClassName('currentWord')[0];
    let currentWordClientRect = currentWord.getBoundingClientRect();

    console.log(currentWordClientRect.bottom, typingTextClientRect.bottom);

    if((typingTextClientRect.bottom - currentWordClientRect.bottom) < padding) {
      this.smooth_scroll_to(typingText, typingText.scrollTop + 100, 600);
      return true;
    }
    return false;
  }

  onWordIndexChanged(index) {
    let validText = this.words[index - 1]; 
    
    let ws = new WordStatus(Status.incorrect, validText, this.typedText);
    Object.assign(this.wordStatus[index -1], ws); //Append wordsstatus not replace the enitre Object 

    if(validText.trim() === this.typedText.trim())
    {
        let iws =  new WordStatus(Status.correct, validText);
        Object.assign(this.wordStatus[index - 1], iws);
    }

    this.checkIfNeedToScroll();
  }



  ngOnDestroy() {
    this.rdService.setItem('wordStatus', this.wordStatus);
  }

  ngOnInit() {
      console.log(this.typeText);
    // this.words = this.wordsPipe.transform(this.typeText); 
    // this.wordStatus =   Array.apply(null, Array(this.words.length)).map(Object.prototype.valueOf,{});
  }

  smooth_scroll_to (element, target, duration) {
      target = Math.round(target);
      duration = Math.round(duration);
      if (duration < 0) {
          return Promise.reject("bad duration");
      }
      if (duration === 0) {
          element.scrollTop = target;
          return Promise.resolve();
      }

      var start_time = Date.now();
      var end_time = start_time + duration;

      var start_top = element.scrollTop;
      var distance = target - start_top;

      // based on http://en.wikipedia.org/wiki/Smoothstep
      var smooth_step = function(start, end, point) {
          if(point <= start) { return 0; }
          if(point >= end) { return 1; }
          var x = (point - start) / (end - start); // interpolation
          return x*x*(3 - 2*x);
      }

      return new Promise(function(resolve, reject) {
          // This is to keep track of where the element's scrollTop is
          // supposed to be, based on what we're doing
          var previous_top = element.scrollTop;

          // This is like a think function from a game loop
          var scroll_frame = function() {
              if(element.scrollTop != previous_top) {
                  reject("interrupted");
                  return;
              }

              // set the scrollTop for this frame
              var now = Date.now();
              var point = smooth_step(start_time, end_time, now);
              var frameTop = Math.round(start_top + (distance * point));
              element.scrollTop = frameTop;

              // check if we're done!
              if(now >= end_time) {
                  resolve();
                  return;
              }

              // If we were supposed to scroll but didn't, then we
              // probably hit the limit, so consider it done; not
              // interrupted.
              if(element.scrollTop === previous_top
                  && element.scrollTop !== frameTop) {
                  resolve();
                  return;
              }
              previous_top = element.scrollTop;

              // schedule next frame for execution
              setTimeout(scroll_frame, 0);
          }

          // boostrap the animation process
          setTimeout(scroll_frame, 0);
      });
  }
}
