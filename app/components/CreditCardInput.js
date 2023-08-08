import React from "react";
import { StyleSheet } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";

function AppCreditCardInput({ onChange }) {
  return (
    <CreditCardInput
      autoFocus
      requiresName
      requiresCVC
      required
      requiresPostalCode
      cardScale={1.1}
      allowScroll={false}
      validColor={"black"}
      invalidColor={"red"}
      placeholderColor={"darkgray"}
      onChange={onChange}
      labels={{
        name: "KART SAHİBİ",
        number: "KART NUMARASI",
        expiry: "S. Kul. Tar.",
        cvc: "CVC/CCV",
      }}
      placeholders={{
        name: "Adı Soyadı",
        number: "1234 5678 1234 5678",
        expiry: "MM/YY",
        cvc: "CVC",
        postalCode: "34567",
      }}
      requiresPostalCode={false}
      inputContainerStyle={{
        borderBottomWidth: 2,
        borderBottomColor: "#1b6ca8",
      }}
    />
  );
}
export default AppCreditCardInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
