import { useState } from "react";
import "./App.css";
import Form from "./components/form.js";
import Result from "./components/result.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [predres, setpredres] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form setpredres={setpredres} />}></Route>
          <Route path="/res" element={<Result res={predres} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
