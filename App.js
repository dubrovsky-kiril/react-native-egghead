/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  FlatList
} from "react-native";
import Header from "components/Header";
import RestaurantRow from "components/RestaurantRow";

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5"
  }
});

export default class App extends Component {
  state = {
    search: null,
    restaurants: null
  };

  componentDidMount() {
    fetch("http://192.168.1.6:8000/restaurants")
      .then(res => res.json())
      .then(data => this.setState({ restaurants: data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Header />
        <TextInput
          style={styles.input}
          placeholder="Live Search"
          onChangeText={value => {
            this.setState({ search: value });
          }}
        />

        {this.state.restaurants && (
          <FlatList
            contentContainerStyle={{
              paddingTop: 30
            }}
            data={this.state.restaurants.filter(place => {
              return (
                !this.state.search ||
                place.name
                  .toLowerCase()
                  .indexOf(this.state.search.toLowerCase()) > -1
              );
            })}
            renderItem={({ item, index }) => (
              <RestaurantRow place={item} index={index} />
            )}
            keyExtractor={item => item.name}
            initialNumToRender={16}
          />
        )}
      </View>
    );
  }
}
