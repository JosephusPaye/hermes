const storageKeys = {
  lastOpenLowerThirds: 'hermes:last-open-lower-thirds',
};

export function getLastOpenLowerThirds(fallback) {
  const lastOpenLowerThirds = localStorage.getItem(
    storageKeys.lastOpenLowerThirds
  );

  if (lastOpenLowerThirds) {
    return JSON.parse(lastOpenLowerThirds);
  }

  return fallback;
}

export function setLastOpenLowerThirds(lowerThirds) {
  localStorage.setItem(
    storageKeys.lastOpenLowerThirds,
    JSON.stringify(lowerThirds)
  );
}
