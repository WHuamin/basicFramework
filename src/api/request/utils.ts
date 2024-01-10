export function handleRequestBaseurl() {
  const { MODE, VITE_DEV_MOCK, VITE_BASIC_SERVER, VITE_PROXY_PREFIX } = import.meta.env;
  const enableMock = MODE == 'development' && !!VITE_DEV_MOCK;
  return enableMock ? VITE_PROXY_PREFIX : `${VITE_BASIC_SERVER}${VITE_PROXY_PREFIX}`;
}
