import {useEffect, useState} from 'react';

function useOpenCloseShop() {
  const [isShopsClose, setIsShopsClose] = useState(false);

  useEffect(() => {
    const updateWorkingHours = () => {
      const now = new Date();
      let hour = now.getHours();
      hour = hour % 12 || 12;
      const minute = now.getMinutes();
      //   const AMPM = now.format('A');
      if (hour < 12) {
        hour = hour + 12;
      }
      if (hour === 12) {
        hour = hour - 12;
      }
      let shopsOpen = hour >= 10 && hour < 17 && minute >= 0;
      setIsShopsClose(!shopsOpen);
    };
    updateWorkingHours();
    // Update every minute
    const intervalId = setInterval(updateWorkingHours, 60000);

    return () => clearInterval(intervalId);
  }, [isShopsClose, setIsShopsClose]);
  return {isShopsClose};
}

export default useOpenCloseShop;
