import { generateTestCasesOllama } from './generators/generateTestCasesOllama';

async function main() {
  const response = await generateTestCasesOllama(
    'User should be able to login using email and password',
    'qwen3:8b'
  );

  console.log(response);
}

main();
