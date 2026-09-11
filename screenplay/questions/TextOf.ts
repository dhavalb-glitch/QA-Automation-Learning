import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class TextOf {
  constructor(private readonly selector: string) {}

  static element(selector: string): TextOf {
    return new TextOf(selector);
  }

  async answeredBy(ability: BrowseTheWeb): Promise<string | null> {
    return await ability.page.locator(this.selector).textContent();
  }
}
