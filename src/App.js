import './App.css';
import AddQuote from './Components/AddQuote';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ListQuotes from './Components/ListQuotes';
import UpdateQuote from './Components/UpdateQuotes';
import Login from './Components/Users/Login';
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Users/Signup';


function App() {
  return (
    <div className="App ">
      <Header /> 
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/quotes' element={<ListQuotes />}/>
          <Route path='/quotes/add' element={<AddQuote />}/>
          <Route path='/quotes/:quoteId/update' element={<UpdateQuote />}/>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;