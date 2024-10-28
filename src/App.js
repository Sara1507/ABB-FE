

import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Register from './RegistrationForm/Register';
import Login from './RegistrationForm/Login';
import io from 'socket.io-client';
import AuctionList from './Auction/AuctionList';
import CreateAuction from './Auction/CreateAuctionForm';

const socket = io('http://localhost:5000');

// const App = () => (

//   return <>
//         <Routes >
//             <Route path="/register" component={Register} />
//             <Route path="/login" component={Login} />
//             <Route path="*" component={Register} />
//         </Routes >
//     </>
// );

function App() {

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auction-list" element={<AuctionList />} />
        <Route path="/auction-form" element={<CreateAuction />} />

      </Routes>
    </Router>
  );
}


export default App;
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
