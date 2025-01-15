import React from 'react';
import { NavLink } from 'react-router-dom'

const Pages = () => {
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
            <th style={{width: '2%'}} className="text-center">
                SL
              </th>
              <th style={{width: '10%'}} className="text-center">
                Page Name
              </th>
              <th style={{width: '15%'}} className="text-center">
                Page Slug
              </th>
             
              <th style={{width: '15%'}} className="text-center">
                Page Layout
              </th>
              <th style={{width: '10%'}} className="text-center">
                Status
              </th>
              <th style={{width: '15%'}} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                1
              </td>
              <td>
                <a>
                 Psychics
                </a>
                
              </td>
             
             
              <td className="project-state">
                <p>Psychics</p>
              </td>
              <td className="project-state">
               <p>Full Width, Page Layout</p>
              </td>
              <td className="project-state">
                <span className="badge badge-success">Active</span>
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
                2
              </td>
              <td>
                <a>
                Horoscopes
                </a>
              
              </td>
              <td className="project-state">
                <p> Horoscopes</p>
                            </td><td className="project-state">
                <p>Horoscopes Layout </p>
              </td>
              <td className="project-state">
                <span className="badge badge-success">Active</span>
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
                3
              </td>
              <td>
                <a>
               Love
                </a>
              
              </td>
              <td className="project-state">
                <p> Love Page</p>
                            </td><td className="project-state">
                <p>Love Layout </p>
              </td>
              <td className="project-state">
                <span className="badge badge-success">Active</span>
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
                4
              </td>
              <td>
                <a>
               Blogs
                </a>
              
              </td>
              <td className="project-state">
                <p> Blogs Category</p>
                            </td><td className="project-state">
                <p>Blogs Gallery </p>
              </td>
              <td className="project-state">
                <span className="badge badge-success">Active</span>
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
                5
              </td>
              <td>
                <a>
                How it Works
                </a>
              
              </td>
              <td className="project-state">
                <p> Term Conditions</p>
                            </td><td className="project-state">
                <p>How work Layout </p>
              </td>
              <td className="project-state">
                <span className="badge badge-success">Active</span>
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
                6
              </td>
              <td>
                <a>
                Pricing
                </a>
              
              </td>
              <td className="project-state">
                <p>Pricing Packages</p>
                            </td><td className="project-state">
                <p>Pricing Layouts  </p>
              </td>
              <td className="project-state">
                <span className="badge badge-success">Active</span>
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
                7
              </td>
              <td>
                <a>
                Contact us
                </a>
              
              </td>
              <td className="project-state">
                <p> Contact us</p>
                            </td><td className="project-state">
                <p>Contact ,Email </p>
              </td>
              <td className="project-state">
                <span className="badge badge-success">Active</span>
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

export default Pages;
