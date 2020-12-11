import React, { useContext, useState } from 'react';
import { NewsContext } from '../../App';
import Loading from './Loading/Loading';
import './NewsList.css'

const NewsList = () => {
   const ContextStore = useContext(NewsContext)
   const newsData = ContextStore.newsData

   return (
      <div className="row my-3 text-center">
         {
            newsData ? newsData.articles.map(news => {
               const {urlToImage, description, publishedAt, title, source, content, url} = news
               const publishedDate = new Date(publishedAt).toDateString()
               return (
                  <>
                     <div className="col-md-3"></div>
                     <div className='col-md-6 card px-0 my-3'>
                     <div className='card-header'>
                        <img className="img-fluid" src={urlToImage} alt=""/>
                     </div>
                     <div className='card-body'>
                        <a href={url} target="_blank"><h4>{title}</h4></a>
                        <a href={url} target="_blank"><p>{content}</p></a>
                     </div>
                     <div className='card-footer d-flex justify-content-between bg-white'>
                        <small>Publish At <strong>{publishedDate}</strong> </small>
                        <a href={url} target="_blank" className="Source"><small>{source.name}</small></a>  
                     </div>
                  </div>
                  <div className="col-md-3"></div>
               </>
               )
            }) : <Loading></Loading>
         }
   </div>
   );
};

export default NewsList;