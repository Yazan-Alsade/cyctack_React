
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

  const columns = ['IDCer', 'CerName', 'CommonName', 'ValueName'];

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
              <td>{row.issuer_ca_id}</td>
              <td>{row.issuer_name}</td>
              <td>{row.common_name}</td>
              <td>{row.name_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
