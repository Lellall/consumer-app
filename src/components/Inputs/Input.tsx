/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {ReactElement} from 'react';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export interface InputProps {
  onChange?: (e: string) => void;
  label?: string;
  style?: ViewStyle;
  type?: KeyboardType;
  secureEntry?: boolean;
  Icon?: ReactElement;
  IconLeft?: ReactElement;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  onBlur?: () => void;
  onFocus?: () => void;
  id?: string;
  error?: string;
  disabled?: boolean;
  inputStyle?: ViewStyle;
}
function Input({
  onChange,
  label,
  style,
  type,
  Icon,
  placeholder,
  required = false,
  secureEntry = false,
  onBlur,
  onFocus,
  value,
  IconLeft,
  id,
  error = '',
  disabled = false,
  inputStyle,
}: InputProps) {
  const borderWidthValue = useSharedValue(1);

  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [1, 2],
      ['#fff', '#008751'],
    );
    const bgColor = interpolateColor(
      borderWidthValue.value,
      [1, 2],
      ['#fff', '#ffffff'],
    );
    return {
      borderWidth: borderWidthValue.value,
      borderColor,
      backgroundColor: bgColor,
    };
  });

  return (
    <View style={[styles.mainContainer, style]}>
      <View style={styles.labelContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <AnimatedTouchableOpacity
        disabled={disabled}
        style={[styles.inputContainer, reanimtedBorderStyle, inputStyle]}>
        {IconLeft && IconLeft}
        <TextInput
          placeholderTextColor="#000"
          editable={!disabled}
          id={id}
          value={`${value || ''}`}
          keyboardType={type}
          onChangeText={onChange}
          secureTextEntry={secureEntry}
          onFocus={() => {
            if (disabled) return;
            borderWidthValue.value = withTiming(2);
            onFocus?.();
          }}
          onBlur={() => {
            borderWidthValue.value = withTiming(1);
            onBlur?.();
          }}
          placeholder={placeholder}
          style={styles.textInput}
        />
        {Icon && Icon}
      </AnimatedTouchableOpacity>
      {error && <Text style={{color: 'red'}}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  labelContainer: {
    flexDirection: 'row',
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 48,
    width: '100%',
    marginTop: 10,

    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#121D2B99',
  },
  textInput: {
    width: '90%',
    backgroundColor: 'transparent',
    height: 48,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
});

export default Input;
