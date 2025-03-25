import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import DetailPagination from './DetailPagination';
import Content from './Content';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Detail() {
  const { id } = useParams();
  const idx = +id;
  return (
    <>
      <Content 
        para={idx}
      />
      <DetailPagination />
    </>
  );
}

export default Detail;
