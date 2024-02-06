import React, { useEffect, useState,useCallback} from 'react';
import { encode } from 'base-64';
import * as IntentLauncher from 'expo-intent-launcher';

import { View, Text, Button ,PermissionsAndroid,Platform,Linking } from 'react-native';
import {   BleError,
    BleManager,
    Characteristic,
    Device, } from 'react-native-ble-plx';
import * as ExpoDevice from "expo-device";
const openAppWithExtras = async (packageName, className) => {
  const extras = {
    transRef: '123456',
    externalCall: true,
    qrCode: '1*1002*100200**25.00*376*551919*20220509**1',
  };

  try {
    await IntentLauncher.startActivityAsync(packageName, { extras, className,packageName });
    console.log('Successfully launched the application');
  } catch (error) {
    console.log('Failed to launch the application:', error);
  }
};
const SendIntentButton = ({action, extras, children}) => {
  const handlePress = useCallback(async () => {
    try {
    await Linking.sendIntent(action, extras);
    // await Linking.openURL('com.pcnc.wallet.ui.SplashActivity');
    } catch (e) {
     console.log(e.message);
    }
  }, [action, extras]);

  return <Button title={children} onPress={handlePress} />;
};

const openAppWithPackageAndClass = async (packageName, className) => {
  const url = `intent://${packageName}/${className}#Intent;scheme=package;end`;

  try {
    await Linking.sendIntent(url);
    console.log('Successfully opened the application');
  } catch (error) {
    console.log('Failed to open the application:', error);
  }
};
const BluetoothScreen = () => {
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [printerDevice, setPrinterDevice] = useState(null);

  const bleManager = new BleManager();
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) 
      {
        console.log("I am hereeee");
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        console.log("OKKKKKKKK");
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };
 
  
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires BLUETOOTH_SCAN",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires BLUETOOTH_CONNECT",
        buttonPositive: "OK",
      }
    );
    console.log("Bluetooth connect permission:   "+bluetoothConnectPermission);
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires ACCESS_FINE_LOCATION",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };
  useEffect(() => {
    console.log("fffff");
    
    checkBluetoothStatus();

    return () => {
      // Clean up when the component is unmounted
      bleManager.destroy();
    };
  }, []);

  const checkBluetoothStatus = async () => {
    const permission = await requestPermission();

    console.log(permission);
    const isEnabled = await bleManager.state();
    console.log(isEnabled);
    setIsBluetoothOn(isEnabled);
    if(isEnabled!=="PoweredOn")
    {
      const res=  await bleManager.enable();
      console.log(res);
    }
  };

  const isDuplicteDevice = async( nextDevice) =>
  deviceList.find((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = async() =>
   bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {console.log(error);}
    console.log(device.name+"   "+device.isConnectable);
    if (device && device.name?.includes("ZebraQ521"))
    //if (device && device.name?.includes("Lenovo"))

    {
        console.log("Zebra printer Found!!!! :)))))");
         
       stopScan();
        setPrinterDevice(device);
        console.log(device);
        connectToDevice(device);
        setDeviceList(prevList => [...prevList, device.id]);
        if (!isDuplicteDevice(device)) {return;}
        return;
    }
      });

  
    const connectToDevice = async (device) => {
        console.log("Will connect to zebraa!!1");
         const deviceConnection = await bleManager.connectToDevice("48:A4:93:A1:92:8D",{autoConnect:true,requestMTU:23});
       
        try {
             console.log("device conn: ",deviceConnection);
          //setConnectedDevice(deviceConnection);
          //const chars =await deviceConnection.writeDescriptorForService("FFFFFFFFF");
          //console.log("Charsss:   ",chars)
          await bleManager.stopDeviceScan();
          console.log(await bleManager.isDeviceConnected("48:A4:93:A1:92:8D"));
          
         
        } catch (e) {
            console.log(await bleManager.isDeviceConnected("48:A4:93:A1:92:8D"));

          console.log("FAILED TO CONNECT", e);
        }
        console.log("The printer was connected successfully!!!");


        const printData = '^XA^FO50,50^ADN,36,20^FDHello, World!^FS^XZ';
        const encodedPrintData = encode(printData);
        
        await deviceConnection.writeCharacteristicWithResponseForService(
           '38EB4A80-C570-11E3-9507-0002A5D5C51B',
          '38EB4A82-C570-11E3-9507-0002A5D5C51B', // Example: Characteristic UUID for ZPL data
         encodedPrintData,
          'DEFAULT',
        )
        .then(() => {
          console.log('Print command sent successfully');
        })
        .catch((writeError) => {
          console.log('Error sending print command:', writeError);
        });
       const a= await deviceConnection.discoverAllServicesAndCharacteristics();
       console.log(a);
       const characteristic = await deviceConnection.characteristicsForService(a)
       console.log(characteristic);
        // sendPrintCommands(deviceConnection);
      };
      const sendPrintCommands = (device) => {
        // Example: Send a simple text command to print "Hello, World!"
        const printData = '^XA^FO50,50^ADN,36,20^FDHello, World!^FS^XZ';
      
        device.writeCharacteristicWithoutResponse(
          '00002A56-0000-1000-8000-00805F9B34FB', // Example: Characteristic UUID for ZPL data
          Buffer.from(printData, 'utf8').toString('base64'),
          'DEFAULT',
        )
        .then(() => {
          console.log('Print command sent successfully');
        })
        .catch((writeError) => {
          console.log('Error sending print command:', writeError);
        });
      };
      const startStreamingData = async (device) => {
        if (device) {
          device.monitorCharacteristicForService(
            HEART_RATE_UUID,
            HEART_RATE_CHARACTERISTIC,
            onHeartRateUpdate
          );
        } else {
          console.log("No Device Connected");
        }
      };
  const scanDevices = async() => {
    const permission = await requestPermission();
    console.log(permission);
    if(permission)
    {
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.error('Error scanning devices:', error);
        return;
      }
       console.log("Scanned Device!!!",scannedDevice);
       if (!deviceList.find(device => device=== scannedDevice.id)) {
         setDeviceList(prevList => [...prevList, scannedDevice.id]);
         return;
       }
    });}
  };

  const stopScan = async() => {
    await bleManager.stopDeviceScan();
  };

  return (
    <View>
      <Text>Bluetooth Status: {isBluetoothOn ? 'On' : 'Off'}</Text>
      <Button title="Scan Devices" onPress={scanForPeripherals} />
      <Button title="Connect Device" onPress={connectToDevice} />

      <Button title="Stop Scan" onPress={stopScan} />
      <Button title="Open PayPal" onPress={()=>
      openAppWithExtras  ('com.pcnc.wallet', 'com.pcnc.wallet.ui.SplashActivity')
} />
      <SendIntentButton action="android.intent.action.POWER_USAGE_SUMMARY">
        Power Usage Summary
      </SendIntentButton>
      <SendIntentButton
        action="com.pcnc.wallet"
        extras={[
          {
            key: 'android.provider.extra.APP_PACKAGE',
            value: 'com.pcnc.wallet',
          },
        ]}>
        App Notification Settings
      </SendIntentButton>
      <Text>Available Devices:</Text>
      {deviceList.map(device => (
        <Text key={device}>{device || 'Unknown Device'}</Text>
      ))}
    </View>
  );
};

export default BluetoothScreen;
