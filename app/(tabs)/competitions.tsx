import { View, Text, StyleSheet } from 'react-native';

export default function CompetitionsScreen() {
  return (
    <View style={styles.container}>
      <Text>Competitions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
