import { Status } from './status.enum';

export class WordStatus {
    public status : Status;
    public correctWord;
    public incorrectWord;
    public title;
    public description;

    public constructor(status, correctWord, incorrectWord = "") {
        this.status = status;
        this.correctWord = correctWord;
        this.incorrectWord = incorrectWord;
    }
}