'use client';

import { ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/outline';
import classNames from 'clsx';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { FC } from 'react';
import { useState, useEffect, useMemo } from 'react';

import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';

import isBrowser from '~/core/generic/is-browser';
import type { ProcessedDocumentationPage } from '../utils/build-documentation-tree';

const DocsNavLink: FC<{
  label: string;
  url: string;
  level: number;
  activePath: string;
  collapsible: boolean;
  collapsed: boolean;
  toggleCollapsed: () => void;
}> = ({
  label,
  url,
  level,
  activePath,
  collapsible,
  collapsed,
  toggleCollapsed,
}) => {
  const isCurrent = url == activePath;
  const isFirstLevel = level === 0;

  return (
    <div className={getNavLinkClassName(isCurrent, isFirstLevel)}>
      <Link
        className="flex items-center h-full space-x-2 grow max-w-full"
        href={`/docs/${url}`}
      >
        <span className="truncate max-w-full block">{label}</span>
      </Link>

      {collapsible && (
        <button
          aria-label="Toggle children"
          onClick={toggleCollapsed}
          className="px-2 py-1 mr-2 shrink-0"
        >
          <span
            className={`block w-2.5 ${collapsed ? '-rotate-90 transform' : ''}`}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </span>
        </button>
      )}
    </div>
  );
};

const Node: FC<{
  node: ProcessedDocumentationPage;
  level: number;
  activePath: string;
}> = ({ node, level, activePath }) => {
  const [collapsed, setCollapsed] = useState<boolean>(node.collapsed ?? false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (
      activePath == node.resolvedPath ||
      node.children.map((_) => _.resolvedPath).includes(activePath)
    ) {
      setCollapsed(false);
    }
  }, [activePath, node.children, node.resolvedPath]);

  return (
    <>
      <DocsNavLink
        label={node.label}
        url={node.resolvedPath}
        level={level}
        activePath={activePath}
        collapsible={node.collapsible}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />

      {node.children.length > 0 && !collapsed && (
        <Tree tree={node.children} level={level + 1} activePath={activePath} />
      )}
    </>
  );
};

function Tree({
  tree,
  level,
  activePath,
}: {
  tree: ProcessedDocumentationPage[];
  level: number;
  activePath: string;
}) {
  return (
    <div
      className={classNames(
        'space-y-2.5 pl-3 w-full',
        level > 0 ? 'border-l border-gray-100 dark:border-dark-800' : '',
      )}
    >
      {tree.map((treeNode, index) => (
        <Node
          key={index}
          node={treeNode}
          level={level}
          activePath={activePath}
        />
      ))}
    </div>
  );
}

export default function DocsNavigation({
  tree,
}: {
  tree: ProcessedDocumentationPage[];
}) {
  const activePath = usePathname().replace('/docs/', '');

  return (
    <>
      <aside
        style={{
          height: `calc(100vh - 64px)`,
        }}
        className="w-80 hidden lg:flex sticky top-2 shrink-0 border-r border-gray-50 dark:border-dark-800 p-4"
      >
        <Tree tree={tree} level={0} activePath={activePath} />
      </aside>

      <div className={'lg:hidden'}>
        <FloatingDocumentationNavigation tree={tree} activePath={activePath} />
      </div>
    </>
  );
}

function getNavLinkClassName(isCurrent: boolean, isFirstLevel: boolean) {
  return classNames(
    'group flex h-8 items-center justify-between space-x-2 whitespace-nowrap rounded-md px-3 text-sm leading-none transition-colors',
    {
      [`bg-primary/5 text-primary dark:bg-primary/30 dark:text-primary-foreground`]:
        isCurrent,
      [`hover:bg-gray-50 dark:hover:bg-primary/10 dark:text-gray-300`]:
        !isCurrent,
      [`font-semibold`]: isFirstLevel,
      [`font-normal`]: !isFirstLevel && isCurrent,
      [`hover:text-gray-600 dark:hover:text-gray-200 dark:hover:bg-dark-800/30`]:
        !isFirstLevel && !isCurrent,
    },
  );
}

function FloatingDocumentationNavigation({
  tree,
  activePath,
}: React.PropsWithChildren<{
  tree: ProcessedDocumentationPage[];
  activePath: string;
}>) {
  const body = useMemo(() => {
    return isBrowser() ? document.body : null;
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const enableScrolling = (element: HTMLElement) =>
    (element.style.overflowY = '');

  const disableScrolling = (element: HTMLElement) =>
    (element.style.overflowY = 'hidden');

  // enable/disable body scrolling when the docs are toggled
  useEffect(() => {
    if (!body) {
      return;
    }

    if (isVisible) {
      disableScrolling(body);
    } else {
      enableScrolling(body);
    }
  }, [isVisible, body]);

  // hide docs when navigating to another page
  useEffect(() => {
    setIsVisible(false);
  }, [activePath]);

  const onClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <If condition={isVisible}>
        <div
          className={
            'fixed left-0 top-0 z-10 h-screen w-full p-4' +
            ' flex flex-col space-y-4 overflow-auto bg-white dark:bg-background'
          }
        >
          <Heading type={1}>Table of Contents</Heading>

          <Tree tree={tree} level={0} activePath={activePath} />
        </div>
      </If>

      <Button
        round
        className={'fixed bottom-5 right-5 z-10 h-16 w-16 rounded-full'}
        onClick={onClick}
      >
        <Bars3Icon className={'h-8'} />
      </Button>
    </>
  );
}
