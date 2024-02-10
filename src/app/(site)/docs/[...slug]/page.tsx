import { notFound } from 'next/navigation';
import { cache } from 'react';

import { allDocumentationPages } from 'contentlayer/generated';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import Container from '~/core/ui/Container';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';
import If from '~/core/ui/If';
import Divider from '~/core/ui/Divider';

import MDXRenderer from '~/core/ui/MDXRenderer/MDXRenderer';
import DocsCards from '~/app/(site)/docs/components/DocsCards';
import DocumentationPageLink from '~/app/(site)/docs/components/DocumentationPageLink';
import getPageTree from '../utils/get-documentation-page-tree';

const getPageBySlug = cache((slug: string) => {
  return allDocumentationPages.find((post) => post.resolvedPath === slug);
});

interface PageParams {
  params: {
    slug: string[];
  };
}

export const generateMetadata = ({ params }: PageParams) => {
  const page = getPageBySlug(params.slug.join('/'));

  if (!page) {
    notFound();
  }

  const { title, description } = page;

  return {
    title,
    description,
  };
};

export default function DocumentationPage({ params }: PageParams) {
  const page = getPageBySlug(params.slug.join('/'));

  if (!page) {
    notFound();
  }

  const { nextPage, previousPage, children } =
    getPageTree(page.resolvedPath) ?? {};

  const description = 'description' in page ? (page.description as string) : '';

  return (
    <Container>
      <div className={'py-10 flex flex-col space-y-8 lg:px-16 grow relative'}>
        <div className={'flex flex-col space-y-1'}>
          <Heading type={1}>{page.title}</Heading>
          <SubHeading>{description}</SubHeading>
        </div>

        <MDXRenderer code={page.body.code} />

        <Divider />

        <If condition={children}>
          <DocsCards pages={children ?? []} />
        </If>

        <div
          className={
            'flex flex-col justify-between space-y-4 md:flex-row md:space-x-8' +
            ' md:space-y-0'
          }
        >
          <div className={'w-full'}>
            <If condition={previousPage}>
              {(page) => (
                <DocumentationPageLink
                  page={page}
                  before={<ChevronLeftIcon className={'w-4'} />}
                />
              )}
            </If>
          </div>

          <div className={'w-full'}>
            <If condition={nextPage}>
              {(page) => (
                <DocumentationPageLink
                  page={page}
                  after={<ChevronRightIcon className={'w-4'} />}
                />
              )}
            </If>
          </div>
        </div>
      </div>
    </Container>
  );
}
