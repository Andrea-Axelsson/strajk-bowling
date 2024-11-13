import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import Loading from "./pages/Loading"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import { motion } from 'framer-motion';

interface FormData {
  date: number;
  time: number;
  bowlers: number;
  lanes: number;
  shoeSize: number[];
}

interface FetchData {
  when: string
  lanes: number;
  people: number;
  shoes: number[];
  price: number;
  id: string;
  active: boolean;
}

function App() {
  const [submitClicked, setSubmitClicked] = useState<boolean>(false)
  const [fetchData, setFetchData] = useState<FetchData>({

      when: "",
      lanes: 0,
      people: 0,
      shoes: [],
      price: 0,
      id: "",
      active: true

  })

  const [menuClicked, setMenuClicked] = useState<boolean>(false)
  

  function clickMenu(){
    setMenuClicked((prev) => !prev)
    console.log("clicked")
    console.log("menuClicked", menuClicked)
  }

  const [formData, setFormData] = useState<FormData>({
    date: 0,
    time: 0,
    bowlers: 0,
    lanes: 0,
    shoeSize: []
});

useEffect(() => {
  if (submitClicked) {
    const fetchData = async () => {
      try {
        const response = await fetch('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', {
          method: 'POST',
          headers: {
            'x-api-key': '738c6b9d-24cf-47c3-b688-f4f4c5747662',
          },
          body: JSON.stringify({
            "when": `${formData.date}T${formData.time}`,
            "lanes": formData.lanes,
            "people": formData.bowlers,
            "shoes": formData.shoeSize
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP-fel! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setFetchData({
          when: data.when,
          lanes: data.lanes,
          people: data.people,
          shoes: data.shoes,
          price: data.price,
          id: data.id,
          active: data.active
        });
        
      } catch (error) {
        console.error('Fel vid hämtning av data:', error);
      } finally {
        setSubmitClicked(false); // Återställ för att förhindra upprepade anrop
      }
    }
    fetchData();
  }
}, [submitClicked, formData]);



  return (
  <>
  <Router>
  <motion.div
      className="menu__container" // Använder CSS-klassen för layout
      initial={{ x: '-100%' }}
      animate={{ x: menuClicked ? 0 : '-100%' }}
      transition={{ type: 'tween', duration: 0.5 }}
      style={{ display: menuClicked ? 'flex' : 'none', zIndex: 4 }}
    >
      <Menu onClickMenu={clickMenu} />
    </motion.div>
    <div className="nav-layer" onClick={() => clickMenu()}>
    <Navbar/>
    </div>
    
      <Routes>
        <Route path="/" element={<Loading/>}/>
        <Route 
        path="booking" 
        element={<Booking formData={formData} setFormData={setFormData} submitClicked={submitClicked} setSubmitClicked={setSubmitClicked}/>}/>
        <Route 
        path="confirmation" 
        element={<Confirmation fetchData={fetchData}/>}/>
      </Routes>
    </Router>
       
    </>
  )
}

export default App
