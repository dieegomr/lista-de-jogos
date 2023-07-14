export type StartFetchTimeout = {
  fetchTimeoutId: NodeJS.Timeout;
  controller: AbortController;
};
