import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Đặt icon theo thư viện bạn sử dụng

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Thêm useState cho các thông báo
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.106:3000/api/users/?username=${username}&password=${password}`
      );

      console.log(response.data[0]);

      if(username === "" || password === "") {
        setUsernameMessage('Vui lòng không để trống tài khoản');
        setPasswordMessage('Vui lòng không để trống mật khẩu');
      } else {
        setUsernameMessage('');
        setPasswordMessage('');
        if (response.data.length > 0) {
          // Đăng nhập thành công
          // setContextUsername(username); // Đảm bảo rằng hàm này được định nghĩa
          Alert.alert('Đăng nhập thành công', 'Chào mừng đến với shop của chúng tôi!');
          navigation.navigate('Home');
        } else {
          // Đăng nhập thất bại
          Alert.alert('Đăng nhập thất bại','Sai tài khoản hoặc mật khẩu');
        }
      }
    } catch (error) {
      // Xử lý lỗi
      console.error('Error:', error.message);
      Alert.alert('Error', 'An error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đăng Nhập</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#3498db" style={styles.icon} />
        <TextInput
          placeholder="Tên Đăng Nhập"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>
      {/* Hiển thị thông báo */}
      <Text style={styles.errorMessage}>{usernameMessage}</Text>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#3498db" style={styles.icon} />
        <TextInput
          placeholder="Mật Khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      {/* Hiển thị thông báo */}
      <Text style={styles.errorMessage}>{passwordMessage}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng Nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupText}>
        <Text 
          onPress={() => navigation.navigate('RegistrationScreen')}
        >
          Bạn chưa có tài khoản?  |  Đăng ký
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 0,
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText:{
    color:'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    paddingTop:16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;