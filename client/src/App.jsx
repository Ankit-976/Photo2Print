import React, { useState } from 'react'
import Navbar from './components/Navbar'
import HowItWorks from './components/HowItWorks';

const App = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar setOpen={setOpen} />
      <HowItWorks open={open} setOpen={setOpen} />
    </>
  )
}

export default App
