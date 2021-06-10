import * as React from "react"
import ConwayCanvas from "../components/ConwayComponent";
import PongComponent from "../components/PongComponent";
import Navigation from "../components/Navigation";
//import Card from "./components/Card";
//import "./styles.css";

const App = () => {
  return (
    <Navigation defaultIndex="1">
      <ConwayCanvas index="1" label="Conway" />
      <PongComponent index="2" label="Pong" />
    </Navigation>
  );
}

export default App;
