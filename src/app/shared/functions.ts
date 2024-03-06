export const mathPattern = '^([1-9][0-9]*[\\.+\\-*\\/])*[1-9][0-9]*$';

export function getCurrentDateString(): string {
    return (new Date()).toISOString().substring(0, 10);
}

export function evaluateString(text: string): number {
    const regex = new RegExp(mathPattern);
    const lastChar = text[text.length - 1];
    if (lastChar === '=') {
        const command = text.substring(0, text.length - 1);
        if (regex.test(command)) {
            // tslint:disable-next-line: no-eval
            return +eval(command);
        } else {
            throw new Error('Invalid Expression');
        }
    }
    return 0;
}

export function ToTitleCase(text: string) {
    return text.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      ); 
}

export function SplitCamelCase(text: string) {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
}

