import React from 'react';

const Account = () => {
  return (

    // <div className="container">
    //   <div className=" row d-flex pt-5 ">
    //     <div className=" d-flex justify-content-between  ">
    //       <div className="d-flex">
    //         <h6 style={{ opacity: '50%' }}>Home /</h6>
    //         <h6 className="ms-2 "> My Account </h6>
    //       </div>
    //       <div className="justify-content-end ">
    //         <h6>Welcome!</h6>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="container d-flex pt-4">
    //     <div className="pt-3">
    //       <div
    //         className="flex-shrink-0 p-3 bg-white"
    //         style={{ width: '280px' }}
    //       >
    //         <a
    //           href="/"
    //           class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
    //         >
    //           <svg class="bi me-2" width="30" height="24">
    //             {/* <use xlink:href="#bootstrap" /> */}
    //           </svg>
    //           <span class="fs-5 fw-semibold">Collapsible</span>
    //         </a>
    //         <ul class="list-unstyled ps-0">
    //           <li class="mb-1">
    //             <button
    //               class="btn btn-toggle align-items-center rounded collapsed"
    //               data-bs-toggle="collapse"
    //               data-bs-target="#home-collapse"
    //               aria-expanded="true"
    //             >
    //               Home
    //             </button>
    //             <div class="collapse show" id="home-collapse">
    //               <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Overview
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Updates
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Reports
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //           <li class="mb-1">
    //             <button
    //               class="btn btn-toggle align-items-center rounded collapsed"
    //               data-bs-toggle="collapse"
    //               data-bs-target="#dashboard-collapse"
    //               aria-expanded="false"
    //             >
    //               Dashboard
    //             </button>
    //             <div class="collapse" id="dashboard-collapse">
    //               <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Overview
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Weekly
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Monthly
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Annually
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //           <li class="mb-1">
    //             <button
    //               class="btn btn-toggle align-items-center rounded collapsed"
    //               data-bs-toggle="collapse"
    //               data-bs-target="#orders-collapse"
    //               aria-expanded="false"
    //             >
    //               Orders
    //             </button>
    //             <div class="collapse" id="orders-collapse">
    //               <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     New
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Processed
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Shipped
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Returned
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //           <li class="border-top my-3"></li>
    //           <li class="mb-1">
    //             <button
    //               class="btn btn-toggle align-items-center rounded collapsed"
    //               data-bs-toggle="collapse"
    //               data-bs-target="#account-collapse"
    //               aria-expanded="false"
    //             >
    //               Account
    //             </button>
    //             <div class="collapse" id="account-collapse">
    //               <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     New...
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Profile
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Settings
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" class="link-dark rounded">
    //                     Sign out
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>

    //     <form class="custom-form row mx-4 pt-4">
    //       <h4
    //         style={{
    //           fontFamily: 'Poppins',

    //           fontSize: '20px',
    //           color: '#DB4444',
    //         }}

    //       >
    //         Edit Your Profile
    //       </h4>
    //       <div class="form-row">

    //         <div class="row d-flex">
    //           <div class="form-group col-md-6  col-sm-12">

    //             <label for="inputFirst">First Name</label>
    //             <input
    //               type="first"
    //               class="form-control"
    //               id="inputFirst"
    //               placeholder="Md"
    //             />
    //           </div>

    //           <div class="form-group col-md-6  col-sm-12">


    //             <label for="inputLast">Last Name</label>
    //             <input
    //               type="last"
    //               class="form-control"
    //               id="inputLast"
    //               placeholder="Rimel"
    //             />
    //           </div>
    //   </div>

    //         <div class=" row d-flex">
    //           <div class="form-group col-md-6 col-sm-12">

    //             <label for="inputPassword4">Email</label>
    //             <input
    //               type="Email"
    //               class="form-control"
    //               id="inputEmail"
    //               placeholder="rimel1111@gmail.com"
    //             />
    //           </div>

    //           <div class="form-group col-md-6  col-sm-12">

    //             <label for="inputAddress">Address</label>
    //             <input
    //               type="address"
    //               class="form-control"
    //               id="inputAddress"
    //               placeholder="Kingston, 5236, United State"
    //             />
    //           </div>
    //         </div>
    //       </div>


    //       <div className="col-md-12 ">


    //         <div class="form-group">
    //           <label for="inputAddress2">Password Changes</label>
    //           <input
    //             type="text"
    //             class="form-control"
    //             id="inputAddress2"
    //             placeholder="Current Passwod"
    //           />
    //         </div>
    //         <div class="form-group pt-2">
    //           <input
    //             type="text"
    //             class="form-control"
    //             id="inputAddress2"
    //             placeholder="New Passwod"
    //           />
    //         </div>
    //         <div class="form-group pt-2">
    //           <input
    //             type="text"
    //             class="form-control"
    //             id="inputAddress2"
    //             placeholder="Confirm New Passwod"
    //           />
    //         </div>
    //       </div>

    //       <div className=" d-flex justify-content-end">
    //         <button
    //           type="cancle"
    //           style={{
    //             border: '0',
    //             backgroundColor: '#ffffff',
    //             width: '140px',
    //             height: '56px',
    //           }}
    //         >
    //           <span>Cancle</span>
    //         </button>

    //         <button type="submit" class="custom-style ">
    //           Save Changes
    //         </button>
    //       </div>

    //     </form>
    //   </div>
    // </div>
  );
};

export default Account;
