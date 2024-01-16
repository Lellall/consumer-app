import { StyleSheet, Text as AppText, TextStyle } from 'react-native';
interface TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  style?: TextStyle;
  children?: any;
}
export default function Text({ children, h1, h2, h3, style }: TextProps) {
  return (
    <AppText
      style={[
        styles.textStyle,

        {
          fontSize: h1 ? 24 : h2 ? 18 : h3 ? 16 : 14,
          fontWeight: h1 ? 'bold' : h2 ? '800' : h3 ? '600' : '400',
          fontFamily:h1 ? 'Poppins-Black' : h2 ? 'Poppins-Black' : h3 ? 'Poppins-Black': 'Poppins-Regular'
        },
        style,
      ]}
    >
      {children}
    </AppText>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: '#000',
    
  },
});
