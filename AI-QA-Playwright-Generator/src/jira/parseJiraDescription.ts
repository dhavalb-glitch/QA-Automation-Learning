type JiraDescriptionNode = {
  type?: string;
  text?: string;
  content?: JiraDescriptionNode[];
};

export function parseJiraDescription(description: JiraDescriptionNode): string {
  let result = '';

  function extractText(node?: JiraDescriptionNode) {
    if (!node) return;

    if (node.type === 'text' && node.text) {
      result += node.text;
    }

    node.content?.forEach((child) => extractText(child));

    if (node.type === 'paragraph' || node.type === 'heading' || node.type === 'bulletList') {
      result += '\n';
    }
  }

  extractText(description);

  return result.trim();
}
