export const formatError = error => {
  if (error) {
    const {status, data} = error.response;
    const message = data?.details || error.message;
    return {error: {status, message}};
  }
};

export const baseUrl = 'https://api.dev.lellall.com/';
export const googlePlaceKey = 'AIzaSyDBqbRu9jjh3kBFSXTH6bgp7cAt2_2M2x4';
export const flutterWaveAuthKey =
  'FLWPUBK_TEST-e007e0538282acb39f0899d9c96fb3c2-X';
// 'http://api.dev.lellall.com/'
//http://146.190.153.125
//update base url l=l p=p d=d
