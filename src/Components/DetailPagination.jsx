import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/slices/DetailPaginatinSlice';
import { useNavigate, useParams } from 'react-router-dom';

function DetailPagination() {
    const {id}=useParams();
    const idx = +id;
      const dispatch = useDispatch();
 const navigate = useNavigate();
  return (
    <>
    <div className='flex mx-10 justify-between py-5 bottom-0 sticky'>
      <button
        className="btn btn-warning px-8"
        disabled={idx === 1}
        onClick={() => navigate(`/detail/${idx -1}`)}
      >
        Prev
      </button>
      <button
        className="btn btn-warning px-8"
        disabled={idx === 1302}
        onClick={() => navigate(`/detail/${idx + 1}`)}
      >
        Next
      </button>
    </div>
    </>
  );
}

export default DetailPagination;
