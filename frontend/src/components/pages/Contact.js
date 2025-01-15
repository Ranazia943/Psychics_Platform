import React, { useState,useEffect } from 'react'
import getstart from '../Images/getstart.png';
import contact_image from '../Images/contact_image.jpg';
import team_psychics from '../Images/team_psychics.jfif';
import psychic_team from '../Images/psychic_team.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link  } from 'react-router-dom';
const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    requestType: '',
    message: '',
  });

  const [countries, setCountries] = useState([]);
  const [phoneCodes, setPhoneCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryResponse = await axios.get('/api/requestcontact/countries');
        setCountries(countryResponse.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const fetchPhoneCodes = async () => {
      try {
        const phoneCodeResponse = await axios.get('/api/requestcontact/phonecodes');
        setPhoneCodes(phoneCodeResponse.data);
      } catch (error) {
        console.error('Error fetching phone codes:', error);
      }
    };

    fetchCountries();
    fetchPhoneCodes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = { ...formData, phone: `${selectedCode}${formData.phone}` };

    try {
      const response = await axios.post('/api/requestcontact/requests', dataToSubmit);
      toast.success('Your request has been submitted successfully! We Will contact on your Email');
      console.log('Request submitted:', response.data);
      // Optionally clear the form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        requestType: '',
        message: '',
      });
      setSelectedCode('');
    } catch (error) {
      console.error('Error submitting request:', error.response?.data || error.message);
      toast.error('Error submitting your request. Please try again.');
    }
  };

  return (
    <div className='container'>

   <div className='container-contact' data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
    <h4 className='contact-heading'> Get in Touch</h4>
    <p className='contact-para'> 
    Please try our <span style={{color:'#90009d', fontSize:'1.2em', fontWeight:'600'}}> Help Center </span> below to find an answer quickly. If you don’t
find what you need, we’re here to help and answer any question you
might have. Just fill out our contact form or call us. We look forward to
hearing from you.
    </p>

    </div>


    <div className="row" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
      <div className="col-md-6">
        <div className="card">
        <div className="card-header">
  <h3 className="card-" style={{ color: 'white', fontSize:'24px', textAlign:'left' }}>Submit a Request to Support Team</h3>
</div>


          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="phoneCode"
                      value={selectedCode}
                      onChange={(e) => setSelectedCode(e.target.value)}
                      required
                    >
                      <option value="">Select Phone Code</option>
                      {phoneCodes.map((code) => (
                        <option key={code.code} value={code.callingCode}>
                          {code.callingCode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="requestType"
                  placeholder="Request Type"
                  value={formData.requestType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn-contact">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>




<br/><br/><br/>
 <h5 className='text-center' data-aos="zoom-in-up"> Help Center</h5>
 <p className='card-text' data-aos="zoom-in-up" style={{width:'600px', margin:'0px auto', textAlign:'center'}}>
 Get the info you’re looking for right now. Please select a topic below related to your inquiry.
If you don’t find what you need, fill out our contact form.

 </p>
<div className='favour-card' data-aos="fade-up"
     data-aos-duration="1500">
  
  <div className='favour-card-banner' style={{background:'none'}}> 
    <img src={getstart} alt="phone_card" className='getstart'/>
    <h5> <Link to="/login"  style={{color:'#90009d'}} >Get Start</Link></h5>
    

    </div>
  <div className='favour-card-banner' style={{background:'none'}}> 
    <img src={contact_image} alt="phone_card" className='getstart'/>
    <h5  style={{color:'#90009d'}}><Link to="/Blogs"  style={{color:'#90009d'}}>General Questions</Link></h5>
   
 
</div>
    </div>


    <div className='favour-card' data-aos="fade-up"
     data-aos-duration="1500">
  
  <div className='favour-card-banner' style={{background:'none'}}> 
    <img src={team_psychics} alt="phone_card" className='getstart'/>
    <h5 > <Link to="/Psychics"  style={{color:'#90009d'}}> Meet Psychics</Link> </h5>
    

    </div>
  <div className='favour-card-banner' style={{background:'none'}}> 
    <img src={psychic_team} alt="phone_card" className='getstart'/>
    <h5 > <Link to="/Love"  style={{color:'#90009d'}}> Connect Psychics</Link> </h5>
   
 
</div>
    </div>
</div>
   
  )
}

export default Contact
