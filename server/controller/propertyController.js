const Property = require('../models/PropertyModel');

const propertyController = {};

//sort By Newest 
propertyController.sortByDate = (req,res,next) => {
  Property.find({},null,{sort: {days_on_market: 'asc'}})
    .then(data => {
    const temp = []
    data.forEach((e)=>{
      temp.push({
        address: e.address,
        city: e.city,
        zip: e.zip,
        price: e.price,
        beds: e.beds,
        baths: e.baths,
        days: e.days_on_market,
        mls:e.mls,
        votes:e.votes,
        net_score:e.net_score
      })
    })
  
    res.locals.storage = temp;
    return next();
  })
    .catch(err => {
    res.status(400).json('Error:' + err)
    return next();
  })
}

//additional info
propertyController.additionalInfo = (req,res,next) => {
  const mls = req.params.mls;
  Property.find({mls:mls})
    .then(data => {
    // console.log(data);
    const temp = []
    data.forEach((e)=>{
      temp.push({
        year_built : e.year_built,
        squareFt : e.squareFT,
        price_perSqFt: e.price_perSqFt,
        hoa: e.hoa,
        property_type: e.property_type,
      })
    })
    res.locals.additional = temp;
    return next();
  })
    .catch(err => {
    res.status(400).json('Error:' + err)
    return next();
  })
}

//Upvote or downvote
propertyController.upOrDownVote = (req,res,next) => {
  const mls = req.params.mls;
  const votes = req.body.votes;
  const net_score = req.body.net_score;
  Property.findOneAndUpdate({mls:mls},{votes:votes, net_score:net_score},{new:true})
    .then(data => {
      const temp = []
      temp.push({votes:data.votes, net_score:data.net_score});
      res.locals.scores = temp;
      return next();
    })
    .catch(err => {
    res.status(400).json('Error:' + err)
    return next();
  })
}


module.exports = propertyController;