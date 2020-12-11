import React, { useContext, useState } from 'react';
import { NewsContext } from '../../App';

const Pagination = (props) => {
   const [customPagination, setCustomPagination] = useState(false)

   const ContextStore = useContext(NewsContext)
   const newsData = ContextStore.newsData
   const totalPage = Math.ceil(newsData ? newsData.totalResults / 10 : 1 / 10)

   const {page, setPage} = ContextStore
   const customPaginationValue = (event) => {
      setPage(parseFloat(event.target.value))
   }
   const okBtn = () => {
      setPage(page)
      setCustomPagination(false)
   }


   return (
      <div className="row py-3 mb-5">
         <div className="col-md-3"></div>
         <div className="col-md-6">
            <div className="row">
               <button onClick={() =>{
                  ContextStore.page > 1 && ContextStore.setPage(ContextStore.page-1)
                  props.scrollFunc()
                  }} className="btn btn-warning col-2">Previous</button>
               <div className="flex-grow-1 text-center col-8">
                  {
                     customPagination ? <div className="row">
                        <div className="col-3"></div>
                        <input className="col-4" onBlur={(e) => {
                        customPaginationValue(e)
                        }} type="number" defaultValue={ContextStore.page}/>
                        <button onClick={() => okBtn()} className="btn btn-warning col-2">OK</button>
                        <div className="col-3"></div>
                     </div> : 
                     <p 
                        style={{
                           userSelect:'none', 
                           lineHeight:'1.1', 
                           cursor:'pointer',
                        }}
                        title='Double To Jump Page'
                        onDoubleClick={() => setCustomPagination(true)}
                     >
                        Page {ContextStore.page} out of {totalPage}
                        <br/>
                        <small>Double Tab To Jump Page</small>
                     </p>
                  }
               </div>
               <button onClick={() => {
                  totalPage > 1 && ContextStore.setPage(ContextStore.page+1)
                  props.scrollFunc()
                  }} className="btn btn-warning col-2">Next</button>
            </div>
         </div>
         <div className="col-md-3"></div>
      </div>
   );
};

export default Pagination;