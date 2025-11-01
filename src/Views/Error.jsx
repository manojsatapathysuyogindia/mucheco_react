import React from 'react';
import Header from './Header';
// import { useNavigate } from 'react-router-dom';
function Error() {
  // const navigate = useNavigate();
  // navigate(`/page-not-found`)
  // alert(1);
  return (
    <>
     <Header class_bg='black_bg' />
    <div className="error_section">
        <img src={require("../image/error.png")} alt="" />
    </div>
    </>
    );
}

export default Error;