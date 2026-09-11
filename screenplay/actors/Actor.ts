import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Actor {
  private constructor(
    public readonly name: string,
    private readonly ability: BrowseTheWeb
  ) {}

  static named(name: string): Actor {
    return new Actor(name, null as unknown as BrowseTheWeb);
  }

  whoCan(ability: BrowseTheWeb): Actor {
    return new Actor(this.name, ability);
  }

  abilityToBrowseTheWeb(): BrowseTheWeb {
    if (!this.ability) {
      throw new Error(`${this.name} does not have the BrowseTheWeb ability.`);
    }

    return this.ability;
  }
}
