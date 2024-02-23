import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React from 'react';
import {Rect} from 'react-native-svg';

interface ItemsProps {
  title: string;
  iconAfter?: any;
  iconBefore?: any;
  onPress?: any;
  style?: any;
  disabled?: boolean;
}

export const SettingsCardItem = ({
  title,
  iconAfter,
  iconBefore,
  onPress,
  style,
  disabled,
}: ItemsProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={(styles.container, style)}
      onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.row}>
          {iconBefore}
          <Text style={styles.title}>{title}</Text>
        </View>

        <View>
          <Text>{iconAfter}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  card: {
    height: 46,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    color: '#000',
    fontSize: 16,
    marginLeft: 15,
  },
});
