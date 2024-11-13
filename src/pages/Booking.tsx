import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  date: number;
  time: number;
  bowlers: number;
  lanes: number;
  shoeSize: number[];
}

interface BookingProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  submitClicked: boolean;
  setSubmitClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const Booking: React.FC<BookingProps> = ({formData, setFormData, submitClicked, setSubmitClicked}) => {



const [errorMessage, setErrorMessage] = useState<string>('')
const [maxPeopleOnLane, setMaxPeopleOnLane] = useState<number>(0)
const navigate = useNavigate()

const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
  // Extraherar 'name' och 'value' från den aktuella inputen (antingen en select eller input)
  const { name, value } = e.target;

  // Om det är fältet för antal bowlers som ändras
  if (name === "bowlers") {
    // Konverterar det nya värdet till ett nummer
    const newBowlerCount = Number(value);
    
    // Uppdaterar 'formData' med det nya antalet bowlers och anpassar 'shoeSize'-arrayen
    setFormData((prevData) => ({
      ...prevData,
      bowlers: newBowlerCount, // Sätter antalet bowlers till det nya värdet
      shoeSize: prevData.shoeSize.slice(0, newBowlerCount) // Bevarar bara de värden som behövs i 'shoeSize' baserat på antalet bowlers
    }));
  
  // Om inputen är en av skostorlekarna
  } else if (name.startsWith("shoeSize")) {
    // Extraherar indexet för vilken bowler detta gäller (exempelvis 'shoeSize0' blir 0)
    const index = Number(name.replace("shoeSize", ""));
    
    // Kopierar den nuvarande 'shoeSize'-arrayen för att uppdatera ett specifikt värde
    const newShoeSize = [...formData.shoeSize];
    newShoeSize[index] = Number(value); // Uppdaterar skostorleken för den specifika bowlern

    // Sätter 'formData' med den uppdaterade 'shoeSize'-arrayen
    setFormData((prevData) => ({
      ...prevData,
      shoeSize: newShoeSize
    }));
  
  // Hanterar alla andra fält i formuläret
  } else {
    // Uppdaterar 'formData' för andra fält som inte är 'bowlers' eller 'shoeSize'
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    
  }
};

useEffect(() => {
  setMaxPeopleOnLane(formData.lanes * 4)
}, [formData.lanes])


// Typa handleSubmit
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  if(formData.bowlers > maxPeopleOnLane){
    setErrorMessage("Too many bowlers, max 4 bowlers per lane")
  }else if(formData.lanes > formData.bowlers){
    setErrorMessage("Too many lanes, minimum 1 bowler per lane") 
  }else{
    setErrorMessage("")
    setSubmitClicked(true)
    navigate('/confirmation')
  }
  console.log('Form data submitted:', formData);
  // Lägg till logik för att hantera inskickad data
};

  return (
    <>
    <section className='container'>
      
      <section className='content'>
        <img src="images/logo.svg" alt="logo" className="logo" />
        <h1 className="title">BOOKING</h1>
      
        <div className="text-line">
        <span>WHEN, WHAT & WHO</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='input-row'>
          <div className='input-div'>
              <span><label className='input-label'>DATE</label></span>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className='input'
                />
            </div>
          
          <div className='input-div'>
              <span><label className='input-label'>TIME</label></span>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className='input'
                />
            </div>
          </div>

          <div className='input-div'>
          <span><label className='input-label'>NUMBER OF AWESOME BOWLERS</label></span>
                <input
                    type="number"
                    name="bowlers"
                    value={formData.bowlers}
                    onChange={handleChange}
                    min="1"
                    required
                    className='input'
                />
            </div>
            
            <div className='input-div'>
                <span><label className='input-label'>NUMBER OF LANES</label></span>
                <input
                    type="number"
                    name="lanes"
                    value={formData.lanes}
                    onChange={handleChange}
                    min="1"
                    required
                    className='input'
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                        e.preventDefault();
                      }
                    }}
                />
            </div>

{formData.bowlers > 0 && <div className="text-line-shoes">
            <span>SHOES</span>
            </div>}

        {Array.from({ length: formData.bowlers }, (_, i) => (
        <div key={i} className="input-div">
          <span><label className="input-label">SHOE SIZE / PERSON {i + 1}</label></span>
          <select
            id={`options-${i}`}
            name={`shoeSize${i}`}
            value={formData.shoeSize[i] || ""}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Choose</option>
            {[...Array(24)].map((_, j) => (
              <option key={j} value={27 + j}>
                {27 + j}
              </option>
            ))}
          </select>
        </div>
      ))}
{errorMessage && <p className='error'>{errorMessage}</p>}
            <button className='submit' type="submit">STRIIIIIKE!</button>
        </form>
      </section>
    </section>
    </>
  )
}

export default Booking