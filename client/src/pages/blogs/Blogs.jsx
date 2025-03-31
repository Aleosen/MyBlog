import React, { useEffect } from 'react'
import { useState } from 'react'
import BlogCard from './BlogCard/BlogCard'
import { getPosts } from '../../services/postService'
import { tryParseJSON } from '../../utils/helpers'
import ReactPaginate from 'react-paginate'
import './Blog.css'
import { useNavigate } from 'react-router-dom'

export default function Blogs() {
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const limit = 5; 
    const [currentPage, setCurrentPage] = useState( 0); 


    const navigate = useNavigate()
     const fetchPosts = async (page) => {
        const response = await getPosts(page+1, limit);
        setData(response.posts);
        setTotalPages(response.totalPages);
  };

  const [inputPage, setInputPage] = useState('');

  
  const handleGoToPage = (e) => {
    e.preventDefault();
    const pageNum = parseInt(inputPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange({ selected: pageNum - 1 });
    }
    setInputPage('');
  };

  const handlePageChange = (selectedPage) => {
    const newPage = selectedPage.selected + 1;
    setCurrentPage(selectedPage.selected);
    fetchPosts(selectedPage.selected);
    navigate(`/blogs?page=${newPage}`);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    fetchPosts(selectedPage.selected);
    const newPage = selectedPage.selected + 1;
    navigate(`/blogs?page=${newPage}`);
  };


  useEffect(() => {
    fetchPosts(currentPage);
  }, []);

    
  return (
    <div className='w-full'>
      <div className="w-full md:w-183 mx-auto shadow-lg p-1">
        <ul className='w-full'>
        {data.length>0 ? (data.map(item =>
            <li key={item.post_id}>
                <BlogCard 
                id={item.post_id}
                username={item.username}
                title={item.title}
                date={item.created_at} 
                content={typeof item.content === 'string' ? tryParseJSON(item.content) : item.content}
                likes={item.likes_count}
                views={item.views_count} 
                media_url={item.media_url}
                />
            </li>
        )):(
          <h1 className="text-4xl text-center my-20">There is no blogs yet...</h1>
        )}
        </ul>
        <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        marginPagesDisplayed={1} 
        pageRangeDisplayed={1} 
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        renderOnZeroPageCount={null} 
      />
      <form onSubmit={handleGoToPage} className="goto-form">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              placeholder="№"
              className="goto-input"
            />
            <button type="submit" className="goto-button">
              Go
            </button>
      </form>
      </div>
    </div>
  )
}
