import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { memo } from 'react';

import Animated, {FadeInDown} from 'react-native-reanimated';
import Text from '../Text/Text';
import Colors from '../../constants/Colors';

type Props = {
  Icon: any;
  title: string;
  route: string;
  onPress: any;
  index: number;
  IconComponent?: any;
  active?: boolean;
};
function ListItem({
  Icon,
  title,
  onPress,
  index,
  active = false,
}: Props) {
  const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <View style={styles.listContainer}>
      <TouchableAnimated
        onPress={onPress}>
        <View style={styles.mainItem}>
          <View style={styles.item}>
            <View style={styles.icon}>
              <Icon />
            </View>
            <Text style={styles.text}>{title}</Text>
          </View>
          {active && (
            <View style={styles.indicator}>
              <View style={styles.mainIndicator} />
            </View>
          )}
          
        </View>
      </TouchableAnimated>
    </View>
  );
}
const styles = StyleSheet.create({
  listContainer: {
    minHeight: 40,
    marginTop: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
    elevation: 5,
  },
  mainItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    marginLeft: 16.5,
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: Colors.general.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  indicator: {
    height: 20,
    width: 20,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  mainIndicator: {
    height: 15,
    width: 15,
    backgroundColor: 'green',
    borderRadius: 15,
  },
});
export default memo(ListItem)