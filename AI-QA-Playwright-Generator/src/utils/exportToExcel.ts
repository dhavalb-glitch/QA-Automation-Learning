import * as XLSX from 'xlsx';

interface TestCase {
  testCaseId?: string;
  module?: string;
  title?: string;
  preconditions?: string[];
  testSteps?: string[];
  expectedResult?: string;
  testData?: unknown;
  scenarioType?: string;
}

export function exportToExcel(testCases: TestCase[], fileName: string) {
  const excelData = testCases.map((tc) => ({
    'Test Case ID': tc.testCaseId,

    Status: '',

    Module: tc.module,

    'Test Case Title': tc.title,

    Preconditions: tc.preconditions?.join('\n'),

    'Test Steps': tc.testSteps?.map((step, index) => `${index + 1}. ${step}`).join('\n'),

    'Expected Result': tc.expectedResult,

    'Actual Result': '',

    'Test Data': JSON.stringify(tc.testData, null, 2),

    'Scenario Type': tc.scenarioType,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  worksheet['!cols'] = [
    { wch: 15 }, // Test Case ID
    { wch: 12 }, // Status
    { wch: 18 }, // Module
    { wch: 18 }, // Scenario Type
    { wch: 45 }, // Title
    { wch: 40 }, // Preconditions
    { wch: 60 }, // Steps
    { wch: 50 }, // Expected Result
    { wch: 30 }, // Actual Result
    { wch: 35 }, // Test Data
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Cases');

  XLSX.writeFile(workbook, fileName);

  return fileName;
}
