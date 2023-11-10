import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import axios from 'axios';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const COLOURS = {
  backgroundLight: '#F4F4F4',
  backgroundMedium: '#E5E5E5',
  white: '#FFFFFF',
  black: '#000000',
  green: '#4CAF50',
  red: '#FF0000',
  blue: '#2196F3',
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromAPI();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromAPI = async () => {
    try {
      const response = await axios.get('http://192.168.1.4:3000/api/sanpham/');
      const data = response.data;

      const productList = data.filter(item => item.category === 'product');
      const accessoryList = data.filter(item => item.category === 'accessory');

      setProducts(productList);
      setAccessory(accessoryList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
        style={{
          width: '48%',
          marginVertical: 14,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          {/* ... (giữ nguyên phần code của bạn) */}
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.productName}
        </Text>
        {data.category === 'accessory' ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}>
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}>
                Unavailable
              </Text>
            </View>
          )
        ) : null}
        <Text>&#8377; {data.productPrice}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ... (giữ nguyên phần code của bạn) */}

        {/* Dữ liệu của sản phẩm */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {products.map(data => {
            return <ProductCard data={data} key={data.id} />;
          })}
        </View>

        {/* Dữ liệu của phụ kiện */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {accessory.map(data => {
            return <ProductCard data={data} key={data.id} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
