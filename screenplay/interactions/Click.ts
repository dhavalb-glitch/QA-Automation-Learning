import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Click {
  constructor(private readonly selector: string) {}

  static on(selector: string): Click {
    return new Click(selector);
  }

  async performAs(ability: BrowseTheWeb): Promise<void> {
    await ability.page.locator(this.selector).click();
  }
}
