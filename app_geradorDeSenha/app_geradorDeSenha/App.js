import { StyleSheet, View, ImageBackground } from 'react-native';
import { Insert } from './banco/Insert';
import { Remove } from './banco/Remove';
import { AllContacts } from './banco/AllContacts';
import { Update } from './banco/Update';
 
export default function App() {

  return (
    <ImageBackground
            source={require('./assets/bg_senha.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
    <View style={styles.container}>
      <Insert/>
      <Update/>
      <Remove/>
      <AllContacts/>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
},
});