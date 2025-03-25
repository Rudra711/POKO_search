import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/slices/PaginationSlice';

function Pagination() {
  const page = useSelector((state) => state.pagination.page); // Corrected key to 'pagination'
  const dispatch = useDispatch();

  return (
    <div className='flex mx-10 justify-between py-5 bottom-0 sticky'>
      <button
        className="btn btn-warning px-8"
        disabled={page === 0}
        onClick={() => dispatch(decrement())}
      >
        Prev
      </button>
      <button
        className="btn btn-warning px-8"
        disabled={page === 1300}
        onClick={() => dispatch(increment())}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
