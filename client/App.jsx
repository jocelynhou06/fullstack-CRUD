import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import Box from './components/Boxes';
import './stylesheets/App.css';

const PER_PAGE = 25;
const App = (props) => {
  //Information is saved
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  
  //Sort Functions 
  const sortPrice = (sortByHigh) => {
     let temp = posts.sort(function (a,b) {
        if (sortByHigh === false) return a.price - b.price;
        return b.price - a.price
      });
    setPosts([...temp]);
  };
  const sortBeds = (sortByHigh) => {
    let temp = posts.sort(function (a,b) {
        if (sortByHigh === false) return a.beds - b.beds;
        return b.beds - a.beds
      });
    setPosts([...temp]);
    };

  const sortDate = (sortByHigh) => {
    let temp = posts.sort(function (a,b) {
        if (sortByHigh === false) return b.days - a.days;
        return a.days - b.days;
      });
    setPosts([...temp]);
  };
  
  const sortScore = (sortByHigh) => {
     fetch('http://localhost:8000/api/properties/default')
    .then(res=> res.json())
    .then((data) => {

       let temp = data.sort(function (a,b) {
        if (sortByHigh === false) return a.net_score - b.net_score;
        return b.net_score - a.net_score;
      });
    setPosts([...temp])
    })
    .catch(err => err);
  };
  const sortVotes = (sortByHigh) => {
   fetch('http://localhost:8000/api/properties/default')
    .then(res=> res.json())
    .then((data) => {

       let temp = data.sort(function (a,b) {
        if (sortByHigh === false) return a.votes - b.votes;
        return b.votes - a.votes;
      });
    setPosts([...temp])
    })
    .catch(err => err);
  }
  //fetch data from data base
  useEffect(() => {
     fetch('http://localhost:8000/api/properties/default')
    .then(res=> res.json())
    .then((data) => {
      setPosts(data);
    })
    .catch(err => err);
  },[]);
   
    //  const boxes = [];
    //   for (let i = 0; i < posts.length; i+=1) {
    //     boxes.push(<Box className="box" info={posts[i]} showModal={false}></Box>)
    //   };

    //Pagination implementation 
    const handlePageClick = ({ selected: selectedPage }) => {
      setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    const currentPageData = posts.slice(offset,offset + PER_PAGE).map((e)=> <Box className="box" info={e} showModal={false} ></Box>);
    const pageCount = Math.ceil(posts.length / PER_PAGE);


     return (
    <div className="app">
         <div className="title" >Reddit for Properties </div>
        <div className="optionsbar">
         <button className="btn"onClick={()=>{
              sortDate(true)}}>
               Newest</button>
         <button className="btn"onClick={()=>{
              sortDate(false)}}>
               Oldest</button>
        <button className="btn"onClick={()=>{
              sortPrice(true)}}>
               Highest Price</button>
        <button className="btn"onClick={()=>{
              sortPrice(false)}}>
               Lowest Price</button>
        <button className="btn"onClick={()=>{
              sortBeds(true)}}>
              Most Beds</button>
        <button className="btn"onClick={()=>{
              sortBeds(false)}}>
              Least Beds</button>
        <button className="btn"onClick={()=>{
              sortVotes(true)}}>
              Most Voted </button>
        <button className="btn"onClick={()=>{
              sortVotes(false)}}>
              Least Voted</button>
        <button className="btn"onClick={()=>{
              sortScore(true)}}>
              Most Popular</button>
        <button className="btn"onClick={()=>{
              sortScore(false)}}>
              Least Popular</button>
        </div>
         <div className="board">
          {currentPageData}
          <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
         </div>
    </div>
  );
}

export default App; 