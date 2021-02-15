import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';


export default (currentPage, postsPerPage, list, setPage, cssStyles) => {
  const indexOfLastItem = useMemo(() => {
    return currentPage * postsPerPage
  }, [currentPage, postsPerPage]);

  const indexOfFirstItem = useMemo(() => {
    return indexOfLastItem - postsPerPage
  }, [indexOfLastItem, postsPerPage]);

  const currentList = useMemo(() => {
    return list.slice(indexOfFirstItem, indexOfLastItem);
  }, [indexOfFirstItem, indexOfLastItem]);

  const goToPage = (event) => {
    if(event.target.text) {
      setPage(Number(event.target.text));
    }
  }

  let items = [];

  for (let i=1; i <= Math.ceil(list.length / postsPerPage); i++) {
    items.push(
      <Pagination.Item 
        className={cssStyles.active} 
        onClick={goToPage} 
        key={i} 
        active={i === currentPage}
      >
        {i}
      </Pagination.Item>
    )
  }

  const goToPrevPage = () => {
    if(currentPage > 1) {
      setPage(currentPage - 1);
    }
  }

  const goToNextPage = () => {
    if(currentPage < Math.ceil(list.length / postsPerPage)) {
      setPage(currentPage + 1);
    }
  }

  return { currentList, items, goToNextPage, goToPrevPage }
}