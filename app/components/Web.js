import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

class Web extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Web;