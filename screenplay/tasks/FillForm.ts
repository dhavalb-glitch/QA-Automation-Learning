import { BrowseTheWeb } from '../abilities/BrowseTheWeb.js';
import { Fill } from '../interactions/Fill.js';

export class FillForm {
  constructor(
    private readonly username: string,
    private readonly password: string
  ) {}

  static withCredentials(username: string, password: string): FillForm {
    return new FillForm(username, password);
  }

  async performAs(ability: BrowseTheWeb): Promise<void> {
    await Fill.field('input[name="username"]', this.username).performAs(ability);
    await Fill.field('input[name="password"]', this.password).performAs(ability);
  }
}
