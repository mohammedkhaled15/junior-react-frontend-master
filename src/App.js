import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/");
      const data = await response.json;
      setData(data);
      setIsLoading(false);
    }
  }, []);
  console.log(isLoading, data);
  return <div className="App"></div>;
}

export default App;
