import logo from './logo.svg';
import './App.css';
import Form from './form';
import Data from "./data"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Form/>} />
      <Route exact path="/data" element={<Data/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
