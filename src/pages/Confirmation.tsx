import React from 'react'
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';

interface FetchData {
  when: string
  lanes: number;
  people: number;
  shoes: number[];
  price: number;
  id: string;
  active: boolean;
}

interface ConfirmationProps{
  fetchData: FetchData
}

const Confirmation: React.FC<ConfirmationProps> = ({fetchData}) => {
  return (
    <>
    {!fetchData.when ?
    
    <section className='container'>
    <section className='content'>
    
      <img src="images/logo.svg" alt="logo" className="logo" />
      <h1 className="title">YOU HAVENT BOOKED ANYTHING YET</h1>
              <Link to="/" className="link-wrapper">
              <button className="submit">START BOOKING!</button>
              </Link>
    </section>
  </section>
  : 
    <section className='container'>
    <section className='content'>
    
      <img src="images/logo.svg" alt="logo" className="logo" />
      <h1 className="title">SEE YOU SOON</h1>
    
      <div className="text-line">
      <span>BOOKING DETAILS</span>
      </div>

      <div className='input-div'>
            <span><p className='input-label'>WHEN</p></span>
              <div className='input'>
                <p>{fetchData.when.replace("T", ", ")}</p>
              </div>
      </div>
      <div className='input-div'>
            <span><p className='input-label'>WHO</p></span>
              <div className='input'>
                <p>{fetchData.people < 2 ? `${fetchData.people} person` : `${fetchData.people} people`}</p>
              </div>
      </div>
      <div className='input-div'>
            <span><p className='input-label'>LANES</p></span>
              <div className='input'>
                <p>{fetchData.lanes < 2 ? `${fetchData.lanes} lane` : `${fetchData.lanes} lanes`}</p>
              </div>
      </div>
      <div className='input-div'>
            <span><p className='input-label'>BOOKING NUMBER</p></span>
              <div className='input'>
                <p>{fetchData.id}</p>
              </div>
      </div>
      

              <div className='total'>
                <strong><p>total</p></strong>
                <p>{`${fetchData.price}sek`}</p>
              </div>
              <Link to="/" className="link-wrapper">
              <button className="submit">SWEET LET'S GO!</button>
              </Link>
    </section>
  </section>
    }
    
    </>
  )
}

export default Confirmation