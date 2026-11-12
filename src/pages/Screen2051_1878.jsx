import React, {useState} from "react";
import {LivingArt} from "../components/Experience.jsx";
import HomeWeek from "../components/HomeWeek.jsx";
import {localDate} from "../data/workflow.js";
import { useScreen } from "../context/ScreenContext.jsx";
const imgImage151 = "/assets/9d2af.png";
const imgImage161 = "/assets/ce296.png";
const imgImage171 = "/assets/a362e.png";
const imgImage181 = "/assets/e49e4.png";
const imgImage90 = "/assets/f6a33.png";
const imgEllipse6 = "/assets/4602e.svg";
const imgIcon = "/assets/74cf1.svg";
const imgEllipse7 = "/assets/b420a.svg";
const imgIcon1 = "/assets/69bff.svg";
const imgFrame148 = "/assets/9ca33.svg";
const imgFrame149 = "/assets/b4d97.svg";
const imgVector = "/assets/61537.svg";
const imgEllipse4 = "/assets/cee8e.svg";
const imgVector1 = "/assets/1b54f.svg";
const imgEllipse5 = "/assets/ef657.svg";
const imgVector2 = "/assets/6e1fe.svg";
const imgVector3 = "/assets/c90aa.svg";
const imgVector4 = "/assets/b01e3.svg";
const imgVector5 = "/assets/e08de.svg";
const imgLayer1 = "/assets/home-avatar.svg";
const imgIonNotificationsOutline = "/assets/940a1.svg";
const imgNotch = "/assets/5eb74.svg";
const imgRightSide = "/assets/a4ec7.svg";

