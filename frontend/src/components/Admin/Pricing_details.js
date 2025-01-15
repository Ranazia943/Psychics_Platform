import React from 'react';

const Pricing_details = () => {
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
              <th style={{width: '10%'}} className="text-center">
                Plan Name
              </th>
              <th style={{width: '5%'}} className="text-center">
            Plan Price
              </th>
              
             
              <th style={{width: '15%'}} className="text-center">
                Button Text
              </th>
             
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
       Basic
        </a>
      </td>
      
      <td className="project-state">
        <p>$99</p>
      </td>
      <td className="project-state">
        <span className="badge badge-success">Active</span>
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
       Platinum
        </a>
      </td>
      
      <td className="project-state">
        <p>$199</p>
      </td>
      <td className="project-state">
        <span className="badge badge-success">Active</span>
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
      Gold
        </a>
      </td>
      
      <td className="project-state">
        <p>$299</p>
      </td>
      <td className="project-state">
        <span className="badge badge-success">Active</span>
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

export default Pricing_details;
