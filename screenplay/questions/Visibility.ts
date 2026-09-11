import { BrowseTheWeb } from '../abilities/BrowseTheWeb.js';

export class Visibility {
  constructor(private readonly selector: string) {}

  static of(selector: string): Visibility {
    return new Visibility(selector);
  }

  async answeredBy(ability: BrowseTheWeb): Promise<boolean> {
    return await ability.page.locator(this.selector).isVisible();
  }
}
