
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import QuizContextProvider from './context/index.jsx'


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    
    <QuizContextProvider>
          <App />
    </QuizContextProvider>

    </BrowserRouter>

   
  
)
