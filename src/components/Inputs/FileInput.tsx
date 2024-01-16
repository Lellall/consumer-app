import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Text from '../Text/Text';
import Button from '../Buttons/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from '../DatePicker/DatePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import useAlert from '../../hooks/useAlert';
import Loader from '../Loaders/Loader';
import {
  NavigatorScreenParams,
  useNavigation,
  RouteProp,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import useQuery from '../../hooks/useQuery';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import axios from 'axios';
interface FileInputProps {
  label: string;
  description: string;
  isRequired?: boolean;
  onUpload?: () => void;
  onSuccess?: () => void;
  id: string;
  face?: boolean;
  type?: string;
}
export default function FileInput({
  label = '',
  description = '',
  isRequired = false,
  onUpload,
  onSuccess,
  id,
  face,
  type,
}: FileInputProps) {
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const {Alert, showAlert} = useAlert();
  const navigate = useNavigation();
  const {query, loading} = useQuery();
  const [fileLoading, setFileLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  async function getFile() {
    if (date == '' && !face) {
      setError('Expiration date is required!');
      return;
    }

    if (face) {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(async result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              showAlert({
                text: 'Please you must take a live picture to pass this stage!',
                type: 'warn',
              });
              setTimeout(() => {
                /* eslint-disable */
                navigate.navigate('Login');
              }, 1000);
              break;
            case RESULTS.DENIED:
              const requestPermission = await request(
                PERMISSIONS.ANDROID.CAMERA,
              );
              if (requestPermission == 'granted') {
                const result = await launchCamera({
                  mediaType: 'photo',
                  cameraType: 'front',
                });
                if (result.assets) {
                  const formData = new FormData();
                  console.log('first');
                  formData.append('file', {
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                    name: result.assets[0].fileName,
                  });
                  formData.append('vehicle_id', id);
                  formData.append('vehicle_document_type', 'DRIVER_PICTURE');
                  // formData.append('expiration_date', date);
                  setFileLoading(true);
                  axios
                    .post(
                      'https://gee2-api-fb8c03a9d70a.herokuapp.com/api/v1/upload/vehicle-document',
                      formData,
                      {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: 'Bearer ' + user.token,
                        },
                      },
                    )
                    .then(response => {
                      // Handle the response data
                      setFileLoading(false);
                      console.log(response, 'lll');
                      if (response.status == 200) {
                        showAlert({text: 'Succesful Uploaded'});
                        onSuccess?.();
                      }
                      if (response.status !== 200) {
                        showAlert({
                          text: 'Error Uploading IMage',
                          type: 'error',
                        });
                      }
                    })
                    .catch(error => {
                      setFileLoading(false);
                      // Handle any errors
                      showAlert({text: 'Error Uploading IMage', type: 'error'});
                    });
                  // const bodyData = {
                  //   vehicle_id: id,
                  //   vehicle_document_type: 'DRIVER_PICTURE',
                  //   expiration_date: '',
                  // };

                  // const response = await query({
                  //   method: 'POST',
                  //   bodyData,
                  //   url: '/api/v1/upload/vehicle-document',
                  //   file: result.assets[0],
                  //   token: user.token,
                  // });
                  // if (response.success) {
                  //   showAlert({text: 'Succesful Uploaded'});
                  //   onSuccess?.();
                  // }
                  // if (!response.success) {
                  //   showAlert({text: 'Error Uploading Image', type: 'error'});
                  // }
                }
              }
              break;
            case RESULTS.LIMITED:
              const results = await launchCamera({
                mediaType: 'photo',
                cameraType: 'front',
              });
              if (results.assets) {
                setTimeout(() => {
                  showAlert({text: 'Succesful Uploaded'});
                }, 2000);
              }
              break;
            case RESULTS.GRANTED:
              const result = await launchCamera({
                mediaType: 'photo',
                cameraType: 'front',
                maxWidth: 100,
              });
              if (result.assets) {
                const bodyData = {
                  vehicle_id: id,
                  vehicle_document_type: 'DRIVER_PICTURE',
                  expiration_date: '',
                };
                console.log('second');
                const response = await query({
                  method: 'POST',
                  bodyData,
                  url: '/api/v1/upload/vehicle-document',
                  file: result.assets[0],
                  token: user.token,
                });
                if (response.success) {
                  showAlert({text: 'Succesful Uploaded'});
                  onSuccess?.();
                }
                if (!response.success) {
                  console.log(response);
                  showAlert({text: 'Error Uploading Image', type: 'error'});
                }
              }
              break;
            case RESULTS.BLOCKED:
              showAlert({
                text: 'Please you must take a live picture to pass this stage!',
                type: 'warn',
              });
              setTimeout(() => {
                /* eslint-disable */
                navigate.navigate('Login');
              }, 1000);
              break;
          }
        })
        .catch(error => {
          // …
        });

      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets) {
      const formData = new FormData();

      formData.append('file', {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
      formData.append('vehicle_id', id);
      formData.append('vehicle_document_type', type);
      formData.append('expiration_date', date);

      setFileLoading(true);
      axios
        .post(
          'https://gee2-api-fb8c03a9d70a.herokuapp.com/api/v1/upload/vehicle-document',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + user.token,
            },
          },
        )
        .then(response => {
          // Handle the response data
          setFileLoading(false);
          if (response.status == 200) {
            showAlert({text: 'Succesful Uploaded'});
            onSuccess?.();
          }
          if (response.status !== 200) {
            showAlert({text: 'Error Uploading IMage', type: 'error'});
          }
        })
        .catch(error => {
          setFileLoading(false);
          // Handle any errors
          showAlert({text: 'Error Uploading IMage', type: 'error'});
        });
    }
  }
  return (
    <View style={styles.inputContainer}>
      <Loader loading={loading || fileLoading} />
      {Alert}
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {isRequired && <Text style={styles.required}>Required*</Text>}
      </View>
      <Text>{description}</Text>
      <View style={styles.upload}>
        {!face && (
          <DatePicker
            onChange={date => {
              setError('');
              const mydate = new Date(date);
              // const newDate=`${date}`.split('T')
              const month = mydate.getMonth() + 1;
              const year = mydate.getFullYear();
              const day = mydate.getDate();
              const toBeSet = `${year}-${month < 10 ? '0' + month : month}-${
                day < 10 ? '0' + day : day
              } 16:34:13`;

              setDate(toBeSet);
            }}
            label="Expiration Date"
            error={error}
          />
        )}

        <Button
          onPress={() => {
            getFile();
          }}
          IconRight={<Icon name="add" size={20} color="#000" />}
          fontStyle={{color: '#000'}}
          style={styles.button}
          label={face ? 'Verify' : 'Upload File'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '700',
    fontSize: 17,
  },
  required: {
    color: 'red',
    fontSize: 12,
  },
  upload: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'lightgray',
  },
});
