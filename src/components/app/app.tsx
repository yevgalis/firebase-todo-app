import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from '@/pages/sign-in/sign-in';
import UserTasks from '@/pages/user-tasks/user-tasks';
import Landing from '@/pages/landing/landing';
import './app.css';

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      {/* <Route path="/user/:id" element={<UserTasks />} />*/}
      <Route path="/user" element={<UserTasks />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default App;
