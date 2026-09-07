import fs from 'fs';
import path from 'path';

export function saveTestFile(fileName: string, content: string) {
  const outputDir = path.join(process.cwd(), 'generated-tests');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, content);

  return filePath;
}
