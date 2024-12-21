import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface ShimmerWrapperProps {
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
}

const ShimmerWrapper: React.FC<ShimmerWrapperProps> = ({
  visible = false,
  style,
  width = "100%",
  height,
  children,
}) => {
  return visible ? (
    <ShimmerPlaceholder
      shimmerColors={[Colors.amber100, Colors.amber400, Colors.amber100]}
      style={[{ width, height }, style]}
    />
  ) : (
    <View style={[{ width, height }, style]}>{children}</View>
  );
};

export default ShimmerWrapper;
