import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {MiniDot} from '../../../../assets/Svg/Index';
import Text from '../../../../components/Text/Text';

interface IProps {
  pending?: boolean;
  canceled?: boolean;
  delivered?: boolean;
  accepted?: boolean;
}

const StatusCard = ({pending, canceled, delivered, accepted}: IProps) => {
  // Define the background color style
  const backgroundColorStyle: ViewStyle = {
    backgroundColor:
      (pending && '#F06D061A') ||
      (canceled && '#E417491A') ||
      (delivered && '#0E5D371A') ||
      (accepted && '#5cb85c60') ||
      undefined,
  };

  return (
    <View style={[styles.container, backgroundColorStyle]}>
      <MiniDot
        color={
          (pending && '#F06D06') ||
          (delivered && '#0E5D37') ||
          (canceled && '#E41749') ||
          (accepted && '#5cb85c') ||
          undefined
        }
      />
      <Text
        style={{
          color:
            (pending && '#F06D06') ||
            (delivered && '#0E5D37') ||
            (canceled && '#E41749') ||
            (accepted && '#2f722f') ||
            undefined,
        }}>
        {' '}
        {(pending && 'Pending') ||
          (canceled && 'Cancelled') ||
          (delivered && 'Delivered') ||
          (accepted && 'Accepted')}
      </Text>
    </View>
  );
};

export default StatusCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    borderRadius: 15,
    padding: 2,
  },
});
