import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Navigate {
  constructor(private readonly url: string) {}

  static to(url: string): Navigate {
    return new Navigate(url);
  }

  async performAs(ability: BrowseTheWeb): Promise<void> {
    await ability.page.goto(this.url);
  }
}
