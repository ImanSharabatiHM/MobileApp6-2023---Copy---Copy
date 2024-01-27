import React, {useState} from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';
import {BleManager} from 'react-native-ble-plx'

const PrintScreen = () => {
  const [printer, setPrinter] = useState(null);
  const startScan = () => {     

    BleManager.startDeviceScan(Null, {
      allowDuplicates: false,
      },
       async (error, device) => {
        setDisplaText('Scanning...');
        if (error) {console.log("ff")
          BleManager.stopDeviceScan(); 
        }
        console.log(device.localName, device.name);
        if (device.localName == 'Test' || device.name == 'Test') {
          setDevices([...devices, device]);
          BleManager.stopDeviceScan();} }, );}
  const connectPrinter = async () => {
   console.log
   ("fffffffffccccccc"); 
   // const printer = await RNZebraBluetoothPrinter .init();

  // const isBluetoothEnabled = await RNZebraBluetoothPrinter .isEnabled();
    // console.log(printer);
    //const devices = await RNZebraBluetoothPrinter .getDevices();

    //console.log(devices);
    if (devices.length === 0) {
      return;
    }

    const device = devices[0];

    try {
      await ZebraBluetoothPrinter.connect(device);
      setPrinter(device);
    } catch (error) {
      console.error(error);
    }
  };

  const printLabel = async () => {
    if (!printer) {
      return;
    }

    try {
      await ZebraBluetoothPrinter.printLabel(printer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        Click the button to connect to the printer and print a label.
      </Text>
      <Button
        title="Connect and Print"
        onPress={connectPrinter}
       // onPress={startScan}
      />
    </View>
  );

   
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default PrintScreen;