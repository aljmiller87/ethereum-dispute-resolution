import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const useNotifications = () => {
  const { contractLogs } = useSelector((state) => state);
  const [alertHidden, setAlertHidden] = useState(false);
  const logCoung = useRef(0);

  const flatLogs = [...Object.values(contractLogs)].flat();
  const sortedNotifications = flatLogs.sort((a, b) => {
    if (b.blockNumber > a.blockNumber) return 1;
    if (a.blockNumber > b.blockNumber) return -1;

    return 0;
  });
  const newNotifications = flatLogs.reduce((acc, current) => {
    return current.isNew ? acc + 1 : acc;
  }, 0);

  const hideAlertFunc = () => setAlertHidden(true);

  useEffect(() => {
    if (flatLogs.length !== logCoung.current) {
      logCoung.current = flatLogs.length;
      setAlertHidden(false);
    }
  }, [flatLogs.length]);

  return { sortedNotifications, newNotifications, alertHidden, hideAlertFunc };
};

export default useNotifications;
