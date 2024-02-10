import { cache } from 'react';
import {
  allDocumentationPages,
  DocumentationPage,
} from 'contentlayer/generated';

import { buildDocumentationTree } from './build-documentation-tree';

/**
 * Retrieves a specific documentation page from the page tree by its path.
 *
 * @param {string} pagePath - The path of the documentation page to retrieve.
 * @returns {DocumentationPageWithChildren | undefined} The documentation page found in the tree, if any.
 */
const getPageTree = cache((pagePath: string) => {
  const tree = buildDocumentationTree(allDocumentationPages);

  type DocumentationPageWithChildren = DocumentationPage & {
    previousPage?: DocumentationPage | null;
    nextPage?: DocumentationPage | null;
    children?: DocumentationPage[];
  };

  const findPageInTree = (
    pages: DocumentationPageWithChildren[],
    path: string,
  ): DocumentationPageWithChildren | undefined => {
    for (const page of pages) {
      if (page.resolvedPath === path) {
        return page;
      }

      const hasChildren = page.children && page.children.length > 0;

      if (hasChildren) {
        const foundPage = findPageInTree(page.children ?? [], path);

        if (foundPage) {
          return foundPage;
        }
      }
    }
  };

  return findPageInTree(tree, pagePath);
});

export default getPageTree;
