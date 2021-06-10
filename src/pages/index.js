import * as React from "react"
import ConwayCanvas from "../components/ConwayComponent";
import ConnectFourComponent from "../components/ConnectFourComponent";
import Navigation from "../components/Navigation";
//import Card from "./components/Card";
//import "./styles.css";

const App = () => {
  return (
    <Navigation defaultIndex="1">
      <ConwayCanvas index="1" label="Conway" />
      <ConnectFourComponent index="2" label="Connect 4" />
    </Navigation>
  );
}

export default App;
