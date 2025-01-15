import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios'
import {Link}  from 'react-router-dom'
const Home = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPsychics, setTotalPsychics] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    // Initialize charts
    const visitorsChart = new Chart(document.getElementById('visitors-chart'), {
      // Chart configuration for the visitors chart
      // You can customize this based on your data
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Visitors Over Time',
            data: [820, 1120, 950, 1300, 1100, 1200, 1000],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      },
    });

    const salesChart = new Chart(document.getElementById('sales-chart'), {
      // Chart configuration for the sales chart
      // You can customize this based on your data
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales Over Time',
            data: [5000, 7000, 6000, 8000, 7500, 9000, 8500],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      },
    });


    const barChartData = {
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
      datasets: [
        {
          label: 'Bar Chart Data',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
  
    const doughnutChartData = {
      labels: ['Label A', 'Label B', 'Label C', 'Label D', 'Label E'],
      datasets: [
        {
          data: [30, 20, 10, 25, 15],
          backgroundColor: ['red', 'blue', 'green', 'orange', 'purple'],
          hoverBackgroundColor: ['red', 'blue', 'green', 'orange', 'purple'],
        },
      ],
    };

    // Clean up when the component is unmounted
    return () => {
      visitorsChart.destroy();
      salesChart.destroy();
    };
  }, []); // Run the effect only once during component mount

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('/api/auth/total-users'); // Adjust the URL as needed
        setTotalUsers(response.data.totalUsers); // Update state with total users count
      } catch (err) {
        setError('Failed to fetch total users');
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTotalUsers();
  }, []);


  useEffect(() => {
    const fetchTotalPsychics = async () => {
      try {
        const response = await axios.get("/api/psychics/total"); // New endpoint
        setTotalPsychics(response.data.total);
      } catch (error) {
        console.error("Error fetching total psychics:", error);
      }
    };

    fetchTotalPsychics();
  }, []);


  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const response = await axios.get('/api/paidtimer/total/wallet-balance'); // Adjust the URL as necessary
        setTotalEarnings(response.data.totalWalletBalance); // Set the total earnings
      } catch (error) {
        console.error("Error fetching total earnings:", error);
      }
    };

    fetchTotalEarnings();
  }, []); // Run only on mou
  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <div className="content-header">
        <div className="container-fluid">

     <section className="content">
  <div className="container-fluid">
    {/* Small boxes (Stat box) */}
    <div className="row">
    <div className="col-lg-3 col-6">
      {/* Small box */}
      <div className="small-box" style={{ backgroundColor: 'hsl(290, 96.61%, 45.66%)' }}>
        {/* Content of the small box */}
        <div className="inner">
          {loading ? (
            <h3 className='text-white'>Loading...</h3>
          ) : error ? (
            <h3 className='text-white'>{error}</h3>
          ) : (
            <h3 className='text-white'>{totalUsers}</h3>
          )}
          <p className='text-white'>Total Users</p>
        </div>
        <div className="icon text-white">
          <i className="ion ion-person" />
        </div>
        <Link to="/admin/pages/Users" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right" />
         
        </Link>
      </div>
    </div>
      {/* ./col */}
      <div className="col-lg-3 col-6">
        {/* small box */}
        <div className="small-box " style={{backgroundColor: '#ff6000'}}>
          <div className="inner">
            <h3 className='text-white'>53<sup style={{fontSize: 20 }}>%</sup></h3>
            <p className='text-white'>Bounce Rate</p>
          </div>
          <div className="icon text-white">
            <i className="ion ion-stats-bars" />
          </div>
          <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
        </div>
      </div>
      {/* ./col */}
      <div className="col-lg-3 col-6">
        {/* small box */}
        <div className="small-box" style={{ backgroundColor: 'hsl(290, 96.61%, 45.66%)' }}>
  {/* Content of the small box */}
  
  <div className="inner">
      <h3 className='text-white'>{totalPsychics}</h3>
      <p className='text-white'> Total Psychics</p>
    </div>
          <div className="icon text-white">
            <i className="ion ion-person-add" />
          </div>
          <Link to="/admin/pages/Psychics" className="small-box-footer"> More info <i className="fas fa-arrow-circle-right" /></Link>
        </div>
      </div>
      {/* ./col */}
      <div className="col-lg-3 col-6">
  {/* small box */}
  <div className="small-box" style={{ backgroundColor: '#ff6000' }}>
      <div className="inner">
        <h3 className='text-white'>$5904<sup style={{ fontSize: 20 }}></sup></h3>
        <p className='text-white'>Total Earnings</p> {/* Changed label to Total Earnings */}
      </div>
      <div className="icon text-white">
        {/* Change the icon here */}
        <i className="fas fa-dollar-sign text-white" /> {/* Example of a dollar sign icon */}
      </div>
      <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
    </div>
</div>

      {/* ./col */}
    </div>
     </div>{/* /.container-fluid */}
</section>



          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0"></h1>
            </div>
            
          </div>
        </div>
      </div>











      {/* Main content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h5 className="text-white">Online Store Visitors</h5>
                    <a href="javascript:void(0);"  style={{color: '#ffffff'}}>View Report</a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex">
                    <p className="d-flex flex-column">
                      <span className="text-bold text-lg">820</span>
                      <span>Visitors Over Time</span>
                    </p>
                    <p className="ml-auto d-flex flex-column text-right">
                      <span className="text-success">
                        <i className="fas fa-arrow-up"></i> 12.5%
                      </span>
                      <span className="text-muted">Since last week</span>
                    </p>
                  </div>
                  <div className="position-relative mb-4">
                    {/* Chart canvas for the visitors chart */}
                    <canvas id="visitors-chart" height="200"></canvas>
                  </div>
                  <div className="d-flex flex-row justify-content-end">
                    <span className="mr-2">
                      <i className="fas fa-square text-primary"></i> This Week
                    </span>
                    <span>
                      <i className="fas fa-square text-gray"></i> Last Week
                    </span>
                  </div>
                </div>
              </div>

              <div className="card">
                {/* ... */}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h5 className="text-white">Sales</h5>
                    <a href="javascript:void(0);" style={{color: '#ffffff'}}>View Report</a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex">
                    <p className="d-flex flex-column">
                      <span className="text-bold text-lg">$18,230.00</span>
                      <span>Sales Over Time</span>
                    </p>
                    <p className="ml-auto d-flex flex-column text-right">
                      <span className="text-success">
                        <i className="fas fa-arrow-up"></i> 33.1%
                      </span>
                      <span className="text-muted">Since last month</span>
                    </p>
                  </div>
                  <div className="position-relative mb-4">
                    {/* Chart canvas for the sales chart */}
                    <canvas id="sales-chart" height="200"></canvas>
                  </div>
                  <div className="d-flex flex-row justify-content-end">
                    <span className="mr-2">
                      <i className="fas fa-square text-primary"></i> This year
                    </span>
                    <span>
                      <i className="fas fa-square text-gray"></i> Last year
                    </span>
                  </div>
                </div>
              </div>

              <div className="card">
                {/* ... */}
              </div>
            </div>
          </div>
        </div>
      </div>






      
    </div>
  );
};

export default Home;
