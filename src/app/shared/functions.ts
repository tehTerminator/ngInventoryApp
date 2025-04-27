export const mathPattern = /^(\d+(\.\d+)?([+\-*/]\d+(\.\d+)?)*=)$/gm;

export function getCurrentDateString(): string {
  return new Date().toISOString().substring(0, 10);
}

export function evaluateString(text: string): number {
  const regex = mathPattern;
  const lastChar = text[text.length - 1];
  if (lastChar === '=') {
    const command = text.substring(0, text.length - 1);
    if (regex.test(text)) {
      // tslint:disable-next-line: no-eval
      return +eval(command).toFixed(2);
    } else {
      throw new Error('Invalid Expression');
    }
  }
  return 0;
}

export function ToTitleCase(text: string) {
  return text.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function SplitCamelCase(text: string) {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function parseDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
