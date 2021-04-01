import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export default history;

/**
 * @returns user friendly page number (exact url param)
 */
export const getPageParam = () => {
  const p = new URLSearchParams(history.location.search).get('p');
  return p ? Number.parseInt(p) : 1;
};

export const setURLParams = (newPage: number) => {
  const urlParams = new URLSearchParams(window.location.search);
  const current = urlParams.get('p');

  const newPageUserFriendly = newPage + 1;
  try {
    if (current && newPageUserFriendly === Number.parseInt(current)) {
      return;
    }
  } catch (e) {
    // Doesn't matter
  }

  if (newPageUserFriendly === 1) {
    urlParams.delete('p');
  } else {
    urlParams.set('p', `${newPageUserFriendly}`);
  }
  history.push(`${window.location.pathname}?${urlParams.toString()}`);
};
