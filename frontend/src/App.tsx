import "./App.css";
import Products from "./Products";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="main h-full">
      <Navbar />
      <Products />
    </div>
  );
}

export default App;
