import React, { useContext } from 'react';
import { NewsContext } from '../../App';

const Result = React.forwardRef((_, ref) => {
   const ContextStore = useContext(NewsContext)
   const newsData = ContextStore.newsData

   const totalPage = Math.ceil(newsData ? parseFloat(newsData.totalResults) / 10 : 1 / 20)
   console.log(typeof(totalPage))

   return (
      <div ref={ref} id="result" className="row">
         <div className="col-md-3"></div>
         <div className="col-md-6 d-flex justify-content-between">
            <small> About <strong>{newsData && newsData.totalResults}</strong> Result Found </small>
            <small> Page <strong>{ContextStore.page}</strong> out of <strong>{totalPage}</strong> </small>
         </div>
         <div className="col-md-3"></div>
      </div>
   );
});

export default Result;