import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './slices/PaginationSlice';
import detailPaginationReducer  from './slices/DetailPaginatinSlice';
import searchReducer from './slices/SearchSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer, // Ensure this key matches the reducer name
    detailPagination : detailPaginationReducer,
    search: searchReducer,

  },
});
