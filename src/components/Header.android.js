import React, { PureComponent } from "react";
import { Text } from "react-native";
import HeaderStyle from "styles/HeaderStyle";

export default class Header extends PureComponent {
  render() {
    return <Text style={HeaderStyle.header}>Restaurant List</Text>;
  }
}
