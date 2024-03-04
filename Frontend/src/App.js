import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Right } from './right';
import { Wrapper,GridContainer, Image } from './sty';
// import './App.css';


function App() {

  
const [showGrids, setShowGrids] = useState(false);
  useEffect(() => {
    // Trigger the animation after a delay (you can adjust the delay to your preference)
    setTimeout(() => {
      setShowGrids(true);
    }, 500);
  }, []);

  return (
    <Wrapper show={showGrids} >
        <div className='text-center text-5xl p-4'>Card Game</div>
      <GridContainer>
   <div className='imgcss'>
    
    <Image src='loginIMG.jpg' alt='noimg'></Image>
    
   </div>
   <div className='rightcssouter p-60'>
   <Right></Right>
   </div>
   </GridContainer>
    </Wrapper>
  );
}

export default App;
