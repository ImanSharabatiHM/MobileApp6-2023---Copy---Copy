import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import React, { useState, useEffect } from 'react';



;
export default function BluetoothScreen() {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const zplCommand = `
  ^XA
  ^FO50,50^ADN,36,20^FDHello, Zebra Iman 7-11-2023 !^FS
  ^XZ
  `;
  const sallary =`^XA ^PW812^LL1218^LS0 ^LH0,0 ^FO0,0^GFA,124236,124236,102, ,:
  ::::::::::::::::::::::::::::::::::::::::::::kI0G1GFjY0kI0G1GEjY0jT0G6G
  0G1G8G2G0G3H0G1G8G0GCH0GCjT0jT0G7G0G1GCG7G0G3GAI0G3GCH0GEjT0gG0G4iR0G7G0G1GCG7G0G
  3GFH0G2G1I0GEjT0gG0GEiR0G7G0G1G8G3G0G3G7H0G6H0G1G8GCjT0gG0GEiR0G2H0G8H0G1G3H0GEH0G1G
  8GCjT0Q0G1O0GEiR0G3G0G8GCGFG0G1GBG0G1GEG0G2G1GCG4G2jS0Q0G1G8M0G1GFiR0G3G1G8GDGFG8G1GB
  G0G3GFG0G6G1GCG6G3jS0Q0G3G8M0G1GFiQ0G4G3G1G8GCG7GCG1GBG0G3GFG0G6G0GCG6G3jS0Q0G3GCM0G1GF
  iQ0GCG3G0G8GCG1GEG1GBG0G3GFG0G3G0GCG6G3jS0Q0G7GEL0G1G9GFiQ0G8G3LFGBG0G1GBLFjS0Q0G3GCL0G
  2GCGFiP0G1G8G3LFGBH0G1LFjS0Q0G3GCJ0G7GEG6GBGFiP0G1G8G3LFGBH0G1GFGEJFjS0Q0G3GCI0G7G4G0G3G
  9GFH0G8iM0G1HFG1P0G4jW0Q0G1GCH0G7GEG8G0G9G6GFiP0G1HFG7G8N0G1GEI0GEjS0Q0G1G8G1GFG4H0G7GCG
  1GFG0G5iO0GFGCGFG8N0G3GEH0G1GEjS0Q0G1GFG7GCG0G1GFGEGFG0GFG1G9iO0G3G0GEO0G3G8I0GCjS0Q0G1GCG
  8G0G3GFGDG6GBGCG7G0GAG4nY0Q0G1GCG3G7GFGBGDG6GAGFG1G2G7GCnY0Q0G1G8IFGBGDG6GAGBGDG3GEG6nY0Q0G3H
  FGDGFGBGDG6GAGBGFG6GBG8nY0Q0G3G7GFGDGFGBGDG6GAHBGFGAG8nY0P0G8HFG8GDGFGBGDGFGEHBGFGEG8nY0R0GDG8G1
  LFGBHFG8iL0G7M0G2gV0G6iM0P0G6G3GEG9GBGFG8H0G8G7IFGCiK0G1GFL0G1GFP0G8gJ0G1GEiM0P0G7GBGEG8G2J0G8G1
  IFGChP0G1G8G2O0G3H0G1G8L0G1GEN0G3G9GEK0G1G8P0G6L0G3GEiM0P0G3GBGFG8G3GEH0G3GCG0G7HFGEgJ0G4G0G3H0G
  8G0G2H0G8GCT0G3G8G7K0G6G4H0G3GAO0G1G8H0G2K0G3G9GEGCJ0G1GDG8O0G7L0G1G8iM0P0G6G1GFG8G2G0GFH0G8G1IF
  GEgI0G1GFG0GFG8G3GEG0GFG8G1G9GFG0HFQ0G1GEG7G8I0G3GEGCH0G3GBH0G2M0G6H0G3K0G3G0GDGEJ0G1GDG8L0G6H0
  G7G8L0G6iM0P0GEG1GEGFGAI0G3GFG0G1HFG2gI0G3GFG8HCG7GFG1GFGCG1HBG9GFGEQ0G3GEG3J0G3GEGCH0H3H0G2M0
  GFH0G6H0G6H0G1G0HCJ0G1G9G8H0GCI0G6H0G7G8L0GEiM0P0GFG9GEGCG6G1GCJ0G1HFG3gI0G6G7G9GCGEG4GFH3GCG3G
  7G3G9GFGEN0G1GCG0G3GCG3J0G1G0GEH0H3H0G6M0GFH0G6H0GFH0G3G8GCK0G1G9G8G0G1GCI0G4H0GFG8L0GFiM0P0JF
  N0G3GFG3gJ0G3G9GCGEG0G7G0G1GCG3G7G3G9G0G6N0G1GCG0G1G0G3G0G1J0G6H0G1G3G0G1GFG0G1K0GFG8G0G6H0GEH
  0G7HCGFG0G3G0G2G0G9G8G0G1GCG0G1G8G0GCG0G4L0G1GBiM0P0GFGCH0G3KFH0G1GEG2gJ0G3G9GCGEG0G7G0G1GCG3
  G7G3GCG0GCM0G2G3GCH0H1G0G3H0GCH6G0G3G1G3G0G1GBG0G3G8G6H0G2GFG8G0GCI0G4G3G7GCHFG0G7G8G7G0GDG8
  I0G8G3GCG1GCH0G4G0G1I0G5GFiM0P0GEH0G3MFG8G1GEG3gJ0G3G1GCGEG0G7G0G1G8G6G7G3GCG0GCM0G3G2GCG1G0
  GFG1G0G2H0GCH6G0G3G1GBG0G3GFG0G7GCG6G2G1GEGFG8G0GCG0G2G0G6G3G7GCHFG0G7G8GFG8GDG8G0G4G0GCG3GCG1GE
  G6G1G6G0G3G8G4G3GDGFG8iL0P0G8G0G1KFG7IFG1GCG6gJ0G7G3GCGEG0G6G0G3G8G6G7G3GCG0GCM0G3G7GCG3G0GFG1G8G3H0GC
  G3G6G0G3G1GBG0G3GFG0G7GCG3G2G1GEG7G8G0GCG0G2G0G6G1G7GDGEG3G0GFG8GFG8GDGCG0G4G1GCG3GCG3H6G3G6G0G7GCG6G3
  GCGDG8iL0R0G3IFGBKFG9GCG4gJ0G6G3GCGEG0GCG0G3G0G6G7G3GCG1G8M0G3LFG8G3JFG6G0G1GFGBG0G3OFG8G1G8G0G6G0G7K
  FG0JFHCG0GCG0GCG7GCG3IFGEG0G5KFG8iL0R0G3GFGEGFG9GEG5IFGCG1GCgJ0GCG1GCGEG1G8G0G6G0GCG7G3GCG1G8M0G3LFG8
  G3JFG6G0G1GFGBH0G1NFG8G1G8G0G4G0G7KFG0JFGCG8G0G8G0GCG3GCG3IFGEG0G7KFG8iL0Q0G3GBGFG1JFGCHFGCG3gJ0G1G8G
  DGCGEG1H8GCG6GCG7G3G8G1G8M0G3LFG8G1JFG6G0G1GFGBH0G1GFGBHFGDIFG8G1G8G0GCG0G3KFG0G7GFG7GFGDG8G1G8G0GCG3
  GCG1IFGEG0HFGBIFG8iL0Q0G7GBH7KFGEG7GFGEgJ0G3GFG9GCGEG3GFG8GFHCH3G8G3N0G7GFGCP0G4G0G3G8M0G4K0G3H0GEG0G
  6G2K0G3G8I0G8G1G8G0GCG1GCG0GEJ0GFG8iQ0Q0G3GBG9HFI0JFGEgJ0G3GFG8GDGCG7GFG9GFGCG8G3GBG0G3N0GFG6GCL0G1GC
  I0G8GFN0G6K0G3H0GFGBGEG7J0GCG7K0G1GFG7GEG3GEG1GCJ0GCiR0Q0G1GBGFL0G3HFGCgJ0G7GFG8G7G8HFG3GFGDG8G1GEG0G
  3M0GFGEG7GCL0G1GCI0GFGEM0G3GEK0G3H0G7GFGDGFJ0G7GFL0JFGBGFGCJ0GCiR0Q0G1GBG8M0G7GFG8gX0G2M0G7GCG3GCL0G1
  GCI0G7GCM0G3GCN0G3GFG9GEJ0G3GEL0G7GFG1GFG0GFG8J0GCiR0Q0G1GDG8M0G1GFG8hN0G1G8gY0G8Q0G2K0G4iR0Q0G3GFG8M
  0G1GFG8kM0G4iR0Q0G3GCN0G1GFG8kM0G4iR0Q0G2P0G3GCo0gI0G4o0,::::hJ0G2kN0HChO0hJ0G3G4G2G0G1G2jT0G3L0G2G0H
  CG0G4hM0hJ0G3GEG7G0G3GFjO0G7GCI0G3G8J0GCG7H0G5G8GCH0G4H0G2hG0hJ0G3G4G2G0G1G2jO0G7G6I0G3G8J0G4G2G0G2GF
  G8G4G0H6H0G6hG0hJ0G3G6H0G1G2G7I0G4G1GFG8jH0G6I0G2J0G3G4H0G6GFG8H0GEG6H0G2hG0hI0G6G3GFG3G0G1GBG7G8G7G0
  GCG3GFG0GCI1G8iV0G1GEG2G0G8G0G4G0G4G0GFGCG3G0G3GFG8G4H0G6G3G8GBhG0hI0G7G3GFG3H1GBG3GCG7G0GEG1GEG1GCG1
  G9G3G8iV0G1GEG3G0GDG9GCG0G4G9GFGCG3G0G3GFG8G6H1GEG3G8GBhG0hI0G7IFH1JFG1GEH3GFGEG1HFGCiT0G2G1IFG0HFGCG
  0G7JFG1IFGEG3G1JFhG0hI0JFH1JFG0GEG2G3GFGEG1HFGCiT0G2G3IFG0HFGCG0G7JFG1IFGEG2G0IFGAhG0hI0GEI0G1GFG8J0G
  6G2GCH0G1GAiV0G6G7G8G0G4G1GCI0GEO0G3G1G8G0G1G8hG0hI0G8I0G1GFJ0G7GCG3GCG0G1GFG6iV0G6G7H0GEGFG8H0G7GCO0
  G3GFG8G0G3G8hG0hI0GCJ0GEJ0G3G8G3G8G0G1GEG6iV0G7GFH0G6GFI0G7G8O0G1GFH0G3G8hG0hI0GCQ0G1GFG8iY0G3GCiK0hV
  0GFjG0GCiK0,:::iJ0G3lY0iJ0G3gT0G2H0G1L0G1iS0G6g0hO0G1G9G8R0G3gP0G1I0G2H0G1GAG1G8I0G1G8G0G1GCK0G8L0G8G
  1GAhI0G2G0GCG3G8GFG8I0H6I0G1GAH0G7R0hO0G1H8R0H3G8gM0G3G1I0G2H0G1GAG1G8I0G1H0GFG9GCG3G8G0G4G8H0G3G8G0G
  6G8G0GAhI0G6G1G6G7GCGFG8I0G6G2GCI0GBH0G4R0hP0GCG8O0G3H0G1G2gN0G7G1I0G2I0GAG1G8I0G1H0GBG1G0G3I0H8G0G3I
  0G8G4GBhI0G2H3G4GCG1G8J0G2J0GBH0G6R0hP0G6G8G3Q0G1gP0G1I0G2I0GAG0G8I0G1G8G0G3G8K0G8GCG1G8I0G8G6GBhI0G2
  H3G0GCG1G0G1H0G3G2J0GBH0G7R0hP0G3G0G3H0G3GCH0GFH0G4H9G1G8gL0G2G0G3G8G6G1GBGFG0GCGBG0G8GBGCG0G5G8G6G5G
  CG4G1G8G1G2GCG4G1G9G8G1G3GCG2GBhI0G2H3G0GCG1G0G1G2G0G7G3GFG0HCGBH0G7G0GCP0hP0G3K0GEG2G3GFH0G4GBGDG0G8
  gL0G2G0G3G8GEG1GFG7G1GCGBG0G8GCGEG0GEG8GEG4G6G4G3GCG1G2GCG4G0G3GCH1GCG2GBhI0G2G1GFG0G8G3H0G2G0G7G3GFG
  1GDGEGFG0GFG7G0G4P0hP0G3I0G1KFH0G7GFGDGFG8gL0G3JFG1JFGBG0IFG0GFG8IFGCG3GCG1GEGFGEG0G3GCG1GFGDHFhI0G2G
  0G3G1G0G2H0G3JFG1HFGDG0G7GFG0G4P0hP0G7H0G2G3KFG1G0G7GEGDGFG8gL0G1GFGEGFG6G0GFGDGEGFG8G0IFG0G7G8G7HFGC
  G3G8G1GEG3GCG0G3G8G1GFG1GFG8hI0G2G0G6G2G0G2H0G1JFG0GEGFG8G0HFG0G4P0hP0G6G0G3G6G7G8J0G1G8GCG8gU0G8L0H8
  G0G4G0G6K0G3I0G1G8G0G3hM0G6G0GCG7GCG6G0G3L0GCH0G1G8H0GCP0hR0G1G3GFG8J0G1HFG8gT0G3G8K0G3H8G1GCG1GCK0GF
  I0G1G8G0G7hM0G7G1G8G7GCH0G1K0G3G8I0G8G0G3GCP0hS0G3GFL0G7gV0G7O0G3G8G1G8J0G1GCK0G1GCi0G3J0G8G0G7Q0hT0G
  ElU0G8S0,::::K0G1G8T0G1iR0G2H0G8K0G6J0G4K0G1K0G4K0G2hS0G1G8I0G4I0G8T0K0G3G9GCG3G8K0G1GCJ0G7H0G6L0G3T0
  G3G8M0G1G8G0GCG0G3G1GAgQ0G2H0GEK0G6G0G4G0G1GCK0G1GAI0G1GCJ0G3GEGCgV0GCG1GCG1G0G6G0GCG7G0GCG1GCGFG8G0G
  3G8I0G6G8G0G3GCT0N0G2L0G3GEM0G6L0G7G8S0G7GCL0G3G1G8G2GCG0G3G9GAgQ0G2G4G6GFK0G6G1GCN0G1GAI0G1L0G2GCgU0
  G1G2G3GCG3G8GCG1G8GDG8GCG3GCGFG8L0G6G8G0G1U0L0G8G0G1G9G8K0G6J0G1H0G2M0GCT0GCL0G6G1G8G0G4G0G1GDG2G0G2gO
  0G2H0GFK0G2G0G8H0G4K0G1GAJ0GCK0G2GCgU0H3G2G0G3G9G8G3G1G9G8GCG6G0G1G8H0G8I0G2G8G0G1G8T0K0G1G8GCGBG9G8K0
  G6J0G3G9GEG2M0GCT0G4J0G3H0G1G8G0H4G0G5G2G0G3G2gN0G3H0GFK0G2J0GEG2J0G4GAI0G1GCG1G8H0G3GAGCgU0G1GAG7G8G5
  GBGCG6H9G8GCG7G8G1G0G3G1G8I0G2GCG0G1GCT0K0G3G9GCGFH8K0G4J0G7GBGEG2G0G2K0G8J0G1G0H6L0GCJ0G3G2G0G3G8G3G4
  GFG0H3G0G1G2G0G3GCG1G8gH0G2G3GFG2G7H0H4G6G3GEG6G3G1GEG7G8G3G0G2G4GBG0G4G0G5GEG1H8G0HBG4gU0G1GCG1GCGDGB
  GFG7GDG9G8GCG1GCG1G0G1G3G8GCG2G6G2GCG0GBGCG3S0K0G3GDGCGFGCG4K0GCJ0G7GBG1H2G6J0G1G8J0G3G8G6G2L0G8K0G2G0
  G3G8G1G4G3G8H3G0G1G2G4G7GEG0G8gH0G7G3GFG2G7H0G6G4H7GFG6G7G1GEG1GCG7G8G2G4GBG0GEG4HEG0G1GCG9HBG4gU0G1GE
  G0GCG9GBG3H6GFG8GCG0GCG3H0G7G8G4G7GEG2GCG1GDGCG1S0L0G7IFGCK0G8K0HFG3HFJ0G1K0G3GCG7GEK0G1L0G3GFGEG8G1G7
  GFGCG7G3G0JFGEG0G8gH0G7JFH0G3GCG7HFGEG7G0G3IFG8G3GFGAG0IFGEG0G1JFG4gU0H3G0G5HFG3H6G1G8GCG0G4G2I0GFGCG7
  GFGEGCG1GFGCG1S0L0G7HFGBG8J0G1L0G7GCG1GFGEJ0G2K0G7GCG3GCK0G2L0G1GFGEG0G1G3GFGCGFH0JFGCG0G8gH0JFGCH0G7G
  CG3HFGCG3G0G1HFG9G0G3GFG8G1IFGCG0G3IFGEgV0H3G0G4G1GBG3H6G3G0GCG0GCG2I0G7G8G3GFGEG0G3GFGCG1S0N0G8L0G3GE
  T0GFGCJ0G4G0G2G4K0G7GEJ0G3J0G3G0G2G0G6I0G2I0G1G8gH0G8L0G4GCG2I0G3H0G2I0G6H0G1J0G1GAh0G1GAG6GCG1G9GAG2G
  CG6G0GCG7G8G6G0G3H0GCG3GAH0G2H0G3S0M0G3G8L0G3GCT0G7G8J0G4G0GFGCK0G7GCJ0G1J0GEG0G6K0GEI0G7gI0G8K0G3GDGC
  GEI0GEH0G3H0G1GEGCG0G1K0G2hG0G8G7G0G1G0G8G1G0GCG0GCG7I0G1G0G3G8HEH0G2H0GES0gW0G2G1G8V0G1GCQ0GEgI0G8K0G
  7G8G0G8I0GCK0G3G8I0G8J0G2i0GCI0G2G0G1GCS0gW0G2iY0G8jL0,::::hY0G8G0G6i0G1G8I0G1G8hQ0G1G8M0G8G0G6G2H0G3N
  0hJ0G6G1GCG3G0GCL0G5H0GDG0GEi0G3G8H0G1G9GAhM0G1I0G3L0G1G8GFG0GEG3G8G0G3G4M0hJ0G6G3H6G9GEG2J0G1GDH0GDK0
  G4i0G1GCGAhL0G1G7N0G1G8G1GCGBH0G3G8G0G1G4M0hJ0G6G3G2GCGDG6G4J0H1H0GDG0G2iG0G8H0G1G8GAhR0G8K0G1G8G9G0G2
  G3G8G0G1G6M0hJ0G6H3GCGDG6G4G0G3H0G2G5H0G5G0G6G1hX0G1G9G8G5G8H0GAhH0G1GFI0G1H0G3G1G8I0G1I0GDG0G6G3G8GCG
  1G6M0hJ0G6H3GCGDGEG8G0G1G2G0G2G5G0G2G5G0GFG1G8G2G6hU0G1GBG8G7GCG0G4GAhH0G3GFG0G6G0H9G8G1G3G8GCG0G7GBGC
  G0G2GDG0GEG3G8GFG1G6M0hJ0G6H3HCG1G3G8G0G2G0G2G5G0G3G5G0GFG0GAG6G2hV0G3GCG7GCG4HEhH0G1GCG0GEG0GDGBGCG0G
  7G8G5G9GDG8GEG6GEG5G1GFG1G8G3G9G6M0hJ0G6H3HCG3G6G8G0G3HFGDG0G3GDG0G1IFGEhW0G7JFGEhH0G1H0GEG0HFGCH0NFGD
  G0G3JFGAM0hJ0G6G3G2HCG2G6G8G0G1HFGCG0G3GCH0HFGBGChW0G7GEG7GBG7G8hH0G2G6G0G6G0GFGCG8H0G7MFG8G0G1GEG7HFN
  0hJ0G6G1GEG7G8G4G7G8G3G0G2I0G6iH0G1G8G0G8hL0H2G0G6G1G8H0G3H0GCgG0hJ0G6K0G3I0G2H0G3GEI0G3iG0GChL0G2G0G1
  GCGFG8J0G3G8gG0hW0G3G8kR0G3G8G1G0GEgN0nQ0G1GFgQ0,::::hN0G1K0G3I0GAH0G8G1gH0G7g0GCI0G3G0G2S0G1GChM0GEG1
  GCK0G1G8G1GAH0GCJ0GCO0hN0G3GCG6I0G3I0GAH0GCG1gH0G6O0G1O0G1G8H0G8G1G0G2S0GDGEhM0GFG3G8L0G8G1GAH0G4J0GFO
  0gK0G1GFG8W0GFGCH0GCG6I0G1I0GAH0GCG1G0H1I0G1GFG8R0G1P0G1J0G7IFG8G4G0G1KFG8G1HFH0G1HFG1G8G0G1HFhM0GDG6M
  0G8G0GAH0G4G8G1H0GFO0gK0G1GFG8K0G2Q0GFGCH0GCG6G0G1G0G1I0GAH0GCG1G0G1H9G8G0G1GFG8R0G1GBG3O0G8I0G7JFG6GC
  LFGBG9HFH0G1HFG3G8G0IFGEhL0G5G7H0G1J0G8G0GAH0G4GCG3H0G7O0gK0G1GFG8K0GEQ0GFGCG0G1GCG6G0G3G0H1GBGCGFH0GC
  G5G8G0G8GFGCG0G1GFG8N0G2G0GCG8G0HFG8N0G8I0G7JFGBNFG9HFH0G1HFGAG0G1JFgY0G4G0G1G3G0G8G2G5G3G8GCG3I0GCGBG
  8GBH0G4GEG0G8G4G7O0gK0G1GFG8J0G3GEQ0GFGCG0G7GCG6I0G1G3GBGCGFG0G7G4G5G8G0G8G6H0G1GFG8N0G7G0HCG0GFGCO0G8
  I0G7LFG9KFGCG1HFH0G1HFG3GEG7JFG8gX0G6GCH3G0GCG7G5G0GCG4I0G1GCGFG8GBH0G5GEG1GCGEG7O0gK0G1GFG8J0G7GEQ0GF
  GCG0GFGCG6H0G2G1JFG0G7GFGDG8G7HFGEG0G1GFG8M0G7GFG0GFGCG7HFGCN0G4I0G7VFG8G0G3HFG1GCKFGCgW0G8G7GEG3GFG0G
  4G7GDHFGCH0G1JFGBG0G8G7GFG1IFO0gK0G1GFG8J0G7GEQ0GFGCG0GFGCG6H0G2G1IFGCG0GFG7GCG0G7HFGCG0G1GFG8L0G8HFG0
  GFG8G7HFG8N0G4I0G7GEH0KFGAG1GFGDGFGDHFG8G0G3HFG3G0IFG9GFGEgX0G3GCG3GFG0G4G3GDHFGCG0G2G3JFG8G0G8G7G6G1H
  FGCO0gK0G1GFG8J0G7GEQ0GFGCG0GFGCG6G0H3GFK0G8N0G1GFG8K0H1GCH0G4G8R0G4I0G7GEH0G7GFG0G1GFGBGFI0G1HFG8G0G3
  HFGAG1GFGEH0G7GFgV0G1G8G4G0G1H0GCG3J0G1G2G3G8K0GFGCH0GCQ0gK0G1GFG8G7GEH0G7GEI0G1GFG8G0GFGCH0GFGCG0GFGC
  G6G0G3G7GEK0G8G1GCH0G3GFH0G1GFG8K0G7GFGCG0G1HFGEK0GFGCG0G7GEK0G7GEH0G3GFG8G1GFG9GEI0G1GFG7G8G0G7GDGFGA
  G3GFGCH0G3GFgW0GFGCG0G3GFG1G8G6H0G1G8I3G8K0G7G8G0G1G8Q0gK0G1GFGBHFG0G3HFGEG3GEG7GFGEG3HFH0GFGCG7HFGCG0
  G3HFGCG0G1JFG0G7GCG7GFGCG0G1GFG8J0G3HFGCG0G3GBHFGCG0G1GFG3HFG1HFG8J0G7GEH0G1GFG8G1GFG8J0G1GFG7GCG0G7GD
  GFH3GFG8H0G3GFG8gV0GFG8G0GEG4GFG1GCK0G3GFO0G7R0gK0G1JFG8G3HFGEG3GEIFG7HFG8G0GFGCG7HFGCG0G7HFGEG0G1JFG0
  G7GDHFGEG0G1GFG8J0G7HFGEH0G7HFGEG0G1GFG7HFGBHFGCJ0G7GEH0G1GFG8G1GFG8J0G1GFG7GCG0G7GDGFG3HFI0G1GFG8hP0G
  EgH0gK0G1JFGCG3HFGEG3MFG8G0GFGCG7HFGCG0JFG0G1JFG0G7JFG0G1GFG8J0JFH0JFG0G1MFGCJ0G7GEI0GFGCG1GFG8J0G1GFG
  3GCG0G7G9GFG0HFI0G1GFGCiS0gK0G1HFG1GFGCG3HFGEG3GFGCG3GFGEG1GFGCG0GFGCG7HFGCG1GFGCG3GFG8G1JFG0G7GFGCG7G
  FG0G1GFG8J0GFGCG3GFG0G1GFGCG3GFG8G1GFGEG1HFG0GFGEJ0G7GEI0GFGCG1GFG8J0G1GFG3GEG0GFG9GFG0G7GEJ0GFGCiS0gK
  0G1GFGCG0GFGEG0G7GEG0G3GFG8G1GFGCG0GFGCG0GFGCG0GFGCG0G3GFG8G1GFGCI0G7GFG0G7GFG8G3GFG8G1GFG8I0G1GFG8G3G
  FG8G3GFG8G1GFGCG1GFGCG0GFGEG0G7GEJ0G7GEI0GFGCG1KFG0G1GFG3GEG0GFG9GFG0G7GEJ0GFGCiS0gK0G1GFGCG0G7GEG0G7G
  EG0G3GFG8G1GFGCG0GFGCG0GFGCG0GFGCG0G3GFH0GFGCI0GFGEG0G7GFG0G1GFG8G1GFG8I0G1GFG8G1GCG0G3GFH0GFGCG1GFGCG
  0GFGEG0G7GEJ0G7GEI0GFGCG1KFG0G1GFG1GEG0GFG1GFG0G7GEJ0GFGCiS0gK0G1GFG8G0G7GEG0G7GEG0G3GFG0G1GFG8G0GFGCG
  0GFGCG0GFGCG0G3GFH0GFGCH0G1GFGCG0G7GEG0G1GFGCG1GFG8I0G3GFJ0G3GFH0GFGCG1GFG8G0GFGCG0G7GEJ0G7GEI0GFGCG1K
  FG0G1GFG1GEG0GFG1GFG0G7GEJ0GFGCiS0gK0G1GFG8G0G7GEG0G7GEG0G3GFG0G1GFG8G0GFGCG0GFGCG0GFGCG0G7GEH0G7GEH0G
  3GFG8G0G7GEH0GFGCG1GFG8I0G3GFJ0G7GEH0G7GEG1GFG8G0GFGCG0G7GEG0G2H0G7GEI0GFGCG1KFG0G1GFG1GFG1GFG1GFG0GFG
  EJ0GFGCgT0G1H0G4I0G2gQ0gK0G1GFG8G0G7GEG4G7GEG0G3GFG0G1GFG8G0GFGCG0GFGCG0GFGCG0G7GEG0G3G7GEH0G3GFG4G8G7
  GEH0GFGCG1GFG8I0G3GFJ0G7GEH0G7GEG1GFG8G0GFGCG0G7GEG0GEH0G7GEG0GDG0GFGCG1KFG1G3GFG1GFG1GFG1GFG3HFGBG4H0
  GFGCgQ0G8H0G7H0G6G0G1G0GEV0G3G4S0gK0G1GFG8G0G7GEGCG7GEG0G3GFG3G1GFG8G0GFGCG0GFGCG0GFGCG0G7GEG0G3G7GEH0
  G7GFG5G8G7GEH0GFGCG1GFG8I0G3GFJ0G7GEG0GCG7GEG1GFG8G0GFGCG0G7GEJ0G7GEG0GDG0GFGCG1GFG8G0G8G0G7G3GFG0GFG1
  GEG1GFG0G7GEGBG4H0GFGCgQ0G8H0G4H0G4G8GFK0G2P0G2G1GFG4S0gK0GDGFG8G0G7GEG5G7GEG0G3GFG6G3GFG8G0GFGCG8GFGC
  G0GFGCG0G7GEG0G1G7GEG4G0GFGEG4G8G7GEH0GFGCG1GFG8I0G3GFJ0G7GEG0G4G7GEG1GFG8G0GFGCG0G7GEG0G2H0G7GEG4G5G0
  GFGCG1GFG8G0G4G0G5G3GFG0GFG1GEG1GFG0GFGEG1G4H0GFGCgQ0G8H0G1H0G6G8G9G0G2H0G1H2O0G2H1G4S0gK0G5GFG8G0G7GE
  G5G7GEG0HFG0G3GFG8GCGFGCG8GFGCG0GFGCG0G7GFG0G1G7GEGCG1GFGCG4G8G7GEH0GFGCG1GFG8I0G3GFJ0G7GEG0G4G7GEG1GF
  G8G0GFGCG0G7GEG2G3H0G7GEG6G5G0GFGCG1GFG8G0G6G0H1GFG0GFGBGEG1GFG9HFG9G4G0G1GFGCgQ0G8H0G3H0G2G0G1G0G3H0G
  1G8G7G0G1O0G1G4S0gK0G1GFGCG1HFG5G7GEG7HFG3G1HFGEGFGCG1GFGDG0GFGEG0HFG0G1G7GEG2G3GFGEG6G8G7GEH0GFGCG1GF
  G8I0G3GFJ0G7GEG0G6G7GEG1GFG8G0GFGCG0G7GEG2GFG3GCG7GEG3G5G9GFG8G1GFG8G0GEG3G7G1GFG0G7GBGCG1GFHBGFGDG6G0
  G1GFG8gM0G6G1H0G9GEG0G7G0G6G3GEG7G0GFI0GBG7G8G3G0G1G0GFH0GEGFG0GDG6S0gK0G1GFGEG0HFG5G7GEG7G3GFG7G9HFG0
  GFGCG3HFG2GFGEG0G7GEG0G1G7GEH7HFG2G8G7GEH0GFGCG1GFG8I0G3GFJ0G7GEG0G2G7GEG1GFG8G0GFGCG0G7GEG0GFG0GEG7GE
  G1G5G9GFG8G1GFG8G1GEH3G1GFG0G7GBGCG1GFG7HFGDG6G0G3GFG8gK0G6G0G2G3G2G6G8G7G0GFG0GEG7GEG7G0GFG1G3G0G9GFG
  8H0G1G9GFG2G3GFG7G8G5G6S0gJ0G2G1GFGEG0IFG7JFG7KFGCG1JFGEG0G7GFG2G1GFGCG7IFGEG8G7GFH0GFGCG1GFG8I0G3GFG0
  G1GCG0G3GFG0G2GFGCG1GFG8G0GFGCG0G7GEG0G1HFG7HFGDG9GFG8G1GFG8G0G3JFG0G7GFGCG1GFG0IFG6G0G3GFG8gK0G3GFGEG
  3JFG8G1KFG0G1KFG8G0G2G0NFG6S0gK0G1GFGCG0IFG7JFH7HFGEGFGCG1JFGEG0G7GFG2G1GFGCG7IFGEG0G7GFG0G1GFG8G1GFG8
  I0G1GFG8G1GFG8G3GFG0G3GFGCG1GFG8G0GFGCG0G7GEG0G1IFGEGFGCG3GFG0G1GFG8G0G1GFGEHFG0G3GFG8G1GFG0G7HFH0HFgL
  0G3GFGEG3GFGEG7GFGCG0JFGCG0G1HFG7GFGDG8G0G2G0NFT0gJ0G6G1GFGCG1GFGEG0G7GEG0G3GFG0G1GFGEG0GFGCG3GFGDG0GF
  GCG0HFGBHFGCG3GFGCI0G7GFG8G1GFG8G1GFG8G1GFG8G1GFG8G3GFG8G3GFG8G1GFGCG1GFG8G0GFGCG0G7GEG2I0G7GEH0HFG0G1
  GFG8H0G2G0G1GFG0G3GFG8G1GFG8G0HFG8G3GFGEgO0G1Y0G3G2G1gH0gJ0G3HFGCG3GFGEG0G7HEG3GFG0G1GFGCG0KFG0GFGCG5G
  DGFGDHFGCG7GFG8I0G7GFGCG7GFG0G1GFG8G1GFG8G0GFGCG7GFG0G1GFGCG3GFG8G1GFG8G0GFGCG0G7GEG2H0G8G7JFGEG0G1KFG
  CG1GFG0G3GFG8G1GFG8G0KFGEgM0G6G0G7Y0G1G3GFgH0gJ0G1HFG9GEG7GEG0G7GFGEG3GFG0G1GFG8G0HFGCGFGEG0IFG0JFG9KF
  G8G7JFG0G1GFG8G1GFG8G0JFH0JFG0G1GFG8G0GFGCG0G7GEJ0G7JFGCG0G1KFGCG1GFG0G3GFG8G1GFH0G7JFGCgO0GEg0G1GEgH0
  gK0G1GFG8G0G7GEG0G3GFGEG3GFG0G1GFG8G0GFGCG0GFGCG0G7GFGCG0G7HFGEG0G3JFG8G7GEHFGEG0G1GFG8G1GFG8G0G7HFGEH
  0G7HFGEG0G1GFG8G0GFGCG0G7GEJ0G7JFG8G0G1KFGCG1GFG0G1GFG0G1GFH0G1JFiU0gK0G1GFG8G0G7GEG0G3GFGEG3GFG0G1GFG
  8G0GFGCG0GFGCG0G7GFGCG0G3HFGCG0G3JFG8G7GEG7GFGCG0G1GFG8G1GFG8G0G3HFGCH0G3HFGCG0G1GFG8G0GFGCG0G7GEJ0G7J
  FH0G1KFGCG1GFG0G1GFG0G1GFI0IFGEiU0gK0G1GFG8G0G7GEH0GFGCG3GFG0G1GFG8G0GFGCG0GFGCG0G1GFG8H0G7GEH0G3JFG8G
  7GEG3GFH0G1GFG8G1GFG8H0GFGEJ0G7GEH0G1GFG8G0GFGCG0G7GEJ0G7IFG8H0G1KFGCG1GFG0G1GFG0G1GFI0G1HFiV0iI0G7GEl
  Y0iI0G7GEiI0G8iU0:iI0G7GEhG0G7U0G3G8I0G6G8G4gP0G1G8I0G5G8S0G3G8G0G1G8G0G1G8V0iI0G7GEX0G7G8GEN0GCK0G6K0
  G6N0G3GCK0G3J0GEGCG5G8gO0G1GAI0G5G8S0G3G0G8G1G2H0GAV0iI0G7GEX0G5G9GBN0GEK0G6L0G1G8L0G2GEP0G4GEG5G8gO0G
  1GAG3H0G4G8V0G1G2H0GAV0iI0G7GEY0H9N0GCK0GEK0G1O0G6L0G8H0G2G6G2G4G8gO0G1G8I0G4G8S0G1H8G1G8H0GAV0iI0G7GE
  R0GCK0G1GBG1G8K0G2L0G1G6K0G3G0G8M0G6J0G1G9G8G4G0G3GEG1G4G8gP0GBG1H0G4G9G8J0GFG8H0G1H0H3G9GCG8GBH0GAV0i
  T0G3G0HCK0G3GBG1G8J0G3G6G0G1J0G1G6K0G7H8G1L0G4K0G3G8G6GEG1GFG1H8gN0G3G8GFG9H0G6GBGEG3G8G6G1GFG8GCG0H9G
  8G1G7G9GCG8GFG8G6GEV0iT0G7G8GEG4L0GFG1G8J0G3GEG3G7J0G3GFK0G7G8GBG7L0GCK0G3GCG7GEG1GFG1H8gN0G3IDG0G8G6G
  CH7GCG7G0GFG9GEG0GDGBGCG0G3GDGCHDG8HEV0iT0G7G8GFGCL0GDG1K0G1IFJ0G3GFL0IFL0G8L0G7JFG3H8gN0G3IFG0G8G7IFG
  CG7G0G9GFGEG0HFGCH0JFG8GFGEV0iT0GEG0G6M0GDGBK0G3GEM0G6T0G3R0G3G8gO0G7J0GCGEJ0G3G1G2I0GCH0G1L0G6W0iT0G8
  G0GDGCK0G7G8GEK0G6GFM0G6T0G3GEJ0G1G8G0GCgT0G4J0GFGCJ0G6G1G2H0G1GBH0G3H0G3G8H0G4W0iT0G4G3G9S0G3GEG6gP0G
  1G8gT0G4O0G1GCG1G8H0GFG3K0G3H0G3GCW0iT0G4U0G1G8iM0G6Q0G1GFG8G0G6gN0nR0GFG8gP0,:::nU0G2gN0nK0G1GCG0GCG4
  H0G7G1G0G3J0G3G8I0GCX0nK0G1G8H0G4G0GCG6G1G0G3G4I0G2G0G1G8G0GFX0nP0GFG8I0G3G4K0G3G8G0G5X0nL0G4G0G2G6H0H1G0G1J0G1G8I0G5X0nL0GEG2G3GEG4GCG7G3H9G7H0H3G8GCG8G2G5X0nK0G1GEG2G1GEG4GCGFG3H9GFG0GCG0G7G8GCG8G2G5X0nK0G1GEG3G9GFG6GCG7GBGDHBG9GCG0G3HCG8G3G7X0nL0G3JFGCG0JFG0GCH0G7GFG8G3GFX0nX0GCG1J0G3Y0nM0GEL0G3G8H0GC
  G3G0G1G8G0G6Y0nM0GCL0G2H0G7G8I0G8G3GCY0oI0G1g0,:::::hW0G2R0G1iM0G1R0G8hR0gG0G3G0GEG0G8G3G8gO0G3G8H0G1G8GD
  J0G2G0G1GAhY0GCL0G1GAK0G2G0G3G9H0GDhR0gG0G7H9G1G8G7G8gO0G3G8H0G1GCGDI0G3GAG0G1GAhW0G1G8GCK0G6G1GAJ0GCG2G0G1GDG8
  G0G9hR0gG0G1H9G0G8G0G8gO0G3G8I0GEG9I0H2G0G1GAhW0G3G8GCL0G1GAI0G1GCG2H0G6G8G0G9hR0gG0G1G9GFG0G8G0G8gO0G3G8G0G2G0G2G9I0G4G2G0G1GAhX0G1GCK0G4G1GAK0GAH0G3H8GDhR0gG0G3G8GEG0G8G1G8gO0G3G8H7G8G3G9G0G4G0G5GAG0GCGAhV0G1G0G1GCH6G0G1GEGFG0GAG0G1H8G0GFG0GCG1G9GEGDhR0gG0G1G8GFG0G8G1GCgO0G1G8GFG1GCH1G0G4G0G4GAG0G4GAhV0G1G8G1GCG2GFG6G7G6G3G8GAG0G3G8GCG0G7G0GCG3G9GCG5hR0gH0GDG9H8G0GCgN0G3JFGEG3G9G0G7HFGAG0G7GAhV0G1PFGAG0G3G8HFGEG0GCG6HFGDhR0gH0H9H8G0GCgN0G7GEG7G3GFGEG7G8G0G3HFG8G0G7G8hW0G7GFG3GFG3KFG8G0G1G8G3GFG8G0GFGCH7GChR0gG0GFH9G0GCG6G8gM0G6G7I0G3G0G2I0G4I0GCiG0G6N0G1G8J0GChV0gG0G6I0G8G6gN0G7GFI0G3K0G4H0G7G8iG0GEN0G7J0G3G8hV0hU0G3GER0G7iQ0G6J0G3hW0hV0GCmM0,::::::Q0GFI0G8H0G1T0G4L0G1GAgO0G8GDI0G6G2G4W0G8G1I0G8K0G4G0G8J0G1iY0G1H0G2L0P0G1GFG8GCG3G0G1GEG3S0G8G4K0G2G1GAR0G3GCS0G1H8G3I0G7G3G4V0G1GEG6GCG6G1GEJ0G1GEG1G8G0GFG1GEG3GCGFiW0G1H0G6L0P0H1G0GCG6G0I3R0G3G8G4K0G2G1GAR0H6S0G3H8GDG0G1G8G3G2G4W0G6G4GCG6G0G6K0G3G1G8G1G9GBG2G6GDG9iW0G1H0G6L0Q0H1GCG6G0H3G1T0G4L0G1GAR0H6U0G8GFI0G1GAG4W0G2G6GCG6G0G6K0G3G0G8G1G9GBG3G6G7G9G8iV0G1H0G2L0Q0G3G2GCGFG8H3G1Q0G1G0G1G4G6G2G0G1GEGFG0GAR0H6T0G3G9GFH0G7G0GEG4W0G6G3G8G6G0G4K0G6G0G8G1G9GBG3G4G7G9G8iV0G1H0G2L0Q0G2G6ICH3G1Q0G1G0G1GCG2G7G0G3GEG7G8GAR0H6R0G1G0G1G8GFH1GFG8H6W0GEG3G8G6G0GEK0G7G0G8G1G9GBG3G4G7G9G8iU0G4GFG1G2GAL0Q0G2G7GEHCH3H1GEO0G1PFGAR0H6R0G1MFG8G6G4W0G3G4GCG6G0G3K0G3G0G8G1G9GBG3G4G7G9G8iT0G7JFGAL0Q0G6G7GEHCH3H1GEP0HFGBMFGAR0H6R0G1HFG7GEIFG9GEX0G3H4G6G0G2K0G1G0G8G1G9GBG3G6G5G9G8iS0G8HFGEHFGAL0Q0G4G0GCG4GDG9G2G1L0G3KFGCG3KFH0G1HFI0G7KFG8G0G2G4H0G7GFI0G3GFG8H0G7GCG0JFG0G1GCI0G3IFGCI0KFGCG7GEG6GCG6G3GFG0KFGCG8GFGDG1H6GCGBG0G1HFI0G1JFH0G1HFH0G1HFG0G3KFG0G3GFG8H0G7GCG1KFGEL0HFG8I0GFGEH0G1GF
  G0G3GFJ0G7GFI0GBGFG8P0Q0G4G0G4G3G9G8GCG3G8K0G3KFGCG3KFH0G7HFGEH0G7KFG8G0G1G8H0HFG8H0G3GFGCH0G7GCG0JFGEK0G3JFG8H0KFGCG7GFG3G8G6G7GFG0KFGDGCGFGEG1GCG3G8G6G0IFGEH0G1JFGCG0G1HFH0G1HFG0G3KFG0G3GFGCH0G7GCG1KFGEK0G7IFI0HFH0G1GFG0G3GFJ0G7GFI0HFG8P0gK0G3KFGCG3KFG0G1JFH0G7KFG8K0HFG8H0G3GFGCH0G7GCG0KFK0G3JFGCH0KFGCG3GFI0G7GEG0KFGCG0GFGCK0G1JFH0G1JFGEG0G1HFH0G1HFG0G3KFG0G3GFGCH0G7GCG1KFGEK0JFG8H0HFH0G1GFG0G3GFJ0G3GFG8H0HFQ0gK0G3KFGCG3KFG0G1JFG8G0G7KFG8J0G1HFG8H0G3GFGEH0G7GCG0KFG8J0G3JFGEH0KFGCG3GFI0G7GEG0KFGCG0GFGCK0G7JFG8G0G1KFG0G1HFH0G1HFG0G3KFG0G3GFGEH0G7GCG1KFGEJ0G3JFGCH0HFG8G0G1GFG0G3GFJ0G1GFGCH0GFGEQ0gK0G3KFGCG3KFG0G3JFGCG0G7KFG8J0G1HFGCH0G3GFGEH0G7GCG0KFGCJ0G3KFH0KFGCG3GFG8H0GFGEG0KFGCG0GFGCK0KFGCG0G1KFG8G1HFG8G0G3HFG0G3KFG0G3GFGEH0G7GCG1KFGEJ0G7JFGEH0HFG8G0G1GFG0G3GFJ0G1GFGCH0GFGEQ0gM0G1GFG8H0G3GFK0G7GFG8G1GFGCI0G3GFM0G1GFG7GCH0G3HFH0G7GCG0GFGCG0G1GFGEJ0G3GFH0G7GFG8G0GFGCJ0G1GFG8H0GFGCG0GFGCK0GFGCK0HFG8G1GFGEG0G1GFG8G0G7GFG8G1HFG8G0G3HFG0G3GFK0G3HFH0G7GCI0GFGCL0G7GFGCG0HFH0HFGCG0G1GFG0G3GFK0GFGEG0G1GFGCQ0gM0G1GFG8H0G3GFK0G7GEH0GFGEI0G3GFM0G3GFG7GEH0G3HFH0G7GCG0GFGCH0GFGEJ0G3GFH0G3GFG8G0GFGCJ0G1GFG8H0GFGCG0GFGCK0GFGCJ0G1GFGCH0G7GFG0G1GFG8G0G1GFGCG1HFG8G0G3HFG0G3GFK0G3HFH0G7GCI0GFGCL0GFGEH0G3GFG8G0HFGCG0G1GFG0G3GFK0G7GEG0G1GFG8Q0gM0G1GFG8H0G3GFK0G7GEH0G7GEI0G3GFM0G3GFG7GEH0G3HFG8G0G7GCG0GFGCH0G7GFJ0G3GFH0G1GFGCG0GFGCJ0G1GFGCG0G1GFGCG0GFGCK0GFGCJ0G3GFG8H0G3GFG0G1GFG8H0GFGCG1GFG7G8G0G7GDGFG0G3GFK0G3HFG8G0G7GCI0GFGCK0G1GFGCH0G1GFG8G0HFGEG0G1GFG0G3GFK0G7GFG0G3GFG8Q0gM0G1GFG8H0G3GFK0G7GEH0G7GEI0G3GFM0G3GEG3GEH0G3GEGFG8G0G7GCG0GFGCH0G3GFJ0G3GFI0GFGCG0GFGCK0GFGCG0G1GFG8G0GFGCK0GFGCJ0G3GFG8H0G3GFG8G1GFG8H0GFGCG1GFG7GCG0G7GDGF
  G0G3GFK0G3GEGFG8G0G7GCI0GFGCK0G1GFGCH0G1GFGCG0GFGBGEG0G1GFG0G3GFK0G3GFG8G7GFR0gM0G1GFG8H0G3GFK0G7GFM0G3GFM0G7GEG3GFH0G3GEGFGCG0G7GCG0GFGCH0G3GFJ0G3GFI0GFGCG0GFGCK0GFGCG0G1GFG8G0GFGCK0GFGCJ0G3GFI0G1GFG8G1GFG8H0GFGCG1GFG7GCG0G7GDGFG0G3GFK0G3GEGFGCG0G7GCI0GFGCK0G1GFG8I0GFGCG0GFGBGFG0G1GFG0G3GFK0G1GFG8G7GER0gM0G1GFG8H0G3GFK0G7GFGCL0G3GFM0G7GEG3GFH0G3GEG7GCG0G7GCG0GFGCH0G1GFG8I0G3GFI0G7GEG0GFGCK0GFGCG0G1GFG8G0GFGCK0GFGCJ0G7GFI0G1GFGCG1GFG8H0GFGCG1GFG3GCG0G7G9GFG0G3GFK0G3GEG7GCG0G7GCI0GFGCK0G3GFG8I0GFGEG0GFG9GFG0G1GFG0G3GFK0G1GFGCGFGER0gM0G1GFG8H0G3GFK0G3HFGCK0G3GFM0G7GCG1GFG0H3GEG7GEG0G7HCGFGCH0G1GFG8I0G3GFI0G7GEG0GFGCK0G7GEG0G3GFH0GFGCK0GFGCJ0G7GEJ0GFGCG1GFG8H0GFGCG1GFG3GEG0GFG9GFG0G3GFK0G3GEG7GEG0G7GCI0GFGCK0G3GFJ0G7GEG0GFG9GFG8G1GFG0G3GFJ0G2G0GFGCGFGCR0Y0G7G0GEG0GCG1G8G1GDGFG8H0G3JFGEG0G1IFGCJ0G3GFM0GFGDG1GFG8G3GFGEG3GEG5GFGCG5GFGCH0G1GFG8I0G3GFI0G7GEG0KFG8G0G7HEG3GFH0KFG8G1HFG8GEG1GCG7GEJ0GFGCG1GFG8G0G1GFGCG1GFG3GEG0GFG9GFG0G3JFGEG0G3GEG3GEG0G7GCI0GFGCK0G3GFJ0G7GEG0GFG8GFG8G1GFG0G3GFJ0G3G0G7HFG8R0Y0GDG9GBG1G8G3G0G3G7GFGCH0G3JFGEH0JFJ0G3GFM0GFGDG1GFG8G3GFGEG3GFGDGFGCG5GFGCH0G1GFG8I0G3GFI0G7GEG0KFG8G0G7GFGBG3GFH0KFG8G3GFGCH9G3G6G7GEJ0GFGCG1GFG8G0G7GFG8G1GFG1GEG0GFG1GFG0G3JFGEG0G3GEG3GFG0G7GCI0GFGCK0G3GFJ0G7GEG0GFG8GFGCG1GFG0G3GFJ0G2G3G7HFG8J0G2M0Y0G1H9G3G0G6G0G2G3GFGCH0G3JFGEH0G7IFG8I0G3GFM0HFG0GFG8G3GFGEG1GFG1GFGCG5GFGCH0G1GFG8I0G3GFI0G7GEG0KFG8G0G3GFG3G7GEH0KFG8G3GFGCGDG9GBG2G7GEJ0GFGCG1KFG8G1GFG1GEG0GFG1GFG0G3JFGEG0G3GEG1GFG0G7GCI0GFGCK0G3GFJ0G7GEG0GFG8G7GCG1GFG0G3GFJ0G2G0G3HFG4J0G2M0Y0G1G3G1GBGCG7G8H3GFGEH0G3JFGEH0G1IFGCI0G3GFL0G1HFG0HFG1GFGEG1GFGDGFGCG5GFGCH0G1GFG8I0G3GFI0G7GEG0KFG8G0G3GFG2G7GEH0KFG8G3GFGCGDG9GAG3G7GEJ0GFGCG1KFG0G1GFG1GFG1GFG1GFG0G3JFGEG0G3GEG1GFG8G7GCI0GFGCK0G3GFJ0G7GEG0GFG8G7GEG1GFG0G3GFJ0G3G6G1HFGCG6GCI0G4L0Y0G3GBG1GFG6HCH3GFGCH0G3JFGEI0G1HFGEI0G3GFL0G1HFG0HFG9G7GEG0JFG6GFGCH0G1GFG8I0G3GFI0G7GEG0KFG8G0G3GFH7GEH0KFG8G3GFGCGDG9G
  EG3G7GEJ0GFGCG1JFGEG0G1GFG1GFG1GFG1GFG0G3JFGEG0G3GEG0GFG8G7GCI0GFGCK0G3GFJ0G7GEG0GFG8G3GEG1
  GFG0G3GFJ0G1G7G9HFGCG6GCG1G0G1GEL0Y0G1GBG1GEG2HCG1HFGCH0G3GFN0G1GFGEI0G3GFL0G3HFG9GFGDG9HFG0GFGEGFGDG6GFGCH0G1GFG8I0G3GFI0G7GEG0GFGCK0G1GFGBGFGEG7G0GFGCH0G2G0G3GFGCGDG9GAG3G7GEJ0GFGCG1JFGCG0G1GFG0GFG1GEG1GFG0G3GFK0G3GEG0GFGCG7GCI0GFGCK0G3GFJ0G7GEG0GFG8G3GFG1GFG0G3GFJ0H1GCGFGDGEG2G4G1GAG7G3L0g0G9G1G6G2GCG4G0G7GFGCH0G3GFO0G7GFI0G3GFL0G3LFG7IFGEGFGDGEGFGCH0G1GFG8I0G3GFI0G7GEG0GFGCK0G1GFG9GFGEGFG0GFGCH0G2G0G3GFGCGDG9GBG2GFGEJ0GFGCG1JFH0G1GFG0GFG1GEG1GFG0G3GFK0G3GEG0G7GCG7GCI0GFGCK0G3GFJ0G7GEG0GFG8G1GFG1GFG0G3GFI0G4G1IFGCG3GFGCG1IFL0g0G9GBG3G2G4GDG0G5GFG8H0G3GFK0G1GCH0G3GFI0G3GFL0GBJFGEG0G3GEG0G7GEG7GDG8GFGCH0G1GFG8I0G3GFI0G7GEG0GFGCK0G1GFG9GFGEH0GFGCH0G2G1G3GFGCGDG9G3G6G7GFI0G1GFGCG1GFG8J0G1GFG0GFGBGEG1GFG0G3GFK0G3GEG0G7GEG7GCI0GFGCK0G3GFG8I0GFGEG0GFG8G1GFG9GFG0G3GFI0G6G7H0GFGCI0G1G8N0Y0GFG0GEG1GCG7I9GFG8H0G3GFK0GFGCH0G3GFI0G3GFL0LFG0G3GEH3GEG7GFG0GFGCH0G3GFJ0G3GFI0GFGCG0GFGCL0GFGEGFGCH0GFGCH0G7G1G9HFG8GFG1GCG3GFI0G1GFG8G1GFG8J0G1GFG0G7GBGCG1GFG0G3GFK0G3GEG0G3GEG7GCI0GFGCK0G1GFG8I0GFGCG0GFG8G0GFG9GFG0G3GFI0G3GEH0GFGCG0G5GCG3O0gL0H1GFG8H0G3GFK0GFGEH0G3GFI0G3GFL0LFG0G3GEH3GFG7GEG0GFGCH0G3GFJ0G3GFI0GFGCG0GFGCL0GFGDGFG8H0GFGCK0GFGCJ0G3GFG8H0G3GFG8G1GFG8J0G1GFG0G7GBGCG1GFG0G3GFK0G3GEG0G3GFG7GCI0GFGCK0G1GFGCH0G1GFGCG0GFG8G0GFGDGFG0G3GFM0GFGCG0G5G9GEO0gM0G1GFG8H0G3GFK0GFGEH0G3GFI0G3GFL0G7KFG0G3GEG0G1GFG7GCG0GFGCH0G3GFJ0G3GFI0GFGCG0GFGCL0GFGDGFG8H0GFGCK0GFGCJ0G3GFG8H0G3GFG8G1GFG8J0G1GFG0G7GFGCG1GFG0G3GFK0G3GEG0G1GFG7GCI0GFGCK0G1GFGCH0G1GFGCG0GFG8G0G7GDGFG0G3GFM0GFGCI0GCO0gM0G1GFG8H0G3GFK0G7GFH0G7GFI0G3GFL0GFGCH0G1GFG8G3GEG0G1HFGCG0GFGCH0G7GEJ0G3GFH0G1GFG8G0GFGCL0G7GDGFI0GFGCK0GFGCJ0G1GFGEH0HFG0G1GFG8J0G1GFG0G3GFG8G1GFG0G3GFK0G3GEG0G1HFGCI0GFGCL0HFH0G7GFG8G0GFG8G0G7HFG0G3GFM0GFGCS0gM0G1GFG8H0G3GFK0G7GFGCG1GFGEI0G3GFL0GFGCH0G1GFG8G3GEH0HFGCG0GFGCG0G1GFGEJ0G3GFH0G7GFG8G0GFGCL0G7HFI0GFGCK0GFGCK0HFG8G3GFGEG0G1GFG8J0G1GFG0G3GFG8G1GFG0G3GFK0G3GEH0HFGCI0GFGCL0G7GFGCG1HF
  H0GFG8G0G3HFG0G3GFM0GFGCS0gM0G1GFG8H0G3KFG8G3JFGEI0G3GFL0GFGCH0G1GFG8G3GEH0HFGCG0KFGCJ0G3KFH0KFGEH0G7HFI0KFGEG0KFGCG0KFGEG0G1GFG8J0G1GFG0G3GFG8G1GFG0G3KFG8G3GEH0HFGCI0GFGCL0G7KFH0GFG8G0G3HFG0G3KFI0GFGCS0gM0G1GFG8H0G3KFG8G1JFGCI0G3GFK0G1GFGCI0GFGCG3GEH0G7GFGCG0KFG8J0G3JFGEH0KFGEH0G3GFGEI0KFGEG0KFGCG0G7JFGCG0G1GFG8J0G1GFG0G3GFG8G1GFG0G3KFG8G3GEH0G7GFGCI0GFGCL0G3JFGEH0GFG8G0G1HFG0G3KFI0GFGCS0gM0G1GFG8H0G3KFG8G0JFG8I0G3GFK0G1GFG8I0GFGCG3GEH0G7GFGCG0KFK0G3JFGCH0KFGEH0G3GFGEI0KFGEG0KFGCG0G1JFH0G1GFG8J0G1GFG0G1GFG0G1GFG0G3KFG8G3GEH0G7GFGCI0GFGCM0JFG8H0GFG8G0G1HFG0G3KFI0GFGCS0gM0G1GFG8H0G3KFG8G0G7IFJ0G3GFK0G1GFG8I0GFGCG3GEH0G3GFGCG0JFGEK0G3JFG8H0KFGEH0G3GFGEI0KFGEG0KFGCH0IFGEH0G1GFG8J0G1GFG0G1GFG0G1GFG0G3KFG8G3GEH0G3GFGCI0GFGCM0G7IFI0GFG8H0HFG0G3KFI0GFGCS0gM0G1GFG8H0G3KFG8H0HFG8J0G3GFK0G3GFG8I0G7GEG3GEH0G3GFGCG0JFL0G3IFGCI0KFGEH0G1GFGCI0KFGEG0KFGCH0G1HFI0G1GFG8J0G1GFG0G1GFG0G1GFG0G3KFG8G3GEH0G3GFGCI0GFGCN0HFG8I0GFG8H0HFG0G3KFI0GFGCS0oK0G8I0G4T0jT0G2G3G8G0G7G0GCL0G2H0GCG3G0G6G0GCiN0G3G8H3G0G5G8H0G3G0G4G0G6L0jT0G6G7GCG0GFG3G6L0G6G0G1H6G8GBG3G6iP0G3G0G2G5G8G0G6H3G4G0G6L0jT0G6G4GCG0G8G3G2L0G2G0G3G2GCGDG9G3G2iO0G8G1H0G4G8G0GEG1G0G4G0G2L0jT0GAG0G4G1GEG2G3L0G2G0H3GCGDG9GAG3iN0G1G8G1G3G8G4G8H0G5G0G4G0G2L0jS0G1G2G0GCG0G7G6G3L0G2G0H3GCGDG9GEG3iN0G3GCG5G3GBG6G8G4G0G5G1GCG3G2L0jS0G3G2G0G8G0G3G2G3L0G2G0H3GCGDG9GEG3iN0G3GCG5G3G9G2G8G4G0G5G1GCG7GAL0jS0G3GFG1H0G1G2G3GFK0G2G0H3GCGDG9GAG3GFiN0G7GDHFGEG8G7GFGDIFGAL0jT0G7G2H0G1G3G6L0G2G0G3G2GCGDG9G3G6iO0G7GCHFGEG0G3GFGCGFG3G9G8L0jT0G2G7GEGDGBG3G6L0G3G1G9G6G7G8GBG3G6jN0jT0G2G7GCG9GCG0G8L0G3G1G0G8G3G0G6G0G8iP0G8W0,::::::::k0G8jI0G3G8G2G3G0G4I0G1G0G4N0jX0G3G1GCL0G6G0G1GEG7G8GFG1GEiN0G1G0G3H2G5G8G0G2G3G1G4G0G6L0jX0G7G0G6L0G2G0G3G2GCGDG9G3G6iO0G8G1G0G2G5G8G0GEG1G3G4G0G6L0jX0GFG0G6L0G2G0H3GCGDG9GBG2iO0G8G1G3G0G4G8H0G1G0G4G0G2L0jX0GBG0GCL0G2G0H3GCGDG9GEG3iN0G3GCG5G3GBG6G8G4G0G5G1GCG1G2L0jW0G1G3G0GEL0G2G0H3GCGDG9GEG3iN0G3GCG5G3G9G6G8G4G
  0G5G1GCG7GAL0jW0G3GFG8G6GFK0G2G0H3GCGDG9GAG3GFiM0G3GFGDHFGEG8G7GFGDIFGAL0jW0G1GFG8G2G7K0G2G0H3GCGDG9GBG2G7iN0G7GDHFGEG8G3GFGDGFGBGFGAL0jX0G3G0G6L0G2G1G3G6G4G9GBG3G6jN0jX0H3GCL0G7G1G9GCG3G0GEG1GCiP0G8W0,::::::hT0G4S0G8G0G4kY0G8S0gU0G1G0G7G0GEG3GCG7G0GCG3G8G6G0G2G3I0G5G8H0GCO0GCG0G6G8kX0G8S0gU0G3G0GDG9GBG3G8GDG9G2G6GCGDG0G3J0G5G8H0G4N0G2G9G8G6G8kX0G8S0gU0G1G8G9GBG3G6G1G9GBG3G6G7G9G8H3I0G5G8Q0G6GCG0G6G8gH0GEG1H0G7G1G8L0G6G0G1GCG3G8GEG1GCiS0G1H8R0gU0G1H9GBG3G7H9GBG3G6G7G9G8H3I0G4G8G4G0G6L0G1G8G3GCG9G2G8gG0G1H3G8G0GFG1G8L0G6G0G3G6G4G9GBG3G6iR0G3G0GBG8J0G1M0gU0G1G9G8GFG3G1GDG9GBG3G6G7G9G8G1G7G8G0GFG6G8G4G0GEG0GCG0GFG8GCG1GAGEG4G9GAG8gG0H3G1G8G0GCG0G8L0G2G0H3GCGDG9GBG2iT0G8S0gU0G1G9G8GBG3G0GDG9GBG3G6G7I9G3GBG3GBG6G8G6G0GEG0G5G9GDG9GCG0G2G0G4GCGAG8gG0H3G1G8G1GEG0G8L0G2G0H3GCGDG9GAG3iQ0G1G7G0H8I0G2G3M0gU0G1H9GBG3G0G5G9GBG3G6G7G9GBGDJFGEG8G7GFGEG0G7IFGEG0G3IFGEG8gG0H3G1G8G0G3G0G8L0G2G0H3GCGDG9GEG3iP0G1G9GFH8GCG1G8G0HFG8L0gU0G1G0GDG9G3G0GCG9GBG3G6G4G9G8G0GFGCHFGCG0G1GFGCG0G6HFGCG4G0G1IFGCgH
  0G1GFG1G8G0G1G0G8G7K0G2G0H3GCGDG9GAG3G7iP0H9ICG3GDGBGDG8GEL0gU0G1G8GFG1GEG7G8GFG1GEG3GCGFR0GCJ0G1G8H0G1gJ0G3G1G8G0G1G0G8GFK0G2G0H3GCGDG9GAG2GFiP0HFGEGFGCG3KFL0h0G6X0GFG8N0G3gJ0G6G1H0G1G0G8L0G2G0G3G2G4GDG9G3G6iQ0GDJ0G7G8P0hY0G7gT0GCG3G8GDGEG1GCL0G7G1G9GEG7G8GFG1GCiP0G1GBJ0G4Q0jS0G1J0G8jL0G1GFG7J0G4Q0oL0GEK0G2Q0,:::M0G3GEG3G0G4G0G8G2G0G4G0G4G1GCG4G3GEG3L0G3J0GDH0G7gP0G6GDlR0M0G3GEG6G8GFG1GEG7G8GFG0GCG3GDGFG3GEG7G8G3J0G3J0GDH0G6gP0G4GDlR0N0G6G4GDG9G3G2GCGDG9G0GCG6G1G3G0G6G1G8G7J0G1J0GDH0G3gL0G1G8I0GDlR0N0H6H9GBG3GCGDH9G4G7G3G1G0G6G0G8GFG0G2H0G1J0G5H0G3gK0G1GBG8H0G6GDjV0G6I0G1W0G2S0N0G4G7G1G9GAG3GCGDG9GB
  G4G3G9G1G8G4G1G8GBG0G2G4G0G5H0G7G8G5H0G7G8G6gI0G1GAG2G0G2GEG5gJ0G3G0G6G0G8L0G2H0GCG3G0G6G0G8hQ0G2G6I0G1GAH0GDGEG3G8H0G2M0GEI0GCO0N0GCG3H9GAG3GCGDG9GAG4G0GDGBG0GCG1G9G3H0G4G0G5G1G3G1GCG5G8G7G3G8G6gJ0G3GEG0G3GEG5gJ0G3G0GFG3G6L0G6G0G1G6G7
  G8GFG3G6hQ0H2GCH0G1GAH0GCG2G7G3G8G0GEI0G8M0GCO0N0GCG4GDG9GAG3GCGDG9GFGEG0GCGFG0GCG0GDGFG8G0G7GFGDJFGDG0G7GFG8G2gJ0G1GCG0G1GFGDgJ0G3G1G9G3G6L0G2G0G3G2GCGDG9G3G6hO0G6H0G2I0G1GAH0G5GAG4G2K0GCG8I0G2H0G8G4O0N0G8GCGDG9GBG2GCGDG9G3GEG0GCG3G0G8G0GDGFG8G0G3GFGCJFGCG0HFG8G2gJ0G3H0G1GFGCgJ0G3G1G9GAG3L0G2G0H3GCGDG9GAG3hQ0G7G2I0G1GAH0G5GEG6I0G2H0GCJ0G6H0GCG4O0M0G1G8G4GCGBG3G6G5G9GBG0H4G8G6G1G8G4G8G3G0G2O0GCH0G6gI0G1GAH0G3gL0G3G1G9GEG3L0G2G0H3GCGDG9GEG3hP0G9G7G3GEG1H8GAH0G7GEG3G0G8G0G7G0GCG6GCG0G7G0GEG0GDGEG4G0G4G6L0M0G1G0G3G8G6G1GCG3G0GEG0G4G7G1GCG1G0G7G0G3G0G2G0G4M0G8H0GCgI0G1GAH0GEgL0G3G1G9GEG3L0G2G0H3GCGDG9GEG3hP0G9G7G3GFG1G9GCGAH0G5GEG0H8G0G7G0GCG2G5G1GFG8GFG1GDGFH4GCGFL0gX0GCG0G7G8gJ0G3G0G3GCgL0G3G1G9GAG3GFK0G2G0H3GCGDG9GAG3GFhO0JFG1HFGAH0G7IFG8G4G7G0KFG8G3IFG7IFL0gX0G4gM0G3GFgN0G3G1G9G3H6K0G2G0G3G2GCGDG9G3H6hM0G2G0JFG1GEGFG8G1G8G7GDHFG8G4G1G0GDJFG8G1GEGFG6G3HFG7L0iM0GEgN0G3G0GBG3G6L0G3G1G9G6G7G8GBG3G6hN0G3G0G9J0G8I0GFGCJ0G4G3G0G4Y0jV0G3G0G6G0GCL0G7G1G0GCG3G0G6G0GChN0G1HFI0G3G8I0G7K0G7GFG1G8Y0nK0GEJ0G7P0G3GCG3g0,:gT0G2nO0gO0G4J0G3G8I0H8gL0G8J0GCH0GDI0G3G1lI0gO0G4J0GBG8G0G7G0GCG8gL0G8I0G3G8G0G1G5G8G0GEG3GBlI0gO0G4I0G1GAGCG0G6G1GCG8gL0G8I0G3H0G2G5G8G0G8G3G9lI0gO0G4I0G1GFGCJ0G8gL0G8I0G3G8G0G3G5G8I0G1lI0gN0G7G4G6G3G0G9GBGCG1G9G0G2GCgK0G
  CG8GCG1G3G1GCG0G3G5G8H2G0G1lI0gN0G7G4G2G7G0G8G1GCG1G9GAG6GCgJ0G1GCG8G4G1GBG0G4G3G0G7G8G3G2G9G5kI0G3G8G0G1G0G4K0G4N0gN0H7HFG0HFGCG0HFGEGCgJ0G1GEGFGCG1HFGEG3GFGEG8G1HFGDU0G1G8GFG0GCL0G6G0G1GEG7G8GFG1GCiN0G3G0H3G2G5G8G0G2G3G1G4G0G6L0gN0G7G3GFGBG0G7GFH0HFGEgK0G1GEG7GCG1HFGEG1GFGCG0G3HFGCU0G3G8G3G1G8L0G2G0G3G2G4GDG9G3G6iO0G8G1G0G2G5G8G0GEG1G3G4G0G6L0gP0G6K0G1G8gQ0G1GDL0G3X0G3G8H3M0G2G0H3GCGDG9GBG2iO0G8G1G3G0G4G8G0G8G1G0G4G0G2L0gP0GEK0G7gQ0G8H7L0GEX0G5G8G2G3GEL0G2G0H3GCGDG9GEG3iN0G1GCG5G3GBG6G8G4G0G5G1GCG1G2L0gP0G8K0GEgQ0G1GEG3K0G3GCX0GDG8G7G3G7L0G2G0H3GCGDG9GEG3iN0G3GCG5G3G9G6G8G4G0G5G1GCG3GAL0jV0GFGCG3G2G3G7K0G2G0H3GCGDG9GAG3G7iM0G3GFGDHFGEG8G7GFGDIFGAL0jV0GFGCG1H3G7K0G2G0H3GCGDG9GBG2G7iN0G7GDHFGEG8G7GFGDGFGBGFGAL0jV0G1G8G1G3G2L0G2G1G3G6G4G9GBG3G6jN0jV0G1G9GEG1GCL0G7G1G9GCG7G8GEG1GCiP0G8W0oL0G8W0,::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::^FS^XZ`;
  const checkBluetoothStatus = async () => {
    try {
      const isEnabled = await RNZebraBluetoothPrinter.isEnabledBluetooth();
      return isEnabled;
    } catch (error) {
      throw error;
    }
  };
  const scanForDevices = async () => {
    try {
      const devices = await RNZebraBluetoothPrinter.scanDevices();
      console.log(devices);
    } catch (error) {
      console.error('Error scanning for devices:', error);
    }
  };
  const Connect = async () => {
    try {
 
  var deviceAddress;//="48:A4:93:A1:DC:57";
  deviceAddress="48:A4:93:A1:92:8D";
  res= await RNZebraBluetoothPrinter.connectDevice(deviceAddress);
   console.log(res);
    } catch (error) {
     console.log("ERRRRRROR"+error);
    }
  };
  const printText = async () => {
    try {
      var res= await RNZebraBluetoothPrinter.connectDevice(deviceAddress);

      var deviceAddress="48:A4:93:A1:92:8D";
       res= await RNZebraBluetoothPrinter.pairedDevices();
      console.log(res);
     var p= await RNZebraBluetoothPrinter.print(deviceAddress,zplCommand);
  
      // Close the connection (optional)  
      console.log('Printing completed.');
    } catch (error) {
      console.error('Error printing:', error);
    }
  };
  useEffect(() => {
    checkBluetoothStatus()
      .then((isEnabled) => {
        setIsBluetoothEnabled(isEnabled);
      })
      .catch((error) => {
        console.error('Error checking Bluetooth status:', error);
      });


      check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          // Permission is already granted, proceed with Bluetooth scanning.
          console.log("Permission is already granted")
          //scanDevices();
        } else {
          // Permission is not granted, request it.
          console.log("sssss");
          return request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
        }
      })
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          return request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

         
          // Permission granted, you can now scan for Bluetooth devices.
        } else {
          console.log("ssss");
          return request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        }
      })
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);

          console.log("OKKK")
          //scanDevices();
          // Permission granted, you can now scan for Bluetooth devices.
        } else {
          return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        }
      })

  }, []);

  const handleCheckStatus = async () => {
    try {
      const isEnabled = await checkBluetoothStatus();
      setIsBluetoothEnabled(isEnabled);
    } catch (error) {
      console.error('Error checking Bluetooth status:', error);
    }
  };

  const connectToPrinter = async () => {
    try {
      // Scan for available Bluetooth devices
      const devices = await RNZebraBluetoothPrinter.getDeviceList();
      const printer = devices.find((device) => device.name === 'Your Printer Name');

      if (printer) {
        // Connect to the printer
        await RNZebraBluetoothPrinter.connectPrinter(printer.address);
        setPrinterStatus('Connected to the printer.');
      } else {
        setPrinterStatus('Printer not found.');
      }
    } catch (error) {
      console.error('Error connecting to printer:', error);
      setPrinterStatus('Error connecting to printer.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bluetooth Status</Text>
      {isBluetoothEnabled ? (
        <Text>Bluetooth is enabled on the device.</Text>
      ) : (
        <Text>Bluetooth is not enabled on the device.</Text>
      )}
      <Button
        title="Check Bluetooth Status"
        onPress={handleCheckStatus}
      />
      <Button
        title="scan"
        onPress={scanForDevices}
      />

      <Button
        title="connect"
        onPress={Connect}
      />
         <Button
        title="print"
        onPress={printText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});