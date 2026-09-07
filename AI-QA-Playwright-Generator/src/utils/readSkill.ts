import fs from 'fs';
import path from 'path';

export function readSkill(fileName: string): string {
  const skillPath = path.join(process.cwd(), 'src', 'skills', fileName);

  return fs.readFileSync(skillPath, 'utf-8');
}
