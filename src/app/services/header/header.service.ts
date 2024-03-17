import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  defaultHeaderDetails: headerDetails = new headerDetails(
    "",
    "",
    false,
    "",
    new Function()
  );
  private headerDetailSource = new BehaviorSubject<headerDetails>(this.defaultHeaderDetails);

  constructor() {}

  /**
   * @param data<headerDetails> - header detail class which contains header title,
   * subtitle, back button availability, back button display text and back button action
   */
  setHeaderDetails(data: headerDetails) {
    this.headerDetailSource.next(data);
  }

  /**
   * return header details
   * @returns header details as BehaviorSubject<headerDetails>
   */
  getHeaderDetails() {
    return this.headerDetailSource.asObservable();
  }

}

export class headerDetails {
  title : string
  subTitle : string;
  backButtonEnabled : boolean;
  backButtonDisplayText : string;
  action : Function | null;
  constructor(title : string,
              subTitle : string,
              backButtonEnabled : boolean,
              backButtonDisplayText : string,
              action : Function | null) {
    this.title = title;
    this.subTitle = subTitle;
    this.backButtonEnabled = backButtonEnabled;
    this.backButtonDisplayText = backButtonDisplayText;
    this.action = action;
  }

}
