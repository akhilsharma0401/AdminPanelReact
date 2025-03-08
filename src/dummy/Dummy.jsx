// import React, { useState } from 'react';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import { FaGoogle } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import './Dummy.css';

// import celitix_logo from '../assets/images/celitix-logo-white.svg'

// const Dummy = () => {
//     const [isSignUp, setIsSignUp] = useState(false);

//     // Toggle between Sign In and Sign Up
//     const handleSignUpClick = () => {
//         setIsSignUp(true);
//     };

//     const handleSignInClick = () => {
//         setIsSignUp(false);
//     };

//     return (
//         <div className='parent-container-login' >

//             <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
//                 <div className="form-container sign-up-container">
//                     <form action="#">
//                         <h1 className='head' >Create Account</h1>
//                         <div className="social-container">
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-facebook-f"></i> */}
//                                 <FacebookOutlinedIcon />
//                             </a>
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-google-plus-g"></i> */}
//                                 <FaGoogle />
//                             </a>
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-linkedin-in"></i> */}
//                                 <FaLinkedin />
//                             </a>
//                         </div>
//                         <span className='span' >or use your email for registration</span>
//                         <input type="text" placeholder="Name" />
//                         <input type="email" placeholder="Email" />
//                         <input type="password" placeholder="Password" />
//                         <button className="btn" >Sign Up</button>
//                     </form>
//                 </div>

//                 <div className="form-container sign-in-container">
//                     <form action="#">
//                         <h1 className='head'>Sign in</h1>
//                         <div className="social-container">
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-facebook-f"></i> */}
//                                 <FacebookOutlinedIcon />
//                             </a>
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-google-plus-g"></i> */}
//                                 <FaGoogle />
//                             </a>
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-linkedin-in"></i> */}
//                                 <FaLinkedin />
//                             </a>
//                         </div>
//                         <span className='span'>or use your account</span>
//                         <input type="email" placeholder="Email" />
//                         <input type="password" placeholder="Password" />
//                         <a href="#" onClick={handleSignUpClick} >Forgot your password?</a>

//                         <button className="btn" >Sign In</button>
//                     </form>
//                 </div>

//                 <div className="overlay-container">
//                     <div className="overlay">
//                         <div className="overlay-panel overlay-left">
//                             <h1 className='head'>Welcome Back!</h1>
//                             <p className='para' >To keep connected with us please login with your personal info</p>
//                             <button className="btn" onClick={handleSignInClick}>
//                                 Sign In
//                             </button>
//                         </div>
//                         <div className="overlay-panel overlay-right">
//                             {/* <h1 className='head'>Hello, Friend!</h1> */}
//                             <a href="index.jsp">
//                                 <img src={celitix_logo} className="mb-2 w-65" alt="Celitix"></img>
//                             </a>
//                             <p className='para' >Welcome to the Future of Customer Communication - Your Engagement Journey Begins Here.</p>
//                             {/* <button className="ghost" onClick={handleSignUpClick}>
//                                 Sign Up
//                             </button> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default Dummy;

import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

const Dummy = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Italy', code: 'IT' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name" placeholder="Select a Country"
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>
    )
}

export default Dummy


















// import React, { useState, useEffect } from 'react';
// import { Paper, Typography, Box, Button, IconButton } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { Dialog } from 'primereact/dialog';
// import { FaSync, FaTrash, FaEye, FaEdit } from "react-icons/fa";
// import toast from 'react-hot-toast';

// import UniversalButton from '../components/UniversalButton';
// import InputField from '../../components/layout/InputField';
// import { getWabaList, updateWabaDetails } from '../../apis/whatsapp/whatsapp';
// import Loader from '../components/Loader';

// const WhatsappManageWaba = () => {
//   const [wabaList, setWabaList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [editModal, setEditModal] = useState(false);
//   const [description, setDescription] = useState("");
//   const [selectedWaba, setSelectedWaba] = useState(null);

//   useEffect(() => {
//     const fetchWabaList = async () => {
//       try {
//         setIsLoading(true);
//         const response = await getWabaList();
//         console.log("Fetched WABA List:", response);
//         setWabaList(response?.length > 0 ? response : []);
//       } catch (error) {
//         console.error("Error fetching WABA list:", error);
//         toast.error("Error fetching WABA list.");
//         setWabaList([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchWabaList();
//   }, []);

//   const updateDetails = async () => {
//     const data = {
//       "messaging_product": "whatsapp",
//       "description": description.trim(),
//     };

//     await updateWabaDetails(data, selectedWaba.wabaNumber);
//     setEditModal(false);
//     toast.success("Profile updated successfully.");
//   };

//   const rows = Array.isArray(wabaList) ? wabaList.map((waba, index) => ({
//     id: index + 1,
//     sn: index + 1,
//     wabaName: waba.name || 'N/A',
//     wabaNumber: waba.mobileNo || 'N/A',
//     status: waba.status || 'N/A',
//   })) : [];

//   return (
//     <div className="p-6">
//       {isLoading ? (
//         <p>Loading data...</p>
//       ) : rows.length > 0 ? (
//         <Paper sx={{ height: 558 }}>
//           <DataGrid
//             rows={rows}
//             columns={[
//               { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
//               { field: 'wabaName', headerName: 'WABA Name', flex: 1, minWidth: 120 },
//               { field: 'wabaNumber', headerName: 'WABA Mobile No.', flex: 1, minWidth: 120 },
//               { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
//               {
//                 field: 'action',
//                 headerName: 'Action',
//                 flex: 1,
//                 minWidth: 150,
//                 renderCell: (params) => (
//                   <div className="flex space-x-2">
//                     <IconButton onClick={() => setEditModal(true)}><FaEdit className="text-gray-500" /></IconButton>
//                     <IconButton><FaSync className="text-blue-500" /></IconButton>
//                     <IconButton><FaTrash className="text-red-500" /></IconButton>
//                   </div>
//                 ),
//               },
//             ]}
//             pageSizeOptions={[10, 20, 50]}
//             pagination
//             disableColumnResize
//             disableColumnMenu
//           />
//         </Paper>
//       ) : (
//         <div className='w-full flex items-center justify-center h-[80vh]'>
//           <div className='text-center p-10 rounded-xl shadow-md bg-white space-y-3'>
//             <h1 className='font-semibold text-xl'>No data available!</h1>
//             <p className='mb-6 font-medium'>No WABA accounts found. Please add a new WABA account.</p>
//             <Button variant="contained" color="primary">Add New WABA</Button>
//           </div>
//         </div>
//       )}

//       <Dialog header="Edit Profile" visible={editModal} onHide={() => setEditModal(false)}>
//         <InputField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//         <Button onClick={updateDetails}>Save</Button>
//       </Dialog>
//     </div>
//   );
// };

// export default WhatsappManageWaba;

