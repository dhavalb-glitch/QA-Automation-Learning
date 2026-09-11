import { BrowseTheWeb } from '../abilities/BrowseTheWeb.js';
import { Click } from '../interactions/Click.js';

export class SubmitForm {
  async performAs(ability: BrowseTheWeb): Promise<void> {
    await Click.on('#submit').performAs(ability);
  }

  static now(): SubmitForm {
    return new SubmitForm();
  }
}
