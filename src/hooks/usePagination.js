import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';


// eslint-disable-next-line import/no-anonymous-default-export
export default (currentPage, postsPerPage, list, setPage, cssStyles, maxLimit, minLimit, setMaxLimit, setMinLimit, pageLimit) => {
  const indexOfLastItem = useMemo(() => {
    return currentPage * postsPerPage
  }, [currentPage, postsPerPage]);

  const indexOfFirstItem = useMemo(() => {
    return indexOfLastItem - postsPerPage
  }, [indexOfLastItem, postsPerPage]);

  const currentList = useMemo(() => {
    return list.slice(indexOfFirstItem, indexOfLastItem);
  }, [indexOfFirstItem, indexOfLastItem, list]);

  const numOfPages = useMemo(() => {
    return Math.ceil(list.length / postsPerPage);
  }, [list, postsPerPage])

  const goToPage = (event) => {
    if(event.target.text) {
      setPage(Number(event.target.text));
    }
  }

  let items = [];

  for (let i=1; i <= Math.ceil(list.length / postsPerPage); i++) {
    if(i < maxLimit + 1 && i > minLimit) {
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
  }

  const goToPrevPage = () => {
    if(currentPage > 1) {
      setPage(currentPage - 1);
      if ((currentPage - 1) % pageLimit === 0) {
        setMaxLimit(maxLimit - pageLimit);
        setMinLimit(minLimit - pageLimit);
      }
    }
  }

  const goToNextPage = () => {
    if(currentPage < Math.ceil(list.length / postsPerPage)) {
      setPage(currentPage + 1);
      if (currentPage + 1 > maxLimit) {
        setMaxLimit(maxLimit + pageLimit);
        setMinLimit(minLimit + pageLimit);
      }
    }
  }

  let incrementBtn = null;
  if(numOfPages > maxLimit) {
    incrementBtn = (
      <Pagination.Ellipsis 
        onClick={goToNextPage}
      />
    )
  }

  let decrementBtn = null;
  if(minLimit >= 1) {
    decrementBtn = (
      <Pagination.Ellipsis 
        onClick={goToPrevPage}
      />
    )
  }

  return { currentList, items, goToNextPage, goToPrevPage, numOfPages, incrementBtn, decrementBtn }
}