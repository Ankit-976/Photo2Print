import React, { useState } from 'react'
import Navbar from './components/Navbar'
import HowItWorks from './components/HowItWorks'
import Form from './components/Form'

const App = () => {

  const [open, setOpen] = useState(false)
  return (
    <>
      <Navbar setOpen={setOpen} />
      <HowItWorks open={open} setOpen={setOpen} />
      <Form />
    </>
  )
}

export default App
