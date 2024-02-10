import { allDocumentationPages } from 'contentlayer/generated';

import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';

import DocsCards from '~/app/(site)/docs/components/DocsCards';
import { buildDocumentationTree } from './utils/build-documentation-tree';

import configuration from '~/configuration';

export const metadata = {
  title: `Documentation - ${configuration.site.siteName}`,
};

function DocsPage() {
  const tree = buildDocumentationTree(allDocumentationPages);

  return (
    <div className={'flex flex-col space-y-16 my-8'}>
      <div className={'flex flex-col items-center space-y-4'}>
        <Heading type={1}>Documentation</Heading>

        <SubHeading>Get started with our guides and tutorials</SubHeading>
      </div>

      <div>
        <DocsCards pages={tree ?? []} />
      </div>
    </div>
  );
}

export default DocsPage;
