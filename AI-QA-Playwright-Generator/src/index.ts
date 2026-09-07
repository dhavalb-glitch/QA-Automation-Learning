import { getJiraStory } from './jira/getJiraStory';
import { parseJiraDescription } from './jira/parseJiraDescription';

import promptSync from 'prompt-sync';

import { generateTestCases } from './generators/generateTestCases'; //for OpenROuter AI
import { generateTestCasesOllama } from './generators/generateTestCasesOllama';

import { saveTestCases } from './utils/saveTestCasesJSON';
import { exportToExcel } from './utils/exportToExcel';

import { generatePlaywrightScript } from './generators/generatePlaywright';
import fs from 'fs';
import path from 'path';

async function main() {
  try {
    const startTime = Date.now();
    const prompt = promptSync();

    const storyId = prompt('Enter Jira Story ID: ');
    console.log('\nChoose AI Provider:');
    console.log('1. OpenRouter');
    console.log('2. Ollama');

    const aiChoice = prompt('Enter Choice (1 or 2): ');

    let modelChoice = '';

    if (aiChoice === '1') {
      console.log('\nChoose OpenRouter Model:');
      console.log('1. DeepSeek');
      console.log('2. Claude');
      console.log('3. Gemini');

      modelChoice = prompt('Enter Model Choice: ');
    }

    if (aiChoice === '2') {
      console.log('\nChoose Ollama Model:');
      console.log('1. Qwen');
      console.log('2. Llama');

      modelChoice = prompt('Enter Model Choice: ');
    }

    let selectedModel = '';

    if (aiChoice === '1') {
      if (modelChoice === '1') selectedModel = 'deepseek/deepseek-chat-v3-0324';

      if (modelChoice === '2') selectedModel = 'anthropic/claude-3.5-sonnet';

      if (modelChoice === '3') selectedModel = 'google/gemini-2.5-flash';
    }

    if (aiChoice === '2') {
      if (modelChoice === '1') selectedModel = 'qwen3:8b';
      if (modelChoice === '2') selectedModel = 'llama3';
    }

    console.log(`Using Model: ${selectedModel}`);

    // Step-1: Fetch Jira Story
    const story = await getJiraStory(storyId);

    console.log('\n===== JIRA STORY =====\n');
    console.log('Story Key:', story.key);
    console.log('Summary:', story.summary);

    // Step-2: Parse Jira Description
    const requirement = parseJiraDescription(story.description);

    console.log('\n===== REQUIREMENT TYPE =====');
    console.log(typeof requirement);

    console.log('\n===== REQUIREMENT =====\n');
    console.log(requirement);

    // Step-3: Generate Test Cases using Skill.md
    console.log('\n===== GENERATING TEST CASES =====\n');

    let response: string;

    if (aiChoice === '1') {
      response = await generateTestCases(requirement, selectedModel);
    } else if (aiChoice === '2') {
      response = await generateTestCasesOllama(requirement, selectedModel);
    } else {
      throw new Error('Invalid AI Provider Choice');
    }

    console.log('\n===== RAW RESPONSE START =====');
    console.log(response);
    console.log('\n===== RAW RESPONSE END =====');

    // Step-4: Convert AI response to JSON
    let cleanedResponse = response.trim();

    // Remove markdown code fences if present
    cleanedResponse = cleanedResponse
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    // Extract only the JSON array
    const jsonStart = cleanedResponse.indexOf('[');
    const jsonEnd = cleanedResponse.lastIndexOf(']');

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON array found in AI response.');
    }

    cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);

    const parsedResponse = JSON.parse(cleanedResponse);

    const testCases = Array.isArray(parsedResponse) ? parsedResponse : parsedResponse.testCases;

    console.log('\n===== PARSED RESPONSE =====');
    console.log(parsedResponse);

    console.log('\n===== TEST CASES =====');
    console.log(testCases);

    const scenarioCounts = {
      Positive: 0,
      Negative: 0,
      Validation: 0,
      Security: 0,
      Integration: 0,
    };

    for (const tc of testCases || []) {
      const type = tc.scenarioType?.trim();

      if (type && type in scenarioCounts) {
        scenarioCounts[type as keyof typeof scenarioCounts]++;
      }
    }

    // Step-5: Save JSON
    const jsonFilePath = saveTestCases(`${story.key}-testcases.json`, testCases);

    console.log(`JSON file generated successfully: ${jsonFilePath}`);

    // Step-6: Export Excel
    const excelFilePath = exportToExcel(testCases, `${story.key}-testcases.xlsx`);

    console.log(`Excel file generated successfully: ${excelFilePath}`);

    // Step-7: Generate Playwright Script
    console.log('\n===== GENERATING PLAYWRIGHT SCRIPT =====\n');

    const selectedTestCases = testCases.slice(0, 3);

    const playwrightCode = await generatePlaywrightScript(requirement, selectedTestCases);

    const generatedTestsDir = path.join(process.cwd(), 'generated-tests');

    if (!fs.existsSync(generatedTestsDir)) {
      fs.mkdirSync(generatedTestsDir);
    }

    const playwrightFilePath = path.join(generatedTestsDir, `${story.key}.spec.ts`);

    fs.writeFileSync(playwrightFilePath, playwrightCode);

    console.log(`Playwright script generated successfully: ${playwrightFilePath}`);

    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const executionTime = `${minutes} min ${seconds} sec`;
    //console.log('\n===== WORKFLOW COMPLETED SUCCESSFULLY =====\n');
    console.log(`
==================================================
                EXECUTION SUMMARY
==================================================

AI Provider : ${aiChoice === '1' ? 'OpenRouter' : 'Ollama'}
Model       : ${selectedModel}

Positive    : ${scenarioCounts.Positive}
Negative    : ${scenarioCounts.Negative}
Validation  : ${scenarioCounts.Validation}
Security    : ${scenarioCounts.Security}
Integration : ${scenarioCounts.Integration}

Total       : ${testCases.length}

Time Taken  : ${executionTime} sec

==================================================

===== WORKFLOW COMPLETED SUCCESSFULLY =====
`);
  } catch (error) {
    console.error('\n===== WORKFLOW FAILED =====\n');

    console.error(error);
  }
}

main();
