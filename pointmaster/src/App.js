import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import MainLayout from "./Components/Dashboard/MainLayout";


function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;





