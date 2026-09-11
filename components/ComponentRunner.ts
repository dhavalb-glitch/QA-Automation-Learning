import { Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class ComponentRunner {
  constructor(private readonly page: Page) {}

  async mount(html: string): Promise<void> {
    await this.page.setContent(html);
  }

  async mountFixture(fixtureName: string): Promise<void> {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(currentFilePath);

    const fixturePath = path.join(currentDirectory, 'fixtures', fixtureName);

    const html = await readFile(fixturePath, 'utf-8');

    await this.mount(html);
  }
}
