import { useCallback, useState } from 'react';
import { setCookie } from '~/core/generic/cookies';

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'sidebarState';

function useCollapsible(initialValue?: boolean) {
  const [isCollapsed, setIsCollapsed] = useState(initialValue);

  const onCollapseChange = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
    storeCollapsibleState(collapsed);
  }, []);

  return [isCollapsed, onCollapseChange] as [boolean, typeof onCollapseChange];
}

function storeCollapsibleState(collapsed: boolean) {
  setCookie(
    SIDEBAR_COLLAPSED_STORAGE_KEY,
    collapsed ? 'collapsed' : 'expanded'
  );
}

export default useCollapsible;
