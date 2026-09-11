import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Fill {
  constructor(
    private readonly selector: string,
    private readonly value: string
  ) {}

  static field(selector: string, value: string): Fill {
    return new Fill(selector, value);
  }

  async performAs(ability: BrowseTheWeb): Promise<void> {
    await ability.page.locator(this.selector).fill(this.value);
  }
}
