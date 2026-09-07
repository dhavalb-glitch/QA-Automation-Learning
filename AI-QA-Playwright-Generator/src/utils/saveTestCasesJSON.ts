import fs from 'fs';
import path from 'path';

export function saveTestCases(fileName: string, content: unknown) {
  const outputDir = path.join(process.cwd(), 'generated-testcases');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

  return filePath;
}
