import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const DocsCard: React.FC<
  React.PropsWithChildren<{
    label: string;
    subtitle?: string | null;
    link?: { url: string; label: string };
  }>
> = ({ label, subtitle, children, link }) => {
  return (
    <div className="flex flex-col">
      <div
        className={`grow flex flex-col space-y-2.5 border border-gray-200 p-6 dark:border-dark-800 dark:bg-background 
        ${link ? 'rounded-t-2xl border-b-0' : 'rounded-2xl'}`}
      >
        <h3 className="mt-0 text-lg dark:text-white font-semibold">{label}</h3>

        {subtitle && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>{subtitle}</p>
          </div>
        )}
        {children && <div className="text-sm">{children}</div>}
      </div>

      {link && (
        <div className="rounded-b-2xl border border-primary/40 bg-primary/5 p-6 py-4 dark:border-primary-900/50 dark:bg-primary-900/20">
          <span className={'text-primary flex space-x-2 items-center'}>
            <Link
              className={'font-semibold hover:underline'}
              href={`/docs/${link.url}`}
            >
              {link.label}
            </Link>

            <ChevronRightIcon className={'w-5 h-5'} />
          </span>
        </div>
      )}
    </div>
  );
};

export default DocsCard;
