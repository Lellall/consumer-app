import queryString from 'query-string';
import {useEffect, useState} from 'react';
import {Linking} from 'react-native';

const useDeepLink = () => {
  const [value, setValue] = useState<any>(undefined);

  useEffect(() => {
    const handleDeepLink = (event: {url: any}) => {
      const url = event.url || event;
      if (url) {
        const parsedUrl: any = queryString.parseUrl(url);
        const queryParams = parsedUrl.query;
        const data = queryParams.transfer_code;

        setValue(data);
      }
    };

    const sub = Linking.addEventListener('url', handleDeepLink);
    return () => {
      Linking?.removeSubscription?.(sub);
    };
  }, []);

  return {value};
};

export default useDeepLink;
