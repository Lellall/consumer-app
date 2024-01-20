export const formatError = error => {
  if (error) {
    const {status, data} = error.response;
    const message = data?.details || error.message;
    return {error: {status, message}};
  }
};

export const baseUrl = 'https://api.dev.lellall.com/';
// 'http://api.dev.lellall.com/'
//http://146.190.153.125
