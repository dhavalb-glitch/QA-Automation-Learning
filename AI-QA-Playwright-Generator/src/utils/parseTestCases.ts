export interface TestCase {
  testCaseId: string;
  module: string;
  title: string;
  type: string;
}

export function parseTestCases(testCasesText: string): TestCase[] {
  const lines = testCasesText.split('\n').filter((line) => line.trim().startsWith('TC-'));

  return lines.map((line) => {
    const [id, ...titleParts] = line.split(':');

    const title = titleParts.join(':').trim();

    return {
      testCaseId: id.trim(),
      module: 'Authentication',
      title,
      type: getTestCaseType(title),
    };
  });
}

function getTestCaseType(title: string): string {
  const lowerTitle = title.toLowerCase();

  if (
    lowerTitle.includes('fail') ||
    lowerTitle.includes('invalid') ||
    lowerTitle.includes('lockout') ||
    lowerTitle.includes('deactivated') ||
    lowerTitle.includes('suspended')
  ) {
    return 'Negative';
  }

  if (
    lowerTitle.includes('validation') ||
    lowerTitle.includes('error message') ||
    lowerTitle.includes('empty')
  ) {
    return 'Validation';
  }

  return 'Positive';
}
