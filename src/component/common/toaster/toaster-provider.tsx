'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ManagedToaster = () => {
  return <ToastContainer
  autoClose= {5000}
  progressStyle={{ backgroundColor: "#FF5733" }} // Default color for all progress bars
   />;
};

export default ManagedToaster;
