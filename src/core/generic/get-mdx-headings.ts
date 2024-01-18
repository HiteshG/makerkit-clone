export default function getMDXHeadings(source: string) {
  const headingLines = source.split('\n').filter((line) => {
    return line.match(/^#*\s/);
  });

  return headingLines.reduce<Array<{ level: number; text: string }>>(
    (acc, raw: string) => {
      const text = raw.replace(/^#*\s/, '');
      const matches = raw.match(/^#+\s/);

      if (matches) {
        const item = {
          text,
          level: matches[0].trim().length,
        };

        return [...acc, item];
      }

      return acc;
    },
    []
  );
}
