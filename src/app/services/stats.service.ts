import { Injectable } from '@angular/core';
import { TimeService } from '../services/time.service';
import { RouteDataService } from '../route-data.service';
import { WordStatus } from '../typing/word-status';

@Injectable()
export class StatsService {

  private stats;
  

  constructor(private rdService: RouteDataService, private timeService: TimeService) {
    this.stats = {};
    this.updateTypingStats();
   }

   getPreviousStats(){
    return {
      accuracy: 0,
      netSpeed: 0,
      grossSpeed: 0
    };
   }

  updateTypingStats() {
    let wordStatus: Array<any> = this.rdService.getItem('wordStatus') || [];

    if(wordStatus.length > 0) {
      let timeRemaning = this.rdService.getItem('remainingSeconds'); //remainingTime is in seconds
      let totalMinutes = this.rdService.getItem('totalMinutes');
      let totalSeconds = this.rdService.getItem('totalSeconds');
      let endless = this.rdService.getItem('endless');

      this.stats.totalTime = this.timeService.getTotalSeconds(totalMinutes, totalSeconds);
      this.stats.timeTaken = endless ? this.timeService.convertSecondsToMinutes(timeRemaning) :this.getTimeTakenInMinutes(timeRemaning, this.stats.totalTime); ///time taken to type in seconds
      this.stats.formattedTimeTaken = this.timeService.formatMinutes(this.stats.timeTaken);


      let typedWordsArray = wordStatus.filter((word) => { return word.status !== undefined });

      let typedWords = this.reduceTypedWords(typedWordsArray);
      let incorrectWords = this.reduceIncorrectWords(typedWordsArray);
      let correctWords = this.reduceCorrectWords(typedWordsArray);

      let grossSpeed = this.calculateGrossSpeed(typedWords, this.stats.timeTaken);
      let netSpeed = this.calculateNetSpeed(incorrectWords, grossSpeed, this.stats.timeTaken);
      let accuracy = this.calculateAccuracy(correctWords, typedWords);

      this.stats.grossSpeed = grossSpeed;
      this.stats.netSpeed = netSpeed;
      this.stats.accuracy = accuracy;
    }
  }

  private getTimeTakenInMinutes(timeRemaning: number, totalTime : number) {
      return this.timeService.convertSecondsToMinutes(totalTime - timeRemaning);
  }

  private reduceTypedWords(typedWordsArray: Array<any>): string {
    return  typedWordsArray.length === 0 ? "" : typedWordsArray.reduce((prev: WordStatus, current: WordStatus, index, ar) => {
        if(index == 0) {
          if(prev.status == 0 && current.status == 0)  return prev.correctWord + current.correctWord;
          else if(prev.status == 0 && current.status == 1) return prev.correctWord + current.incorrectWord;
          else if(prev.status == 1 && current.status == 0) return prev.incorrectWord + current.correctWord;
          else return prev.incorrectWord + current.incorrectWord;
        } else {
          if(current.status == 0) {
            return " " + prev + current.correctWord;
          } else {
            return " " +  prev + current.incorrectWord;
          }
        }
      });
  }

  private reduceCorrectWords(typedWordsArray: Array<any>): string {
    let intermediateCorrectWordsArray = typedWordsArray
      .filter((wordStatus: WordStatus) => { return wordStatus.status === 0 });

      return  intermediateCorrectWordsArray.length === 0 ? "" :  intermediateCorrectWordsArray
      .reduce((prev: WordStatus, current: WordStatus, index) => {
      return index === 0 ? prev.correctWord + current.correctWord : " " + prev.correctWord + current.correctWord;
    });
  }

  private reduceIncorrectWords(typedWordsArray: Array<any>): string {
    console.log(typedWordsArray);
    let intermediateIncorrectWordsArray = typedWordsArray
      .filter((wordStatus: WordStatus) => { return wordStatus.status === 1 });

      return intermediateIncorrectWordsArray.length == 0 ? "" : intermediateIncorrectWordsArray
      .reduce((prev: WordStatus, current: WordStatus, index) =>  {
      return index === 0 ? prev.incorrectWord + current.incorrectWord : " " + prev.incorrectWord + current.incorrectWord;
    });
  }

  private calculateAccuracy(correctWords: string, typedWords: string) {
    return Math.round(((correctWords.length / typedWords.length) * 100) * 100) / 100; //calculateAccuracy upto two decimal places
  }

  private calculateGrossSpeed(typedWords: string, timeTaken: number) : number {
    return Math.floor((typedWords.length / 5) / timeTaken);
  }

  private calculateNetSpeed(incorrectWords: string, grossSpeed:number, timeTaken: number) {

    let mistakeRate = Math.floor((incorrectWords.length / 5) - timeTaken);

    let netSpeed = grossSpeed - mistakeRate;

    return netSpeed;
  }

  getTypingStats() {
    this.updateTypingStats();

    return this.stats;
  }

}
