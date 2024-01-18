const ROOT_PATH = '/';

export default function isRouteActive(
  targetLink: string,
  currentRoute: string,
  depth: number
) {
  const currentRoutePath = currentRoute.split('?')[0];

  if (!isRoot(currentRoutePath) && isRoot(targetLink)) {
    return false;
  }

  if (!currentRoutePath.includes(targetLink)) {
    return false;
  }

  const isSameRoute = targetLink === currentRoutePath;

  if (isSameRoute) {
    return true;
  }

  return hasMatchingSegments(targetLink, currentRoutePath, depth);
}

function splitIntoSegments(href: string) {
  return href.split('/').filter(Boolean);
}

function hasMatchingSegments(
  targetLink: string,
  currentRoute: string,
  depth: number
) {
  const segments = splitIntoSegments(targetLink);
  const matchingSegments = numberOfMatchingSegments(currentRoute, segments);

  if (targetLink === currentRoute) {
    return true;
  }

  return matchingSegments > segments.length - (depth - 1);
}

function numberOfMatchingSegments(href: string, segments: string[]) {
  let count = 0;

  for (const segment of splitIntoSegments(href)) {
    if (segments.includes(segment)) {
      count += 1;
    } else {
      return count;
    }
  }

  return count;
}

function isRoot(path: string) {
  return path === ROOT_PATH;
}
