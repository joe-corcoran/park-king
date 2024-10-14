// // frontend/src/App.js
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Route, Routes } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import * as sessionActions from "./store/session";
// import { Counter } from './features/counter/Counter';
// import './App.css';

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <div className="App">
//       {isLoaded && (
//         <Routes>
//           <Route path="/login" element={<LoginFormPage />} />
//           <Route path="/" element={
//             <header className="App-header">
//               <Counter />
//               <p>
//                 Edit <code>src/App.js</code> and save to reload.
//               </p>
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//         </header>
//           } />
//         </Routes>
//       )}
//     </div>
//   );
// }

// export default App;

// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="App">
      {isLoaded && (
        <Routes>
          <Route path="/login" element={<LoginFormPage />} />
          <Route path="/" element={<h1>Welcome to StaySphere</h1>} />
        </Routes>
      )}
    </div>
  );
}

export default App;