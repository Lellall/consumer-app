export const formatError = error => {
  if (error) {
    const {status, data} = error.response;
    const message = data?.details || error.message;
    return {error: {status, message}};
  }
};

export const baseUrl = 'https://api.dev.lellall.com/';
export const googlePlaceKey = 'AIzaSyBrdpKCFrR1oMxYds0rkd80BWkhzREXmSY';
export const flutterWaveAuthKey =
  'FLWPUBK_TEST-3f6eeabb830a9be512645153a5997d09-X';
// 'http://api.dev.lellall.com/'
//http://146.190.153.125
//update base url l=l p=p d=d
