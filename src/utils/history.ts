import { NavigateFunction } from 'react-router-dom';

/**
 * @returns user friendly page number (exact url param)
 */
export const getPageParam = (params: URLSearchParams) => {
  const p = params.get('p');
  return p ? Number.parseInt(p) : 1;
};

export const setURLParams = (
  newPage: number,
  params: URLSearchParams,
  navigate: NavigateFunction
) => {
  const current = params.get('p');

  const newPageUserFriendly = newPage + 1;
  try {
    if (current && newPageUserFriendly === Number.parseInt(current)) {
      return;
    }
  } catch (e) {
    // Doesn't matter
  }

  let search: string | undefined = undefined;

  if (newPageUserFriendly !== 1) {
    search = `?p=${newPageUserFriendly}`;
  }

  navigate({ pathname: '/', search }, { replace: true });
};
