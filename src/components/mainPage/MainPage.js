import React, { useState } from 'react';
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import Container from "../container/Сontainer";
import Header from "../header/Header";
import Content from "../content/Content";
import Footer from "../footer/Footer";
import './MainPage.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import One from '../../pages/One';
import Two from '../../pages/Two';
import Three from '../../pages/Three';
import Four from '../../pages/Four';
import Five from '../../pages/Five';
import Six from '../../pages/Six';
import Seven from '../../pages/Seven';
import Eith from '../../pages/Eith';
import Nine from '../../pages/Nine';
import ProfilePage from '../../pages/ProfilePage';
import AdminUsers from '../../pages/AdminUsers';
import AdminFeedbacks from '../../pages/AdminFeedbacks';

function MainPage() {
  const [selectedButtonData, setSelectedButtonData] = useState(null);

  const handleButtonClick = (buttonData) => {
    setSelectedButtonData(buttonData);
  };

  return (
    <div className="main-page" style={{ display: 'flex', height: '100vh' }}>
      <BrowserRouter>
      <HamburgerMenu onButtonClick={handleButtonClick} />
      <Container>
        <Header selectedButtonData={selectedButtonData} />
        <Content selectedButtonData={selectedButtonData} />
        <Routes>
          <Route path="One" element={<One/>}/>
          <Route path="Two" element={<Two/>}/>
          <Route path="Three" element={<Three/>}/>
          <Route path="Four" element={<Four/>}/>
          <Route path="Five" element={<Five/>}/>
          <Route path="Six" element={<Six/>}/>
          <Route path="Seven" element={<Seven/>}/>
          <Route path="Eith" element={<Eith/>}/>
          <Route path="Nine" element={<Nine/>}/>
          <Route path="profile" element={<ProfilePage />}/>
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/feedbacs" element={<AdminFeedbacks/>} />
        </Routes>
        <Footer/>
      </Container>
      </BrowserRouter>
    </div>
  );
}

export default MainPage;
