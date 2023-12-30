
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CertificateSearch from './cirtificateSearch';
import DataTable from './DataTable';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CertificateSearch} />
        <Route path="/datatables" component={DataTable} />
      </Switch>
    </Router>
  );
};

export default App;
