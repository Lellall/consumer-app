import axios from 'axios';
import {useState} from 'react';
interface QueryParams {
  method: string;
  url: string;
  bodyData: {};
  token?: string;
  file?: any;
  convert?: boolean;
}
const BASE = 'https://gee2-api-fb8c03a9d70a.herokuapp.com';
export default function useQuery() {
  const [loading, setLoading] = useState(false);

  async function query({
    method,
    url,
    bodyData,
    token = '',
    file = null,
    convert = true,
  }: QueryParams) {
    let headers1 = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token, //`Bearer ${token}`
    };

    let headers2 = {
      'Content-Type': 'application/json',
    };
    const conditionalHeader = token ? headers1 : headers2;
    try {
      setLoading(true);
      if (method == 'GET') {
        var response = await fetch(BASE + url, {
          headers: conditionalHeader,
          method,
        });
      } else {
        const formData = new FormData();

        if (file !== null) {
          formData.append('file', {
            uri: file.uri,
            type: file.type,
            name: file.fileName,
          });
          Object.keys(bodyData).forEach(key => {
            const value = bodyData[key];
            formData.append(key, value);
          });
        }

        var response = await fetch(BASE + url, {
          method,
          headers:
            file == null
              ? conditionalHeader
              : {
                  Authorization: 'Bearer ' + token,
                  'Content-Type': 'multipart/form-data',
                },
          body: file == null ? JSON.stringify(bodyData) : formData,
        });
      }

      setLoading(false);

      let data;
      if (convert) {
        data = await response.json();
      }

      if (response.ok) {
        return {success: true, data};
      }

      return {success: false, data};
    } catch (err) {
      setLoading(false);
      return {success: false, error: err};
    }
  }

  return {loading, query};
}
