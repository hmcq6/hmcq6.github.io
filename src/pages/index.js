import * as React from "react"
import ConwayCanvas from "../components/ConwayComponent";
import PongComponent from "../components/PongComponent";
import Navigation from "../components/Navigation";
import profile from "../images/Profile.png";
import arrow from "../images/Arrow.svg";
//import Card from "./components/Card";
import "../App.scss";

const App = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Baloo%202&display=swap" rel="stylesheet" />
      <ConwayCanvas
        id="logo"
        width={800}
        height={90}
        backgroundColor="#27272c"
        speed="240"
        resetAfterFrame="20" />
      <hr />

      <div class="page">
        <div class="card">
          <h1>Hassan McKusick</h1>
          <PongComponent id="pong" height="300px" width="500px" />
          <h2>Portfolio</h2>
          <h3>Front End Engineer</h3>
          <img id="arrow" src={arrow} alt="arrow" height="200px" width="200px" />
          <p>I build interactive websites</p>
        </div>

        <div id="bio" class="card">
          <img id="profile" src={profile} alt="profile pic" />
          <div>
            <h4>I'm a web developer with a foundation in full-stack and a talent for UX.</h4>
            <p>I love everything JavaScript and am a big fan of the Ember.JS framework.</p>
            <p>In my free time I like to play around with new(er) technologies like WebSockets and
            Snowpack</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
      /*<Navigation defaultIndex="1">
        <PongComponent index="1" label="Pong" height="500px" />
        <ConwayCanvas index="2" label="Conway" height="500em" />
      </Navigation>*/
