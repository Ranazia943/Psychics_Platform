import React from 'react'
import { NavLink } from 'react-router-dom';
import paypal from './payment/paypal.jpeg';

import skrill from './payment/skrill.png';
import bank from './payment/bank.jpg';
import squre from './payment/squre.png';
import payoneer from './payment/payoneer.png';
import stripe from './payment/stripe.png';
const accepted_payment = () => {
  return (
    <div>
   <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Psychics Profile</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Psychics Profile</li>
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
              <th style={{width: '1%'}}>
                #
              </th>
              <th style={{width: '20%'}}>
                Name
              </th>
              <th style={{width: '30%'}}>
                Images
              </th>
              <th>
              Payment Gateways
              </th>
              <th style={{width: '8%'}} className="text-center">
                Status
              </th>
              <th style={{width: '20%'}}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                #
              </td>
              <td>
                <a>
                 Addon Anela
                </a>
                <br />
                <small>
                  Date 01.01.2019
                </small>
              </td>
              <td>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png" />
                  </li>
                
                </ul>
              </td>
              <td className="text-center">
                      <img
                        src={skrill}
                        alt="Payment Gateway 1"
                        style={{ maxWidth: '50px', maxHeight: '50px'  }}
                      />
                    </td>
              <td className="project-state">
                <span className="badge badge-success">Success</span>
              </td>
              <td className="project-actions text-right">
               
                
                <a className="btn btn-info btn-sm" href="#">
                  <i className="fas fa-pencil-alt">
                  </i>
                  Edit
                </a>
                <a className="btn btn-danger btn-sm" href="#">
                  <i className="fas fa-trash">
                  </i>
                  Delete
                </a>
              </td>
            </tr>
           
            <tr>
              <td>
                #
              </td>
              <td>
                <a>
                 Addon Anela
                </a>
                <br />
                <small>
                  Date 01.01.2019
                </small>
              </td>
              <td>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png" />
                  </li>
                
                </ul>
              </td>
              <td className="text-center">
                      <img
                        src={stripe}
                        alt="Payment Gateway 1"
                        style={{ maxWidth: '50px', maxHeight: '50px'  }}
                      />
                    </td>
              <td className="project-state">
                <span className="badge badge-success">Success</span>
              </td>
              <td className="project-actions text-right">
               
                
                <a className="btn btn-info btn-sm" href="#">
                  <i className="fas fa-pencil-alt">
                  </i>
                  Edit
                </a>
                <a className="btn btn-danger btn-sm" href="#">
                  <i className="fas fa-trash">
                  </i>
                  Delete
                </a>
              </td>
            </tr>

            <tr>
              <td>
                #
              </td>
              <td>
                <a>
                 Addon Anela
                </a>
                <br />
                <small>
                  Date 01.01.2019
                </small>
              </td>
              <td>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png" />
                  </li>
                
                </ul>
              </td>
              <td className="text-center">
                      <img
                        src={squre}
                        alt="Payment Gateway 1"
                        style={{ maxWidth: '50px', maxHeight: '50px'  }}
                      />
                    </td>
              <td className="project-state">
                <span className="badge badge-success">Success</span>
              </td>
              <td className="project-actions text-right">
               
                
                <a className="btn btn-info btn-sm" href="#">
                  <i className="fas fa-pencil-alt">
                  </i>
                  Edit
                </a>
                <a className="btn btn-danger btn-sm" href="#">
                  <i className="fas fa-trash">
                  </i>
                  Delete
                </a>
              </td>
            </tr>

            <tr>
              <td>
                #
              </td>
              <td>
                <a>
                 Addon Anela
                </a>
                <br />
                <small>
                  Date 01.01.2019
                </small>
              </td>
              <td>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png" />
                  </li>
                
                </ul>
              </td>
              <td className="text-center">
                      <img
                        src={payoneer}
                        alt="Payment Gateway 1"
                        style={{ maxWidth: '50px', maxHeight: '50px'  }}
                      />
                    </td>
              <td className="project-state">
                <span className="badge badge-success">Success</span>
              </td>
              <td className="project-actions text-right">
               
                
                <a className="btn btn-info btn-sm" href="#">
                  <i className="fas fa-pencil-alt">
                  </i>
                  Edit
                </a>
                <a className="btn btn-danger btn-sm" href="#">
                  <i className="fas fa-trash">
                  </i>
                  Delete
                </a>
              </td>
            </tr>

            <tr>
              <td>
                #
              </td>
              <td>
                <a>
                 Addon Anela
                </a>
                <br />
                <small>
                  Date 01.01.2019
                </small>
              </td>
              <td>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png" />
                  </li>
                
                </ul>
              </td>
              <td className="text-center">
                      <img
                        src={bank}
                        alt="Payment Gateway 1"
                        style={{ maxWidth: '50px', maxHeight: '50px'  }}
                      />
                    </td>
              <td className="project-state">
                <span className="badge badge-success">Success</span>
              </td>
              <td className="project-actions text-right">
               
                
                <a className="btn btn-info btn-sm" href="#">
                  <i className="fas fa-pencil-alt">
                  </i>
                  Edit
                </a>
                <a className="btn btn-danger btn-sm" href="#">
                  <i className="fas fa-trash">
                  </i>
                  Delete
                </a>
              </td>
            </tr>

            <tr>
              <td>
                #
              </td>
              <td>
                <a>
                 Addon Anela
                </a>
                <br />
                <small>
                  Date 01.01.2019
                </small>
              </td>
              <td>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png" />
                  </li>
                
                </ul>
              </td>
              <td className="text-center">
                      <img
                        src={paypal}
                        alt="Payment Gateway 1"
                        style={{ maxWidth: '50px', maxHeight: '50px'  }}
                      />
                    </td>
              <td className="project-state">
                <span className="badge badge-success">Success</span>
              </td>
              <td className="project-actions text-right">
               
                
                <a className="btn btn-info btn-sm" href="#">
                  <i className="fas fa-pencil-alt">
                  </i>
                  Edit
                </a>
                <a className="btn btn-danger btn-sm" href="#">
                  <i className="fas fa-trash">
                  </i>
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

export default accepted_payment;
