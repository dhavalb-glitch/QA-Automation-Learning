import axios from 'axios';
import dotenv from 'dotenv';
import { readSkill } from '../utils/readSkill';

dotenv.config();

const playwrightSkill = readSkill('playwright-generation-skill.md');

export async function generatePlaywrightScript(requirement: string, testCases: any[]) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat-v3-0324',
        max_tokens: 2000,

        messages: [
          {
            role: 'user',
            content: `
${playwrightSkill}

Requirement:
${requirement}

Generate Playwright automation only for the following test cases.

${JSON.stringify(testCases, null, 2)}
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedCode = response.data.choices[0].message.content
      .replace(/```typescript/g, '')
      .replace(/```ts/g, '')
      .replace(/```/g, '')
      .trim();

    return generatedCode;
  } catch (error: unknown) {
    console.error('OPENROUTER ERROR:');

    if (axios.isAxiosError(error)) {
      console.error(JSON.stringify(error.response?.data, null, 2));
    } else {
      console.error(String(error));
    }

    throw error;
  }
}
