import type { DocumentationPage } from 'contentlayer/generated';
import { cache } from 'react';

export interface ProcessedDocumentationPage extends DocumentationPage {
  collapsible: boolean;
  pathSegments: Array<string>;
  nextPage: ProcessedDocumentationPage | DocumentationPage | null;
  previousPage: ProcessedDocumentationPage | DocumentationPage | null;
  children: DocsTree;
}

export type DocsTree = Array<ProcessedDocumentationPage>;

/**
 * Build a tree of documentation pages from a flat list of pages with path segments
 * @param docs
 * @param parentPathNames
 */
export const buildDocumentationTree = cache(
  (docs: DocumentationPage[], parentPathNames: string[] = []): DocsTree => {
    const level = parentPathNames.length;

    const pages = docs
      .filter(
        (_) =>
          _.pathSegments.length === level + 1 &&
          _.pathSegments
            .map(({ pathName }: { pathName: string }) => pathName)
            .join('/')
            .startsWith(parentPathNames.join('/')),
      )
      .sort(
        (a, b) => a.pathSegments[level].order - b.pathSegments[level].order,
      );

    return pages.map((doc, index) => {
      const children = buildDocumentationTree(
        docs,
        doc.pathSegments.map(({ pathName }: { pathName: string }) => pathName),
      );

      return {
        ...doc,
        pathSegments: doc.pathSegments || ([] as string[]),
        collapsible: children.length > 0,
        nextPage: children[0] || pages[index + 1],
        previousPage: pages[index - 1],
        children,
      };
    });
  },
);
