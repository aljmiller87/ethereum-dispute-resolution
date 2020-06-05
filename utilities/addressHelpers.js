export const abbreviateAddress = (addr) => {
  if (!addr) {
    return "";
  }
  const addrLength = addr.length;
  const start = 3;
  const end = addrLength - 3;
  return addr.replace(addr.substring(start, end), "...");
};
