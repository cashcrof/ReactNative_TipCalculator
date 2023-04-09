/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';



function App(): JSX.Element {
  const [bill, setBill] = useState(0.00);
  const [selectedId, setSelectedId] = useState("");
  const [tip, setTip] = useState(0.00);

  const tipValues = [
    { id: '1', value: '10%' },
    { id: '2', value: '15%' },
    { id: '3', value: '20%' },
    { id: '4', value: '25%' },
  ];

  function generateBill() {
    setBill(parseFloat((Math.random() * 300).toFixed(2)));
  }

  useEffect(() => {
    if (selectedId === '1') {
      setTip(bill * 0.1);
    } else if (selectedId === '2') {
      setTip(bill * 0.15);
    } else if (selectedId === '3') {
      setTip(bill * 0.2);
    } else if (selectedId === '4') {
      setTip(bill * 0.25);
    }
  }, [selectedId, bill]);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Tip Calculator App Body */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tip Calculator</Text>
        <Button color="#827081" onPress= {()=> generateBill()} title = "Generate Random Bill"></Button>
        <TextInput style={styles.inputBox}
          placeholder='Cost of Service' 
          onChangeText={(bill)=> {
            let billValue = parseFloat(bill);
            if (isNaN(billValue)) {
              billValue = 0.00;
            }
            setBill(billValue)}}>{bill}
        </TextInput>

          <FlatList 
            data={tipValues}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                style={[
                  styles.tips,
                  { backgroundColor: item.id === selectedId ? '#827081' : '#E3D0D8' },
                ]}>
                <Text style={styles.tipButton}>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
          <Text style={styles.totals}>Bill: ${bill.toFixed(2)}</Text>
          <Text style={styles.totals}>Tip: ${tip.toFixed(2)}</Text>
          <Text style={[styles.totals, {fontWeight:'700'}]}>Total: ${(bill + tip).toFixed(2)}</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputBox: {
    height: 40,
    backgroundColor: '#AEA3B0',
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
  },
  tips: {
    padding: 10,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  totals: {
    fontSize: 18,
    padding: 10,
    textAlign: 'right',
  },
  tipButton: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  container: {
    height: '100%',
    backgroundColor: '#E7E6F7',
  },
});

export default App;
