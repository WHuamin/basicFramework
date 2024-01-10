export function handleRequestBaseurl() {
  const { MODE, VITE_BASIC_ENABLE_MOCK, VITE_BASIC_SERVER, VITE_BASIC_PROXY_PREFIX } = import.meta.env;
  const enableMock = MODE == 'development' && !!VITE_BASIC_ENABLE_MOCK;
  return enableMock ? VITE_BASIC_PROXY_PREFIX : `${VITE_BASIC_SERVER}${VITE_BASIC_PROXY_PREFIX}`;
}
