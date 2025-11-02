import type { Path } from '../../types';

export function goTo(path: Path, replace?: string[]): string {
  if (!replace) {
    return path;
  }
  return replacePlaceholders(path, replace);
}

function replacePlaceholders(url: Path, replaceArray: string[]): string {
  const expression: RegExp = /:[\w-]+/g;
  const array: string[] = url.match(expression) ?? [];
  if (array.length !== replaceArray.length) {
    throw new Error(`Expected array of ${array.length} strings. Found ${replaceArray.length}`);
  }
  let result: string = url.toString();
  for (let i: number = 0; i < array.length; i++) {
    result = result.replace(array[i], replaceArray[i]);
  }
  return result;
}
