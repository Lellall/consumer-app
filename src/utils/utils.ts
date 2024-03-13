export const formatError = error => {
  if (error) {
    const {status, data} = error.response;
    const message = data?.details || error.message;
    return {error: {status, message}};
  }
};

const WUSE_MARKET_COORDINATES = {lat: 9.0685829, lng: 7.4660566};

export const calculateDistance = (
  lat1: number = WUSE_MARKET_COORDINATES.lat,
  lon1: number = WUSE_MARKET_COORDINATES.lng,
  lat2: number,
  lon2: number,
) => {
  // Earth's mean radius in kilometers
  const earthRadius = 6371;
  // Convert latitudes and longitudes to radians using Math.PI/180
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;

  // Calculate difference in latitude and longitude
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  // Use the haversine formula for accurate distance calculation
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Return the distance in kilometers
  return earthRadius * c;
};

export const baseUrl = 'https://api.lellall.com/';
export const googlePlaceKey = 'AIzaSyBrdpKCFrR1oMxYds0rkd80BWkhzREXmSY';
export const flutterWaveAuthKey =
  'FLWPUBK_TEST-3f6eeabb830a9be512645153a5997d09-X';
// 'http://api.dev.lellall.com/'
//http://146.190.153.125
//https://api.dev.lellall.com/ - dev
