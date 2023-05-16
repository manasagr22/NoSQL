import React from 'react'
import './App.css';
import logo from "./assets/Logo.png";
import starter from "./assets/starter.png";
import covid from "./assets/whatIsCovid.png";
import virus1 from "./assets/virus1.png";
import airtransmission from "./assets/airTransmission.png";
import humanContact from "./assets/humanContact.png";
import object from "./assets/containedObject.png";
import symptoms from "./assets/symptoms.png";
import virus3 from "./assets/virus3.png";
import virus4 from "./assets/virus4.png";
import girl1 from "./assets/girl1.png";
import girl2 from "./assets/girl2.png";
import girl3 from "./assets/girl3.png";
import girl4 from "./assets/girl4.png";
import { Link } from 'react-router-dom';
import NavBar from './NavBar';


export default function Home() {
  return (
    <>
    <div class="scrollToTop"></div>
    <NavBar/>
    <section class="starter">
      <div class="info">
        <h3 class="subTitle">COVID-19 Alert</h3>
        <h1 class="title">Stay At Home Quarantine To Stop Corona Virus</h1>
        <h5 class="description">
          There is No Specific Medicine To Prevent Or Treat Coronavirus Disease
          (COVID-19). People May Need Supportive Care To.
        </h5>
        <button>Let Us Help</button>
      </div>
      <div class="image">
        <img src={starter} alt="" />
      </div>
    </section>
    <section class="about" id="about">
      <div class="image">
        <img src={covid} alt="" />
      </div>
      <div class="info">
        <h4 class="subTitle">What Is Covid-19</h4>
        <h2 class="title">Coronavirus</h2>
        <p class="description">
          Corona Viruses are a type of Virus. There are many different kinds,
          and some cause disease. A newly identified type has caused a recent
          outbreak of Respiratory illness now called COVID-19.
        </p>
        <button>Learn More</button>
      </div>
    </section>
    <section class="contagion" id="contagion">
      <div class="info">
        <h4 class="subTitle">Covid-19</h4>
        <h2 class="title">Contagion</h2>
        <p class="description">
          Corona Viruses are a type of virus. There are many different kinds,
          and some cause disease. A newly identified type.
        </p>
      </div>
      <div class="content">
        <div class="virus">
          <img src={virus1} alt="" />
        </div>
        <div class="cards">
          <div class="card">
            <img src={airtransmission} alt="" />
            <div class="text">
              <h3 class="title">Air Transmission</h3>
              <p class="description">
                Objectively evolve tactical expertise before extensible
                initiatives.
              </p>
            </div>
          </div>
          <div class="card">
            <img src={humanContact} alt="" />
            <div class="text">
              <h3 class="title">Human Contacts</h3>
              <p class="description">
                Washing your hands is one of the simplest ways you can protect.
              </p>
            </div>
          </div>
          <div class="card">
            <img src={object} alt="" />
            <div class="text">
              <h3 class="title">Air Transmission</h3>
              <p class="description">
                Use the tissue while Sneezing. In this Way, You Can Protect Your
                Droplets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="symptoms" id="symptoms">
      <div class="info">
        <h4 class="subTitle">Covid-19</h4>
        <h2 class="title">Symptoms</h2>
        <p class="description">
          Corona Viruses are a type of virus. There are many different kinds,
          and some cause disease. A newly identified typepe has Caused a recent
          outbreak of respiratory.
        </p>
      </div>
      <div class="image">
        <img src={symptoms} alt="" />
      </div>
    </section>
    <section class="solutions" id="solution">
      <div class="virus">
        <img src={virus3} alt="" />
      </div>
      <div class="virus2">
        <img src={virus1} alt="" />
      </div>
      <div class="virus3">
        <img src={virus4} alt="" />
      </div>

      <div class="info">
        <h4 class="subTitle">Covid-19</h4>
        <h2 class="title">What Should We Do <span>?</span></h2>
        <p class="description">
          Corona Viruses are a type of virus. There are many different kinds,
          and some cause disease. A newly identified type.
        </p>
      </div>
      <div class="content">
        <div class="solution">
          <div class="solution-info">
            <div class="round">01</div>
            <div class="info-container">
              <h2 class="title">Wear Masks</h2>
              <p class="description">
                Continually seize impactful vitals rather than future-proof
                supply chains. Uniquely exploit emerging niches via fully tested
                meta-services. Competently pursue standards compliant leadership
                skills vis-a-vis pandemic "Outside the Box" Thinking.
              </p>
            </div>
          </div>
          <div class="image">
            <img src={girl1} alt="" />
          </div>
        </div>
        <div class="solution">
          <div class="image">
            <img src={girl2} alt="" />
          </div>
          <div class="solution-info">
            <div class="round">02</div>
            <div class="info-container">
              <h2 class="title">Wash your hands</h2>
              <p class="description">
                Continually seize impactful vitals rather than future-proof
                supply chains. Uniquely exploit emerging niches via fully tested
                meta-services. Competently pursue standards compliant leadership
                skills vis-a-vis pandemic "Outside the Box" Thinking.
              </p>
            </div>
          </div>
        </div>
        <div class="solution">
          <div class="solution-info">
            <div class="round">03</div>
            <div class="info-container">
              <h2 class="title">Use Nose - Rag</h2>
              <p class="description">
                Continually seize impactful vitals rather than future-proof
                supply chains. Uniquely exploit emerging niches via fully tested
                meta-services. Competently pursue standards compliant leadership
                skills vis-a-vis pandemic "Outside the Box" Thinking.
              </p>
            </div>
          </div>
          <div class="image">
            <img src={girl3} alt="" />
          </div>
        </div>
        <div class="solution">
          <div class="image">
            <img src={girl4} alt="" />
          </div>
          <div class="solution-info">
            <div class="round">04</div>
            <div class="info-container">
              <h2 class="title">Avoid Contacts</h2>
              <p class="description">
                Continually seize impactful vitals rather than future-proof
                supply chains. Uniquely exploit emerging niches via fully tested
                meta-services. Competently pursue standards compliant leadership
                skills vis-a-vis pandemic "Outside the Box" Thinking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="contact">
      <h1 class="title">Have Question in mind ?</h1>
      <h1 class="title">Let us help you</h1>
      <div class="form">
        <input type="text" placeholder="Enter your Question here..." />
        <button>Send</button>
      </div>
    </section>
    <footer>
      <div class="logo">
        <img src={logo} alt="" />
      </div>
      <div class="links">
        <ul>
          <li><a href="#about">Overview</a></li>
          <li><a href="#contagion">Symptoms</a></li>
          <li><a href="#symptoms">Prevention</a></li>
          <li><a href="#solution">Treatment</a></li>
        </ul>
      </div>
      <div class="social-links">
        <i class="fab fa-instagram"></i>
        <i class="fab fa-facebook"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-youtube"></i>
        <i class="fab fa-linkedin"></i>
      </div>
    </footer>
    </>
  )
}