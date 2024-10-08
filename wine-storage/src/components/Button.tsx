import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";
type Props = IButtonProps & {
  title: string;
  variant?: "solid" | "outline";
};

export const Button = ({ title, variant = "solid", ...rest }: Props) => {
  return (
    <NativeBaseButton
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={"green.700"}
      rounded={"sm"}
      m={"1"}
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "gray.500" : "white"}
        fontFamily={"heading"}
        fontSize={"lg"}
        fontWeight={"bold"}
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
};
