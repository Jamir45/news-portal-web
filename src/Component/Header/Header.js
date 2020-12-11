import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewsContext } from '../../App';
import category from '../Scource/category';
import './Header.css'

const Header = () => {
   const data = category
   const ContextStore = useContext(NewsContext)
   const {searchNews, setSearchNews, newsData, setNewsData} = ContextStore
   console.log(searchNews)

   const searchItemHandler = (event) => {
      ContextStore.setSelectedCategory(event.target.innerText)
   }

   const { register, handleSubmit, watch, errors } = useForm();
   const onSubmit = data =>{
      console.log(data)
      setSearchNews(data.search)
   };


   return (
      <div className="row mt-3">
         <div className='col-md-3'></div>
         <div className='col-md-6'>
            <h2 className="text-center p-3">News Portal Headline</h2>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
               <input
                  type="search"
                  className='form-control col-10'
                  placeholder='Type Anything & Press Enter' name="search" 
                  ref={register}
               />               
               <button onClick={() =>setNewsData(null)} className="btn btn-warning col-2" type="submit">Search</button>
            </form>
            {
               searchNews ? <div>
                  <button onClick={() => window.location.reload()} className="btn btn-warning form-control my-5">Back To Home</button>
               </div> : 
               <div className="categoryDiv">
               {
                  data && data.map( item => {
                     if (ContextStore.selectedCategory === item) {
                        return (
                           <span 
                           className="category bg-warning"
                           onClick={(e) => {
                              searchItemHandler(e)
                           }}
                        > 
                           {item} 
                        </span>
                        )
                     }else{
                        return (
                           <span 
                           className="category"
                           onClick={(e) => {
                              searchItemHandler(e)
                              setNewsData(null)
                           }}
                        > 
                           {item} 
                        </span>
                        )
                     }
                  })
               }
            </div>
            }
         </div>
         <div className='col-md-3'></div>
      </div>
   );
};

export default Header;