import React, {useEffect, useState} from 'react';
import Modals from './Modals';

const Box = (props) => {
    const [Modal, setModal] = useState(props.showModal);
    const [additionalInfo, setInfo] = useState([]);
    const [score, setScore] = useState([props.info.votes,props.info.net_score]);

    //fetch additional info
    const fetchInfo = () => {
      //fetch using props.address 
    fetch(`http://localhost:8000/api/properties/additionalInfo/${props.info.mls}`)
    .then((res)=> res.json())
    .then((data) => {
      setInfo(data);
      setModal(true);
    })
    .catch(err => console.log(err));
    };
     
    //Up vote down vote functionality 
    const upOrDownVote = (str) => {
      if (str === "upvote") {
        //fetch request to increase value 
        const patchObj = {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            votes:score[0]+1,
            net_score:score[1]+1
          })
        };
         fetch(`http://localhost:8000/api/properties/upvoteOrDownvote/${props.info.mls}`,patchObj)
          .then((res)=> res.json())
          .then((data) => {

             setScore([data[0].votes, data[0].net_score]);
          })
          .catch(err => console.log(err));
      } else {
        //fetch request to decrease value 
        const patchObj = {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            votes:score[0]-1,
            net_score:score[1]+1
          })
        };
         fetch(`http://localhost:8000/api/properties/upvoteOrDownvote/${props.info.mls}`,patchObj)
          .then((res)=> res.json())
          .then((data) => {
            console.log(data);
             setScore([data[0].votes, data[0].net_score]);
          })
          .catch(err => console.log(err));
      }
    }
     return (
    <div className="boxCard">
      
      <div className="boxInfo">Price: {props.info.price}</div>
      <div className="boxInfo">Address: {props.info.address}</div>
      <div className="boxInfo">City: {props.info.city}</div>
      <div className="boxInfo">ZIP/Postal: {props.info.zip}</div>
      <div className="boxInfo">Beds: {props.info.beds}</div>
      <div className="boxInfo">Baths: {props.info.baths}</div>
      <div className="boxInfo">Days on the Market: {props.info.days}</div>
      <button className="btn" onClick={()=>{
          fetchInfo();
        }}>
          Click for more info
      </button>
      <button className="btn" onClick={()=>{upOrDownVote("upvote")}}>Upvote</button>
      <button className="btn" onClick={()=>{upOrDownVote("downvote")}}>Downvote</button>
      <Modals className="modal" Modal={Modal} Modalfunc={setModal} Mls={props.info.mls} AddInfo={additionalInfo}/>
    </div>
    
  )
}

export default Box; 