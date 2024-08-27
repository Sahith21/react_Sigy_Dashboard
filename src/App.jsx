import React from 'react'
import Landingpage from './vendor dashboard/pages/Landingpage'
import {Routes,Route} from 'react-router-dom'
import "./App.css"
import Notfound from './vendor dashboard/components/Notfound'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Landingpage />} />
        <Route path='/*' element = {<Notfound />} />
      </Routes>
    </div>
  )
}

export default App