import axios from 'axios';
import { readSkill } from '../utils/readSkill';

export async function generateTestCasesOllama(requirement: string, model: string) {
  const skillContent = readSkill('qa-test-design-skill.md');

  const response = await axios.post('http://localhost:11434/api/generate', {
    model,
    prompt: `
${skillContent}

Requirement:
${requirement}
      `,
    stream: false,
  });

  return response.data.response;
}
