import React from 'react';
import MainContent from '../../components/MainContent/MainContent';
import { useEffect } from 'react';
const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div>
      <MainContent />
    </div>
  );
};

export default Home;
