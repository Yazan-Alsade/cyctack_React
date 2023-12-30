
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Checkbox } from 'antd';
import './datatable.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showExpired, setShowExpired] = useState(false);
  const [filteredValue, setFilteredValue] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://crt.sh/?q=cystack.ps&output=json');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const columns = [
    {
      title: 'Certificate',
      dataIndex: 'id',
      key: 'rowNumber',
      render: (text, record, index) => {
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'crt.sh ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Logged At',
      dataIndex: 'entry_timestamp',
      key: 'entry_timestamp',
      render: (text) => formatTimestamp(text),
    },
    {
      title: 'Not Before',
      dataIndex: 'not_before',
      key: 'not_before',
      render: (text) => formatTimestamp(text),
    },
    {
      title: 'Not After',
      dataIndex: 'not_after',
      key: 'not_after',
      render: (text) => formatTimestamp(text),
      filteredValue: filteredValue,
      filters: [
        {
          text: 'Expired',
          value: true,
        },
        {
          text: 'Not Expired',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        const isExpired = new Date(record.not_after) < new Date();
        return value ? isExpired : !isExpired;
      },
    },
    {
      title: 'Common Name',
      dataIndex: 'common_name',
      key: 'common_name',
    },
    {
      title: 'Matching Identities',
      dataIndex: 'name_value',
      key: 'name_value',
    },
    {
      title: 'Issuer Name',
      dataIndex: 'issuer_name',
      key: 'issuer_name',
    },
  ];

  return (
    <div>
     
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          current: currentPage,
          total: data.length,
          pageSize: pageSize,
          onChange: (currentPage, pageSize) => {
            setCurrentPage(currentPage);
            setPageSize(pageSize);
          },
        }}
        rowKey="id"
        onChange={(pagination, filters) => {
          setFilteredValue(filters.not_after);
        }}
      />
    </div>
  );
};

export default DataTable;
