import { VotingWebPage } from './app.po';

describe('voting-web App', () => {
  let page: VotingWebPage;

  beforeEach(() => {
    page = new VotingWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
