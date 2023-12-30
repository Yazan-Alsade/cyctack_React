
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://crt.sh/?q=cystack.ps&output=json');
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const columns = ['crt.sh ID', 'Logged At', 'Not Before', 'Not After','Common Name','Matching Identities','Issuer Name'];

  return (
    <div>
      <h2>Data Table</h2>
      <table border="1">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{formatTimestamp(row.entry_timestamp)}</td>
              <td>{formatTimestamp(row.not_before)}</td>
              <td>{formatTimestamp(row.not_after)}</td>
              <td>{row.common_name}</td>
              <td>{row.name_value}</td>
              <td>{row.issuer_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
