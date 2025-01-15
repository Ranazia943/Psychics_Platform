import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PsyuseAuthContext } from '../../context/PsyAuthContext'; // Adjust the path accordingly

const Home = () => {
  const { authPsychics } = PsyuseAuthContext();
  const [totalTimeSpent, setTotalTimeSpent] = useState(0); // State to store total time spent
  const [totalEarnings, setTotalEarnings] = useState(0); // State to store total earnings
  const [totalRatings, setTotalRatings] = useState(0); // State to store total ratings
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Log the entire authPsychics object to see its structure
  console.log('Auth Psychics:', authPsychics);

  // Fetch total time spent, total earnings, and total ratings by the psychic
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authPsychics || !authPsychics._id) {
          throw new Error('Psychic ID not found');
        }

        // Fetch total time spent
        const timeResponse = await axios.get(`/api/paidtimer/${authPsychics._id}/total-time`);
        const { totalTimeSpent: timeSpent } = timeResponse.data;
        const timeInMinutes = parseInt(timeSpent, 10);
        setTotalTimeSpent(timeInMinutes);

        // Fetch total earnings
        const earningsResponse = await axios.get(`/api/paidtimer/${authPsychics._id}/total-earning`);
        const { totalEarnings: earnings } = earningsResponse.data;
        setTotalEarnings(earnings);

        // Fetch total ratings
        const ratingsResponse = await axios.get(`/api/rating/${authPsychics._id}`);
        const { totalRatings: ratings } = ratingsResponse.data;
        setTotalRatings(ratings);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authPsychics]);

  // Sample data for Line chart
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  // Sample data for Doughnut chart
  const doughnutChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <div className="content-header">
        <div className="container-fluid">
          <section className="content" data-aos="fade-left">
            <div className="container-fluid">
              {/* Small boxes (Stat box) */}
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box" style={{ backgroundColor: 'hsl(290, 96.61%, 45.66%)' }}>
                    <div className="inner">
                      <p className="text-white">Total Time Recorded</p>
                      {loading ? (
                        <h6 className="text-white">Loading...</h6>
                      ) : error ? (
                        <h6 className="text-white">Error: {error}</h6>
                      ) : (
                        <h6 className="text-white">{totalTimeSpent} minutes</h6>
                      )}
                    </div>
                    <div className="icon text-white">
                      <i className="ion ion-clock" />
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right text-white" />
                    </a>
                  </div>
                </div>

                {/* Total Earnings Box */}
                <div className="col-lg-3 col-6">
                  <div className="small-box" style={{ backgroundColor: '#ff6000' }}>
                    <div className="inner">
                      <p className="text-white">Total Earnings</p>
                      {loading ? (
                        <h6 className="text-white">Loading...</h6>
                      ) : error ? (
                        <h6 className="text-white">Error: {error}</h6>
                      ) : (
                        <h6 className="text-white">{totalEarnings}</h6>
                      )}
                    </div>
                    <div className="icon text-white">
                      <i className="ion ion">&#36;</i>
                    </div>

                    <a className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right text-white" />
                    </a>
                  </div>
                </div>

                {/* Followers Box */}
                <div className="col-lg-3 col-6">
                  <div className="small-box" style={{ backgroundColor: 'hsl(290, 96.61%, 45.66%)' }}>
                    <div className="inner">
                      <p className="text-white">Followers</p>
                      <h6 className="text-white">150</h6>
                    </div>
                    <div className="icon text-white">
                      <i className="ion ion-heart" />
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right text-white" />
                    </a>
                  </div>
                </div>

                {/* Rating & Reviews Box */}
                <div className="col-lg-3 col-6">
                  <div className="small-box" style={{ backgroundColor: '#ff6000' }}>
                    <div className="inner">
                      <p className="text-white">Rating & Reviews</p>
                      {loading ? (
                        <h6 className="text-white">Loading...</h6>
                      ) : error ? (
                        <h6 className="text-white">Error: {error}</h6>
                      ) : (
                        <h6 className="text-white">{totalRatings}</h6>
                      )}
                    </div>
                    <div className="icon text-white">
                      <i className="ion ion-star" />
                    </div>
                    <Link to="/psychics/pages/feed_back" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <div className="row" data-aos="fade-up" data-aos-duration="500">
            <section className="col-lg-7 connectedSortable">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1" />
                    Sales
                  </h3>
                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <div className="chart tab-pane active" id="revenue-chart">
                      <Line data={lineChartData} />
                    </div>
                    <div className="chart tab-pane" id="sales-chart">
                      <Doughnut data={doughnutChartData} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;