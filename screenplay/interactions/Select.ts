import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Select {
  constructor(
    private readonly selector: string,
    private readonly value: string
  ) {}

  static option(selector: string, value: string): Select {
    return new Select(selector, value);
  }

  async performAs(ability: BrowseTheWeb): Promise<void> {
    await ability.page.locator(this.selector).selectOption(this.value);
  }
}
