import React from 'react';
import { NavLink ,Link} from 'react-router-dom'
import getstart from '../Images/getstart.jpg';
import love_couple from '../Images/love_couple.jpg';
import psychic_team from '../Images/psychic_team.png';
import love_reading from '../Images/love_reading.jpg';
import snowfall from '../Images/snowfall.jpg';

const Pricing_section = () => {
  return (
    <div>
   <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>News </h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active"> News</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    {/* Default box */}
    <div className="card">
      <div className="card-header">
      <h3 className="card-title"><span className='text-white'> Profile</span></h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        <table className="table table-striped projects">
          <thead>
            <tr>
            <th style={{width: '2%'}} className="text-center">
                SL
              </th>
             
              <th style={{width: '20%'}} className="text-center">
                     Item Name               </th>
              <th style={{width: '20%'}} className="text-center">
                     Plan Name               </th>
        
              <th style={{width: '15%'}} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
      <td>1</td>
      <td>
        <a>
        General horoscope updates

        </a>
      </td>
      
      <td className="project-state">
        <p>Basic</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr>

    <tr>
      <td>2</td>
      <td>
        <a>
        Access to a diverse group of psychics
        </a>
      </td>
      
      <td className="project-state">
        <p>Basic</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr>



    <tr>
      <td>3</td>
      <td>
        <a>
        2 Psychic Readings per month
        </a>
      </td>
      
      <td className="project-state">
        <p>Basic</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr>
    
           
    <tr>
      <td>4</td>
      <td>
        <a>
        5 Psychics Readings
        </a>
      </td>
      
      <td className="project-state">
        <p>Platinum</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr> <tr>
      <td>5</td>
      <td>
        <a>
        Priority access to top-rated psychics
        </a>
      </td>
      
      <td className="project-state">
        <p>Basic</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr>
    
     <tr>
      <td>6</td>
      <td>
        <a>
        Exclusive monthly webinars and workshops
        </a>
      </td>
      
      <td className="project-state">
        <p>Basic</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr>

    <tr>
      <td>7</td>
      <td>
        <a>
        Personalized horoscope and tarot readings        </a>
      </td>
      
      <td className="project-state">
        <p>Platinum</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr>




    <tr>
      <td>8</td>
      <td>
        <a>
        Chat and messaging options
Personalized horoscope readings
Customer support during business hours       </a>
      </td>
      
      <td className="project-state">
        <p>Gold</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr>
    <tr>
      <td>9</td>
      <td>
        <a>
        10 Psychic Readings per month
Access to experienced and skilled psychics       </a>
      </td>
      
      <td className="project-state">
        <p>Gold</p>
      </td>
     
      <td className="project-actions text-right">
        <a className="btn btn-info btn-sm" href="#">
          <i className="fas fa-pencil-alt"></i>
          Edit
        </a>
        <a className="btn btn-danger btn-sm" href="#">
          <i className="fas fa-trash"></i>
          Delete
        </a>
      </td>
    </tr>

          </tbody>
        </table>
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}
  </section>
  {/* /.content */}
</div>

    </div>
  )
}

export default Pricing_section;
