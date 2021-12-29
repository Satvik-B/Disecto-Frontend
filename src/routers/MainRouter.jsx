import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { 
  CSSTransition, 
  TransitionGroup,
} from 'react-transition-group';

import HomePage from '../pages/HomePage';
import UploadCollection from '../pages/UploadCollection';
import Collection from '../pages/Collection';

function MainRouter() {
  const location = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <TransitionGroup>
      <CSSTransition
        key={window.location.href}
        timeout={1000}
        classNames="fade"
      >
        <Routes>
          <Route path="/newCollection" element={<UploadCollection />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default MainRouter;