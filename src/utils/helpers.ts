type StartFetchTimeout = {
  fetchTimeoutId: number;
  controller: AbortController;
};

export function startFetchTimeout(
  durationInSeconds: number
): StartFetchTimeout {
  const controller = new AbortController();
  const fetchTimeoutId = setTimeout(
    () => controller.abort(),
    durationInSeconds * 1000
  );
  return { fetchTimeoutId, controller };
}