export default function HomePageHomeOwner() {
  const { bind, profile, bookings } = useScreen("2051:1878");
  const [selectedDate,setSelectedDate]=useState(localDate());
  const appointment=bookings.find(b=>b.date===selectedDate&&!["Cancelled","Declined"].includes(b.status));
  return (
    <div
      className="d70d903686"
      data-node-id="2051:1878"
      {...bind("2051:1878")}
      data-name="Home page (Home Owner)"
    >
      <div
        className="d3710540e5"
        data-node-id="2051:1879"
        {...bind("2051:1879")}
      />
      <a
        className="db0451fb87"
        data-node-id="2051:1880"
        {...bind("2051:1880")}
        data-name="Round Hover btn"
      >
        <div
          className="d212554d73"
          data-node-id="I2051:1880;668:3686"
          {...bind("I2051:1880;668:3686")}
        >
          <img alt="" className="d8faf267d3" src={imgEllipse6} />
        </div>
        <p
          className="d27684298b"
          data-node-id="I2051:1880;668:3687"
          {...bind("I2051:1880;668:3687")}
        >
          Shop offers
        </p>
      </a>
      <div
        className="d9a90901f5"
        data-node-id="2051:1881"
        {...bind("2051:1881")}
      >
        <p className="d20c602949" dir="auto">{`Home & Care Store`}</p>
      </div>
      <div
        className="d2d6d98d2e"
        data-node-id="2051:1882"
        {...bind("2051:1882")}
      >
        <p className="defcc9af6d" dir="auto">
          Special offers for your home
        </p>
      </div>
      <div
        className="dac23613bd"
        data-node-id="2051:1883"
        {...bind("2051:1883")}
      >
        <p className="defcc9af6d" dir="auto">{`Your home, organized `}</p>
      </div>
      <div
        className="d24159bf92"
        data-node-id="2051:1884"
        {...bind("2051:1884")}
      >
        <div
          className="db0613ee79"
          data-node-id="2051:1885"
          {...bind("2051:1885")}
        >
          <div
            className="db30ee30ef"
            data-node-id="2051:1886"
            {...bind("2051:1886")}
          />
          <div
            className="d6884f6858"
            data-node-id="2051:1887"
            {...bind("2051:1887")}
            data-name="image (15) 1"
          >
            <LivingArt style={{position:"absolute",inset:0}}><img
              alt=""
              className="d629627208"
              src={imgImage151}
              style={{
                position: "absolute",
                left: "0.00000%",
                top: "0.00000%",
                width: "100.00000%",
                height: "100.00000%",
                objectFit: "fill",
              }}
            /></LivingArt>
          </div>
          <div
            className="dd7fe8885a"
            data-node-id="2051:1888"
            {...bind("2051:1888")}
          >
            <p className="defcc9af6d" dir="auto">
              Monitoring
            </p>
          </div>
          <div
            className="dc27a51189"
            data-node-id="2051:1889"
            {...bind("2051:1889")}
          >
            <p className="defcc9af6d" dir="auto">
              Stay Connected to home
            </p>
          </div>
          <div
            className="df406642a4"
            data-node-id="2051:1890"
            {...bind("2051:1890")}
          >
            <p className="defcc9af6d">Open</p>
          </div>
          <div
            className="dc8f24d99c"
            data-node-id="2051:1891"
            {...bind("2051:1891")}
            data-name="Icon"
          >
            <img alt="" className="d8faf267d3" src={imgIcon} />
          </div>
        </div>
        <div
          className="d998a1f9e4"
          data-node-id="2051:1892"
          {...bind("2051:1892")}
        >
          <div
            className="de4501be51"
            data-node-id="2051:1893"
            {...bind("2051:1893")}
          >
            <img alt="" className="d8faf267d3" src={imgEllipse7} />
          </div>
          <div
            className="dc82ab908c"
            data-node-id="2051:1894"
            {...bind("2051:1894")}
          >
            <p className="db17863f73" dir="auto">
              Camera Online
            </p>
          </div>
        </div>
      </div>
      <a className="d44001d387" data-node-id="2051:1895" {...bind("2051:1895")}>
        <div
          className="db0613ee79"
          data-node-id="2051:1896"
          {...bind("2051:1896")}
        >
          <div
            className="db30ee30ef"
            data-node-id="2051:1897"
            {...bind("2051:1897")}
          />
          <div
            className="d6884f6858"
            data-node-id="2051:1898"
            {...bind("2051:1898")}
            data-name="image (15) 1"
          >
            <LivingArt style={{position:"absolute",inset:0}}><img
              alt=""
              className="d629627208"
              src={imgImage151}
              style={{
                position: "absolute",
                left: "0.00000%",
                top: "0.00000%",
                width: "100.00000%",
                height: "100.00000%",
                objectFit: "fill",
              }}
            /></LivingArt>
          </div>
          <div
            className="d5189b650a"
            data-node-id="2051:1899"
            {...bind("2051:1899")}
          >
            <p className="defcc9af6d" dir="auto">
              Monitoring
            </p>
          </div>
          <div
            className="db8eba296a"
            data-node-id="2051:1900"
            {...bind("2051:1900")}
          >
            <p className="defcc9af6d" dir="auto">
              Stay Connected to home
            </p>
          </div>
          <div
            className="df406642a4"
            data-node-id="2051:1901"
            {...bind("2051:1901")}
          >
            <p className="defcc9af6d">Open</p>
          </div>
          <div
            className="dc8f24d99c"
            data-node-id="2051:1902"
            {...bind("2051:1902")}
            data-name="Icon"
          >
            <img alt="" className="d8faf267d3" src={imgIcon} />
          </div>
        </div>
        <div
          className="d998a1f9e4"
          data-node-id="2051:1903"
          {...bind("2051:1903")}
        >
          <div
            className="de4501be51"
            data-node-id="2051:1904"
            {...bind("2051:1904")}
          >
            <img alt="" className="d8faf267d3" src={imgEllipse7} />
          </div>
          <div
            className="de92217eeb"
            data-node-id="2051:1905"
            {...bind("2051:1905")}
          >
            <p className="db17863f73" dir="auto">
              Camera Online
            </p>
          </div>
        </div>
      </a>
      <a className="d35e4a5018" data-node-id="2051:1906" {...bind("2051:1906")}>
        <div
          className="dd25861b2c"
          data-node-id="2051:1907"
          {...bind("2051:1907")}
        />
        <div
          className="d2f62f24f9"
          data-node-id="2051:1908"
          {...bind("2051:1908")}
          data-name="image (16) 1"
        >
          <LivingArt style={{position:"absolute",inset:0}}><img
            alt=""
            className="d629627208"
            src={imgImage161}
            style={{
              position: "absolute",
              left: "-0.76923%",
              top: "-2.69230%",
              width: "109.23076%",
              height: "109.23075%",
              objectFit: "fill",
            }}
          /></LivingArt>
        </div>
        <div
          className="d014dc0617"
          data-node-id="2051:1909"
          {...bind("2051:1909")}
        >
          <p className="defcc9af6d" dir="auto">
            Chats
          </p>
        </div>
        <div
          className="df185c0db8"
          data-node-id="2051:1910"
          {...bind("2051:1910")}
        >
          <p className="defcc9af6d" dir="auto">
            Chat with helpers
          </p>
        </div>
      </a>
      <div
        className="d8a9c71de0"
        data-node-id="2051:1911"
        {...bind("2051:1911")}
      >
        <div
          className="d3f0db3bb3"
          data-node-id="2051:1912"
          {...bind("2051:1912")}
        />
        <div
          className="d1ad32dcf8"
          data-node-id="2051:1913"
          {...bind("2051:1913")}
        >
          <p className="defcc9af6d" dir="auto">
            Schedule
          </p>
        </div>
        <div
          className="dc7249c940"
          data-node-id="2051:1914"
          {...bind("2051:1914")}
        >
          <p className="db17863f73" dir="auto">
            {appointment?`${appointment.service} ? ${appointment.time}`:"No bookings this day"}
          </p>
        </div>
        <div
          className="d471aba726"
          data-node-id="2051:1915"
          {...bind("2051:1915")}
          data-name="image (17) 1"
        >
          <LivingArt style={{position:"absolute",inset:0}}><img
            alt=""
            className="d629627208"
            src={imgImage171}
            style={{
              position: "absolute",
              left: "0.00000%",
              top: "0.00000%",
              width: "100.00000%",
              height: "100.00000%",
              objectFit: "fill",
            }}
          /></LivingArt>
        </div>
        <div
          className="d3b090e2a6"
          data-node-id="2051:1916"
          {...bind("2051:1916")}
        >
          <p className="defcc9af6d">View all</p>
        </div>
        <div
          className="d80c87b3c4"
          data-node-id="2051:1917"
          {...bind("2051:1917")}
          data-name="Icon"
        >
          <img alt="" className="d8faf267d3" src={imgIcon1} />
        </div>
      </div>
      <a className="d8c1558b6e" data-node-id="2051:1918" {...bind("2051:1918")}>
        <div
          className="db11dc8d7b"
          data-node-id="2051:1919"
          {...bind("2051:1919")}
        />
        <div
          className="d448d6d303"
          data-node-id="2051:1920"
          {...bind("2051:1920")}
        >
          <p className="db17863f73" dir="auto">
            Browse services
          </p>
        </div>
        <div
          className="ddd5c5ab8e"
          data-node-id="2051:1921"
          {...bind("2051:1921")}
          data-name="image (18) 1"
        >
          <div className="dfb97e384f">
            <LivingArt style={{position:"absolute",inset:0}}><img
              alt=""
              className="d41e2eb3bf"
              src={imgImage181}
              style={{
                position: "absolute",
                left: "-6.66666%",
                top: "-13.18183%",
                width: "119.13043%",
                height: "114.99998%",
                objectFit: "fill",
              }}
            /></LivingArt>
          </div>
        </div>
        <div
          className="deb460e06d"
          data-node-id="2051:1922"
          {...bind("2051:1922")}
        >
          <p className="d230521fb3" dir="auto">
            Find a helper
          </p>
        </div>
      </a>
      <HomeWeek selected={selectedDate} onSelect={setSelectedDate} bookings={bookings}/>
      <div
        className="d995226cd4"
        data-node-id="2051:1951"
        {...bind("2051:1951")}
      >
        <div
          className="ddb5abae38"
          data-node-id="2051:1952"
          {...bind("2051:1952")}
        >
          <img alt="" className="d8faf267d3" src={imgFrame148} />
        </div>
        <div
          className="d4f2f55c7e"
          data-node-id="2051:1954"
          {...bind("2051:1954")}
        >
          <p className="db17863f73" dir="auto">
            Need help choosing?
          </p>
        </div>
        <div
          className="d5c2845bff"
          data-node-id="2051:1955"
          {...bind("2051:1955")}
        >
          <p className="db17863f73" dir="auto">
            Explore services
          </p>
        </div>
        <div
          className="dd8ae13b24"
          data-node-id="2051:1956"
          {...bind("2051:1956")}
        >
          <img alt="" className="d8faf267d3" src={imgFrame149} />
        </div>
      </div>
      <div
        className="dc8c74930d"
        data-node-id="2051:1958"
        {...bind("2051:1958")}
        data-name="Vector"
      >
        <img alt="" className="d8faf267d3" src={imgVector} />
      </div>
      <div
        className="db152ff69b"
        data-node-id="2051:1959"
        {...bind("2051:1959")}
        data-name="image 90"
      >
        <LivingArt style={{position:"absolute",inset:0}}><img
          alt=""
          className="d629627208"
          src={imgImage90}
          style={{
            position: "absolute",
            left: "0.00000%",
            top: "0.00000%",
            width: "100.00000%",
            height: "100.00000%",
            objectFit: "fill",
          }}
        /></LivingArt>
      </div>
      <div
        className="d67f64c637"
        data-node-id="2051:1960"
        {...bind("2051:1960")}
      >
        <div
          className="d2f19aad70"
          data-node-id="2051:1961"
          {...bind("2051:1961")}
        >
          <div
            className="d28fee9540"
            data-node-id="2051:1962"
            {...bind("2051:1962")}
            data-name="Home Bar"
          >
            <div
              className="d5d21febc9"
              data-node-id="2051:1963"
              {...bind("2051:1963")}
              data-name="Rectangle"
            />
          </div>
        </div>
        <div
          className="dd6b6dee76"
          data-node-id="2051:1964"
          {...bind("2051:1964")}
          data-name="Navigation (House Owner)"
        >
          <div
            className="d3ed53e344"
            data-node-id="I2051:1964;407:416"
            {...bind("I2051:1964;407:416")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="I2051:1964;407:417"
              {...bind("I2051:1964;407:417")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse4} />
            </div>
            <div
              className="de7a1d0c8d"
              data-node-id="I2051:1964;407:418"
              {...bind("I2051:1964;407:418")}
            >
              <p className="defcc9af6d" dir="auto">
                Home
              </p>
            </div>
            <div
              className="deb56045e6"
              data-node-id="I2051:1964;407:419"
              {...bind("I2051:1964;407:419")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector1} />
              </div>
            </div>
          </div>
          <a
            className="d4af6c8eda"
            data-node-id="I2051:1964;407:420"
            {...bind("I2051:1964;407:420")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="I2051:1964;407:421"
              {...bind("I2051:1964;407:421")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse5} />
            </div>
            <div
              className="d479038a07"
              data-node-id="I2051:1964;407:422"
              {...bind("I2051:1964;407:422")}
            >
              <p className="defcc9af6d" dir="auto">
                Store
              </p>
            </div>
            <div
              className="d20c7685d3"
              data-node-id="I2051:1964;407:423"
              {...bind("I2051:1964;407:423")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector2} />
              </div>
            </div>
          </a>
          <a
            className="d4af6c8eda"
            data-node-id="I2051:1964;407:424"
            {...bind("I2051:1964;407:424")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="I2051:1964;407:425"
              {...bind("I2051:1964;407:425")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse5} />
            </div>
            <div
              className="d7d7c9513d"
              data-node-id="I2051:1964;407:426"
              {...bind("I2051:1964;407:426")}
            >
              <p className="defcc9af6d" dir="auto">
                Monitoring
              </p>
            </div>
            <div
              className="d20c7685d3"
              data-node-id="I2051:1964;407:427"
              {...bind("I2051:1964;407:427")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector3} />
              </div>
            </div>
          </a>
          <button
            className="d4af6c8eda"
            data-node-id="I2051:1964;407:428"
            {...bind("I2051:1964;407:428")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="I2051:1964;407:429"
              {...bind("I2051:1964;407:429")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse5} />
            </div>
            <div
              className="d4e401c6f6"
              data-node-id="I2051:1964;407:430"
              {...bind("I2051:1964;407:430")}
              data-name="Vector"
            >
              <div className="d10df0e13d">
                <img alt="" className="dacc3667e9" src={imgVector4} />
              </div>
            </div>
            <div
              className="d134480562"
              data-node-id="I2051:1964;407:431"
              {...bind("I2051:1964;407:431")}
            >
              <p className="defcc9af6d" dir="auto">
                Schedule
              </p>
            </div>
          </button>
          <button
            className="d9e2118d67"
            data-node-id="I2051:1964;407:432"
            {...bind("I2051:1964;407:432")}
          >
            <div
              className="d0233fdec1"
              data-node-id="I2051:1964;407:433"
              {...bind("I2051:1964;407:433")}
              data-name="Vector"
            >
              <div className="d8c8983e95">
                <img alt="" className="dacc3667e9" src={imgVector5} />
              </div>
            </div>
            <div
              className="d247583906"
              data-node-id="I2051:1964;407:434"
              {...bind("I2051:1964;407:434")}
            >
              <p className="defcc9af6d" dir="auto">
                Profile
              </p>
            </div>
          </button>
        </div>
      </div>
      <div
        className="d2c03fe861"
        data-node-id="2051:1965"
        {...bind("2051:1965")}
      >
        <div
          className="de66e11112"
          data-node-id="2051:1966"
          {...bind("2051:1966")}
        />
        <div
          className="da6ccdd7bf"
          data-node-id="2051:1967"
          {...bind("2051:1967")}
        >
          <div
            className="d63df5016d"
            data-node-id="2051:1968"
            {...bind("2051:1968")}
          >
            <div
              className="d26c87fd9f"
              data-node-id="2051:1969"
              {...bind("2051:1969")}
              data-name="Layer_1"
            >
              <img alt="" className="d8faf267d3" src={imgLayer1} />
            </div>
          </div>
          <div
            className="d19b41c02d"
            data-node-id="2051:2009"
            {...bind("2051:2009")}
          >
            <div
              className="deecab48c0"
              data-node-id="2051:2010"
              {...bind("2051:2010")}
            >
              <p className="defcc9af6d" dir="auto">
                Hello, {profile.name.split(' ')[0]}
              </p>
            </div>
            <div
              className="d8fd4d9ba6"
              data-node-id="2051:2011"
              {...bind("2051:2011")}
            >
              <p className="defcc9af6d" dir="auto">
                {new Date(selectedDate+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short"})}
              </p>
            </div>
          </div>
          <div
            className="deaa60f1c4"
            data-node-id="2051:2012"
            {...bind("2051:2012")}
            data-name="ion:notifications-outline"
          >
            <img
              alt=""
              className="d8faf267d3"
              src={imgIonNotificationsOutline}
            />
          </div>
        </div>
      </div>
      <div
        className="deae832815"
        data-node-id="2051:2014"
        {...bind("2051:2014")}
        data-name="StatusBar / iPhone 13"
      >
        <div
          className="da854c62c9"
          data-node-id="I2051:2014;839:7137"
          {...bind("I2051:2014;839:7137")}
          data-name="Notch"
        >
          <img alt="" className="d8faf267d3" src={imgNotch} />
        </div>
        <div
          className="d8e06b6bdc"
          data-node-id="I2051:2014;839:7139"
          {...bind("I2051:2014;839:7139")}
          data-name="Left Side"
        >
          <div
            className="df4cc3f513"
            data-node-id="I2051:2014;839:7140"
            {...bind("I2051:2014;839:7140")}
            data-name="_StatusBar-time"
          >
            <p
              className="d8bd1dd523"
              data-node-id="I2051:2014;839:7140;839:7100"
              {...bind("I2051:2014;839:7140;839:7100")}
            >
              9:41
            </p>
          </div>
        </div>
        <div
          className="d3651158e4"
          data-node-id="I2051:2014;839:7141"
          {...bind("I2051:2014;839:7141")}
          data-name="Right Side"
        >
          <img alt="" className="d8faf267d3" src={imgRightSide} />
        </div>
      </div>
    </div>
  );
}
