import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AttractionsPage from './pages/AttractionsPage/AttractionsPage.jsx';
import AttractionDetailPage from './pages/AttractionDetailPage/AttractionDetailPage';
import ContactPage from './pages/ContactForm/ContactPage.jsx';
import AudioPage from './pages/AudioPage/AudioPage.jsx';
import { UserProvider } from './components/UserContext/UserContext.jsx';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/attractions/:id" element={<AttractionDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />

        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
