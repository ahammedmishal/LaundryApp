import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import ICON from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

const DropDown = ({data = [], value = {}, onSelect = () => {}}) => {
  const [showOption, setShowOption] = useState(false);

  const onSelectedItem = val => {
    setShowOption(false);
    onSelect(val);
  };
  return (
    <View style={{flex:1}}>
      <TouchableOpacity 
        style={styles.dropDownStyle}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}
        >
        <Text style={{color:COLORS.primary,fontWeight:'400'}}>{!!value ? value?.name : `Men`}</Text>
        <ICON name='ios-chevron-down-outline' size={22} color="#38106A"/>
      </TouchableOpacity>
      {showOption && (
        <View style={{marginLeft:28}}>
          {data.map((val, i) => {
            return (
              <TouchableOpacity onPress={() => onSelectedItem(val)} key={String(i)}>
                <Text>{val.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width:60,
    marginLeft:25
  },
});

export default DropDown;
