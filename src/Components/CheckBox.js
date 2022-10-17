import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ICONS} from '../constants';
ICONS;
const CheckBox = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        {props.isChecked ? (
          <Image source={ICONS.check} style={styles.check} />
        ) : (
          <Image source={ICONS.uncheck} style={styles.check} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  check: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',
  },
});

export default CheckBox;
