import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native'; // Thêm import Button
import axios from 'axios';

function ClassList() {
  const [classLists, setClassLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lượng mục mỗi trang
  const renderListItem = ({ item }) => {
    return <View style={{ padding: 10 }}><Text>{item}</Text></View>;
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = classLists.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    // Gọi API và cập nhật danh sách lớp
    axios.get('http://192.168.1.4:3000/api/class/', { // Sửa URL
      params: {
        _page: currentPage,
        _limit: itemsPerPage
      }
    })
      .then(response => {
        setClassLists(response.data); // Sửa thành response.data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage]); // Thêm dependency []

  return (
    <View>
      <FlatList
        data={paginatedData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id.toString()} // Sửa keyExtractor
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        
      </View>
    </View>
  );
};

export default ClassList;