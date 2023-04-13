import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";

function App({app}) {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home app={app}/>} />
      </Routes>
    </div>
  );
}

export default App;
