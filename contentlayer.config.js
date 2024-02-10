import { defineDocumentType, makeSource } from 'contentlayer/source-files';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const DocumentationPage = defineDocumentType(() => ({
  name: 'DocumentationPage',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    label: {
      type: 'string',
      description: 'The label of the page in the sidebar',
      required: true,
    },
    cardCTA: {
      type: 'string',
      description: 'The label of the CTA link on the card',
      required: false,
    },
    description: {
      type: 'string',
      description: 'The description of the post',
    },
    show_child_cards: {
      type: 'boolean',
      default: false,
    },
    collapsible: {
      type: 'boolean',
      required: false,
      default: false,
    },
    collapsed: {
      type: 'boolean',
      required: false,
      default: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${getSlug(post._raw.sourceFileName)}`,
    },
    readingTime: {
      type: 'number',
      resolve: (post) => calculateReadingTime(post.body.raw),
    },
    slug: {
      type: 'string',
      resolve: (post) => getSlug(post._raw.sourceFileName),
    },
    structuredData: {
      type: 'object',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'Documentation',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.date,
        description: doc.description,
        image: [siteUrl, doc.image].join(''),
        url: [siteUrl, 'blog', doc._raw.flattenedPath].join('/'),
        author: {
          '@type': 'Organization',
          name: `Ira-saas`,
        },
      }),
    },
    path: {
      type: 'string',
      resolve: (doc) => {
        if (doc._id.startsWith('docs/index.md')) {
          return '/docs';
        }

        return urlFromFilePath(doc);
      },
    },
    pathSegments: {
      type: 'json',
      resolve: (doc) => getPathSegments(doc).map(getMetaFromFolderName),
    },
    resolvedPath: {
      type: 'string',
      resolve: (doc) => {
        return getPathSegments(doc)
          .map(getMetaFromFolderName)
          .map(({ pathName }) => pathName)
          .join('/');
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [DocumentationPage],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});

function calculateReadingTime(content) {
  const wordsPerMinute = 235;
  const numberOfWords = content.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;

  return Math.ceil(minutes);
}

function getSlug(fileName) {
  return fileName.replace('.mdx', '');
}

function urlFromFilePath(doc) {
  let urlPath = doc._raw.flattenedPath.replace(/^app\/?/, '/');

  if (!urlPath.startsWith('/')) {
    urlPath = `/${urlPath}`;
  }

  return urlPath;
}

function getMetaFromFolderName(dirName) {
  const re = /^((\d+)-)?(.*)$/;
  const [, , orderStr, pathName] = dirName.match(re) ?? [];
  const order = orderStr ? parseInt(orderStr) : 0;

  return { order, pathName };
}

function getPathSegments(doc) {
  return (
    urlFromFilePath(doc)
      .split('/')
      // skip `/docs` prefix
      .slice(2)
  );
}
