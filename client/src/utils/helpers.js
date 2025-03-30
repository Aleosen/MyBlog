export const tryParseJSON = (content) => {
  try {
    if (typeof content === 'string') {
      return JSON.parse(content);
    }
    return content || { type: 'doc', content: [] };
  } catch {
    return { type: 'doc', content: [] };
  }
};