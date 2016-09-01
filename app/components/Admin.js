import React from 'react';
import AdminNavbar from './AdminNavbar';

class Admin extends React.Component {
  render() {
    return (
      <div>
        <AdminNavbar />
        {this.props.children}
      </div>
    );
  }
}

export default Admin;