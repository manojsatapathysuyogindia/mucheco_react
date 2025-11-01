import React from 'react';
import Portfolio from '../Portfolio'

function SomeOfOurWork(props) {
 
  return (
    <>
  
   <Portfolio page={'Some-of-our-work'} type={props.type}/>
     
    </>
    );
}

export default SomeOfOurWork;