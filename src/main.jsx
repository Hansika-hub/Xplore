import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AssessmentProvider } from './context/AssessmentContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AssessmentProvider>
      <App />
    </AssessmentProvider>
  </React.StrictMode>
)
