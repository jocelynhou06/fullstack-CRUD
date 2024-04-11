import React, {useEffect, useState} from 'react';

const Modals = (props) => {
    //depending on true or false render modal logic
    if(props.Modal === false ) {
      return null;
    };
    console.log(props.AddInfo);
     return (
      <div className="modalCard">
        <div className="modalInfo">Additional Info</div>
        <div className="modalInfo">Year Built: {props.AddInfo[0].year_built}</div>
        <div className="modalInfo">Square Ft: {props.AddInfo[0].squareFt}ft</div>
        <div className="modalInfo">Price per Square Ft: ${props.AddInfo[0].price_perSqFt}</div>
        <div className="modalInfo">Hoa: ${props.AddInfo[0].hoa}</div>
        <div className="modalInfo">Property Type: {props.AddInfo[0].property_type}</div>
        <button className="btn" id="exitModal" onClick={()=>{props.Modalfunc(false)}}>X</button>
      </div>
      
    );
}

export default Modals; 