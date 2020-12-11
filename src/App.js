import React, { createContext, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Component/Header/Header';
import NewsList from './Component/NewsList/NewsList';
import Pagination from './Component/Pagination/Pagination';
import Axios from 'axios';
import Result from './Component/Result/Result';


export const NewsContext = createContext()
export const CategoryContext = createContext()

const App = () => {
  const [newsData, setNewsData] = useState()

  // Category
  const [selectedCategory, setSelectedCategory] = useState('general')

  // Set Pages
  const [page, setPage] = useState(1)

  // Set Custom Pagination 
  const [paginationNumber, setPaginationNumber] = useState('')

  // Search News
  const [searchNews, setSearchNews] = useState()

  // Third Party News API Link

  const URL = () => {
    let url = process.env.REACT_APP_SECRET
    if (selectedCategory) url += `&category=${selectedCategory}`
    if (page) url += `&page=${page}`
    if (searchNews) url += `&q=${searchNews}`
    return url
  }
  let news = URL()

  useEffect(() => {
    Axios.get(news)
      .then(result => {
        setNewsData(result.data)
      })
  }, [selectedCategory, page, searchNews])

  // All data and state sore
  const ContextStore = {newsData, setNewsData, page, setPage, paginationNumber, setPaginationNumber, selectedCategory, setSelectedCategory, searchNews, setSearchNews}

  // Scroll Top and Down
  const scrollToResultDiv = useRef()
  const scrollFunc = () => {
    window.scrollTo({
      top: scrollToResultDiv.current.offsetTop,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <NewsContext.Provider value={ContextStore}>
    <div className="container">
        <Header></Header>
        <Result ref={scrollToResultDiv} ></Result>
        <NewsList></NewsList>
        <Pagination scrollFunc={scrollFunc}></Pagination>
    </div>
    </NewsContext.Provider>
  );
};

export default App;