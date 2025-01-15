import React, { Component } from 'react';
import Sparkline from 'sparkline'; // Replace with the correct library path

class SparklineChart extends Component {
  componentDidMount() {
    const element = document.getElementById('sparkline-chart');
    const data = [1, 2, 3, 4, 5];

    // Initialize Sparkline with options
    const options = {
      // Your Sparkline options here
    };
    Sparkline(element, data, options);
  }

  render() {
    return (
      <div id="sparkline-chart"></div>
    );
  }
}

export default SparklineChart;
