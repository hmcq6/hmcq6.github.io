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
          <div class="pongWrapper">
            <PongComponent id="pong" height="300px" width="500px" />
          </div>
          <h2>Portfolio</h2>
          <h3>Front End Engineer</h3>
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

      <div id="experience" class="page">
        <div class="page-body">
          <h2 class="text-center">Experience</h2>
          <div class="experience-row">
            <div class="company-info">
              <h3>ART19</h3>
              <label>Aug 2018 - Sep 2020</label>
            </div>
            <ul>
              <li>Developing new features for client facing and public facing pages for clients such as The New York Times, NBC Sports, Wondery</li>
              <li>Interviewing, Hiring, Training, and Developing Best Practices for new staff members</li>
              <li>Facilitating Diversity and Inclusion trainings</li>
              <li>Implementing new features like Audience Tagging and the Sales Inventory Calendar</li>
              <li>Updating stand-alone Web Player</li>
            </ul>
          </div>

          <div class="experience-row">
            <div class="company-info">
              <h3>Decision Resources Group</h3>
              <label>Nov 2014 - Jun 2018</label>
            </div>
            <ul>
              <li>Developing a Single Page Application using Ember and Rails API</li>
              <li>Training a small team in Ember</li>
              <li>Creating reusable components in Ember to be used across multiple products</li>
              <li>Writing performant, maintainable UIs</li>
              <li>Discussing requirements and suggesting UX/UI improvements with product owners</li>
              <li>Generating graphs using HighCharts</li>
              <li>Finalizing specifications for API data contracts</li>
            </ul>
          </div>

          <div class="experience-row">
            <div class="company-info">
              <h3>iSENSE</h3>
              <label>Sep 2009 - Mar 2014</label>
            </div>
            <ul>
              <li>Collaborating on the PHP backend</li>
              <li>Overhauling the existing PHP site to a Ruby on Rails setup</li>
              <li>Coding a responsive UI using HTML, JavaScript, CSS, AJAX, Bootstrap and jQuery</li>
              <li>Generating graphs using Google APIs, Amazon APIs, Flot Libraries</li>
              <li>Participated in workshops instructing educators on various uses of tools</li>
              <li>Represented iSENSE at the USA Science and Engineering Festival in Washington D.C.</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="skills" class="skills page">
          <h2>Skills</h2>
          <ul>
            <li><label>JavaScript</label><meter value="5" min="0" max="5" /></li>
            <li><label>HTML</label><meter value="5" min="0" max="5" /></li>
            <li><label>jQuery</label><meter value="5" min="0" max="5" /></li>
            <li><label>CSS</label><meter value="4.5" min="0" max="5" /></li>
            <li><label>Bootstrap</label><meter value="4.5" min="0" max="5" /></li>
            <li><label>Ember</label><meter value="4.5" min="0" max="5" /></li>
          </ul>
          <ul>
            <li><label>Ruby</label><meter value="3.5" min="0" max="5" /></li>
            <li><label>PHP</label><meter value="3" min="0" max="5" /></li>
            <li><label>Git</label><meter value="4.5" min="0" max="5" /></li>
            <li><label>CLI</label><meter value="4" min="0" max="5" /></li>
            <li><label>Linux</label><meter value="3" min="0" max="5" /></li>
          </ul>
      </div>
    </>
  );
}

export default App;
      /*<Navigation defaultIndex="1">
        <PongComponent index="1" label="Pong" height="500px" />
        <ConwayCanvas index="2" label="Conway" height="500em" />
      </Navigation>*/
