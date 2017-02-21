import { ServerSidePage } from './app.po';

describe('server-side App', function() {
  let page: ServerSidePage;

  beforeEach(() => {
    page = new ServerSidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
