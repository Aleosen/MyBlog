import React, { useEffect } from 'react'
import { useState } from 'react'
import BlogCard from './BlogCard/BlogCard'
import { getPosts } from '../../services/postService'
import { tryParseJSON } from '../../utils/helpers'
import ReactPaginate from 'react-paginate'
import './Blog.css'
import { useNavigate } from 'react-router-dom'
import SearchComponent from '../../components/ui/SearchComponent'
import { useSearchParams } from 'react-router-dom'
import FilterPanel from './filters/FilterPanel'

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || ''
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState( 0); 
  const [inputPage, setInputPage] = useState('');
  const navigate = useNavigate()

     const fetchPosts = async (page) => {
        const encodedQuery = encodeURIComponent(searchQuery)
        const response = await getPosts(page, limit, 'time', encodedQuery);
        setData(response.posts);
        setTotalPages(response.totalPages);
  };


  
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

  const handleSearch = (query) =>{

    setSearchParams({search:query})
    setCurrentPage(0)
  }

  useEffect(() => {
    fetchPosts(currentPage);
  }, [searchQuery, currentPage]);

    
  return (
    <div className='w-full relative'>
      <FilterPanel/>
      <div className="w-full md:w-150 xl:w-200 mx-auto shadow-lg p-1">
      <SearchComponent onSearch={handleSearch} classes={'mb-5 mt-7'}/>
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
                categories={item.categories}
                />
            </li>
        )):(
          <h1 className="text-4xl text-center my-20">There is nothing found...</h1>
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
            <button type="submit" className="goto-button transition-all duration-300">
              Go
            </button>
      </form>
      </div>
    </div>
  )
}
