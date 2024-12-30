import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from './Routes/routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-screen-xl mx-auto'>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </div>
  </StrictMode>
);
