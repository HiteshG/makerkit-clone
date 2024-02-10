import {
  allDocumentationPages,
  DocumentationPage,
} from 'contentlayer/generated';

import DocsNavigation from './components/DocsNavigation';
import Container from '~/core/ui/Container';

import { buildDocumentationTree } from './utils/build-documentation-tree';

function DocsLayout({ children }: React.PropsWithChildren) {
  const tree = buildDocumentationTree(
    allDocumentationPages as DocumentationPage[],
  );

  return (
    <Container>
      <div className={'flex'}>
        <DocsNavigation
          tree={tree as ReturnType<typeof buildDocumentationTree>}
        />

        <div className={'w-full flex flex-col items-center'}>{children}</div>
      </div>
    </Container>
  );
}

export default DocsLayout;
