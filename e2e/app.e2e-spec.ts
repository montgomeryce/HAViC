import { HAViCPage } from './app.po';

describe('havi-c App', () => {
  let page: HAViCPage;

  beforeEach(() => {
    page = new HAViCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
