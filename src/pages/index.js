import * as React from "react"
import ConwayCanvas from "../components/ConwayComponent";
import PongComponent from "../components/PongComponent";
import Navigation from "../components/Navigation";
//import Card from "./components/Card";
import "../App.scss";

const App = () => {
  return (
    <>
      <ConwayCanvas id="logo" width={800} height={90} backgroundColor="#27272c" speed="240"
      resetAfterFrame="20" />

      <Navigation defaultIndex="1">
        <PongComponent index="1" label="Pong" />
        <ConwayCanvas index="2" label="Conway" height="500em" />
      </Navigation>
    </>
  );
}

export default App;
