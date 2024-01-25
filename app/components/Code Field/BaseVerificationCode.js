import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './stylesBase';

const CELL_COUNT = 4;

const BaseVerificationCode = ({onChangeCode}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const onChange = async (code) => {
    setValue(code);
    if (code.length==4)
    onChangeCode(code);
  

  
  
  }
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>يرجى ادخال رمز التحقق {'\n'} تم إرساله لرقم 002****** </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={onChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

 
export default BaseVerificationCode;
