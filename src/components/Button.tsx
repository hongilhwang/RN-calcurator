import {Pressable, StyleProp, Text, ViewStyle, StyleSheet} from 'react-native';
import type {PropsWithChildren} from 'react';

export enum ButtonTypes {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
}

const Colors = {
  [ButtonTypes.NUMBER]: ['#71717a', '#3f3f46'],
  [ButtonTypes.OPERATOR]: ['#f59e0b', '#b45309'],
};

type ButtonProps = PropsWithChildren<{
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonType?: ButtonTypes;
}>;

const Button = ({
  title,
  onPress,
  buttonStyle,
  buttonType = ButtonTypes.NUMBER,
}: ButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: Colors[buttonType][0],
        },
        pressed && {
          backgroundColor: Colors[buttonType][1],
        },
        buttonStyle,
      ]}
      onPressOut={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71717a',
    borderWidth: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 50,
  },
});

export default Button;
