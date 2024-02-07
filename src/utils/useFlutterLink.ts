import queryString from 'query-string';
import {useEffect, useState} from 'react';
import {Linking} from 'react-native';

const useFlutterLink = () => {
  const [transactionRef, setValue] = useState<any>(undefined);
  const [status, setStatus] = useState<any>(undefined);
  const [transactionId, setTransactionId] = useState<any>(undefined);

  // https://lellall.com/checkout/status?status=successful&tx_ref=2024013112225579&transaction_id=4883974

  useEffect(() => {
    const handleDeepLink = (event: {url: any}) => {
      const url = event.url || event;
      console.log('URL FL:', url);
      if (url) {
        const parsedUrl: any = queryString.parseUrl(url);
        const queryParams = parsedUrl.query;
        const tx_ref = queryParams.tx_ref;
        const statusValue = queryParams.status;
        const transaction_id = queryParams.transaction_id;
        setValue(tx_ref);
        setStatus(statusValue);
        setTransactionId(transaction_id);
      }
    };

    const sub = Linking.addEventListener('url', handleDeepLink);
    return () => {
      Linking?.removeSubscription?.(sub);
    };
  }, [transactionRef, status, transactionId]);

  return {transactionRef, status, transactionId};
};

export default useFlutterLink;
