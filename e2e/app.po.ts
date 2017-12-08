/* tslint:disable */
import { browser, element, by } from 'protractor';

export class VotingWebPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
