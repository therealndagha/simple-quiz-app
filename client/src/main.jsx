
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import QuizAppContextProvider from '../context/index.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        
    <QuizAppContextProvider>
          <App />
    </QuizAppContextProvider>
    </BrowserRouter>

   
  
)
