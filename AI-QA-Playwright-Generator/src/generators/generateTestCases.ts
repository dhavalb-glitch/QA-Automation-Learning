import axios from 'axios';
import dotenv from 'dotenv';
import { readSkill } from '../utils/readSkill';

dotenv.config();

export async function generateTestCases(requirement: string, model: string) {
  const skillContent = readSkill('qa-test-design-skill.md');

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model,
      messages: [
        {
          role: 'user',
          content: `${skillContent}

Requirement:
${requirement}`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 120000,o 
    }
  );

  return response.data.choices[0].message.content;
}
