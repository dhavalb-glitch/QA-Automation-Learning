import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

console.log('OPENROUTER =', !!process.env.OPENROUTER_API_KEY);
console.log('JIRA_EMAIL =', !!process.env.JIRA_EMAIL);
console.log('JIRA_API_TOKEN =', !!process.env.JIRA_API_TOKEN);
console.log('JIRA_BASE_URL =', process.env.JIRA_BASE_URL);

export async function getJiraStory(storyKey: string) {
  const response = await axios.get(`${process.env.JIRA_BASE_URL}/rest/api/3/issue/${storyKey}`, {
    headers: {
      Accept: 'application/json',
    },
    auth: {
      username: process.env.JIRA_EMAIL!,
      password: process.env.JIRA_API_TOKEN!,
    },
  });

  return {
    key: response.data.key,
    summary: response.data.fields.summary,
    description: response.data.fields.description,
  };
}
