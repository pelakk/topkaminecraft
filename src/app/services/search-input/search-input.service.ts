import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class SearchInputService {

  phrase: string = '';
  phraseChanged = new Subject<string>();

  constructor() {}

  setPhrase(input: string) {
    this.phraseChanged.next(input);
    this.phrase = input;
  }
}
