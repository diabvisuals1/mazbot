import React from "react";
import { useScreen } from "../context/ScreenContext.jsx";
const imgImage155 = "/assets/b2a63.png";
const imgImage172 = "/assets/a362e.png";
const imgImage162 = "/assets/ce296.png";
const imgRightSide = "/assets/0c95f.svg";
const imgStat18Reviews = "/assets/43e3c.svg";
const imgIsolationMode = "/assets/cea61.svg";
const imgIsolationMode1 = "/assets/5c2e2.svg";
const imgIsolationMode2 = "/assets/0af7b.svg";
const imgVector = "/assets/5ecf5.svg";
const imgNotch = "/assets/5eb74.svg";
const imgRightSide1 = "/assets/8795a.svg";
const imgSaved = "/assets/ca772.svg";
const imgSaved1 = "/assets/248d1.svg";
const imgEllipse4 = "/assets/b63ff.svg";
const imgVector1 = "/assets/1b54f.svg";
const imgEllipse5 = "/assets/ef657.svg";
const imgVector2 = "/assets/297a1.svg";
const imgVector3 = "/assets/6f250.svg";
const imgVector4 = "/assets/be0b9.svg";
const imgVector5 = "/assets/c94ae.svg";

export default function Component6ProfileDetails() {
  const { bind, person, helperImage, helperPrice, service } =
    useScreen("2051:1778");
  return (
    <div
      className="d70d903686"
      data-node-id="2051:1778"
      {...bind("2051:1778")}
      data-name="6 · Profile details"
    >
      <div
        className="d8d1dff252"
        data-node-id="2051:1779"
        {...bind("2051:1779")}
        data-name="StatusBar / iPhone 14"
      >
        <div
          className="d8e06b6bdc"
          data-node-id="I2051:1779;839:7139"
          {...bind("I2051:1779;839:7139")}
          data-name="Left Side"
        >
          <div
            className="df4cc3f513"
            data-node-id="I2051:1779;839:7140"
            {...bind("I2051:1779;839:7140")}
            data-name="_StatusBar-time"
          >
            <p
              className="d8bd1dd523"
              data-node-id="I2051:1779;839:7140;839:7100"
              {...bind("I2051:1779;839:7140;839:7100")}
            >
              9:41
            </p>
          </div>
        </div>
        <div
          className="d3651158e4"
          data-node-id="I2051:1779;839:7141"
          {...bind("I2051:1779;839:7141")}
          data-name="Right Side"
        >
          <img alt="" className="d8faf267d3" src={imgRightSide} />
        </div>
      </div>
      <div
        className="d8cb0095da"
        data-node-id="2051:1780"
        {...bind("2051:1780")}
      >
        <p
          className="d48d761cf2"
          dir="auto"
          data-node-id="2051:1781"
          {...bind("2051:1781")}
        >
          {person}
        </p>
        <p
          className="d41f849909"
          data-node-id="2051:1782"
          {...bind("2051:1782")}
        >
          {service === "Cleaning" ? "Cleaner" : service}
        </p>
        <div
          className="dec4140711"
          data-node-id="2051:1783"
          {...bind("2051:1783")}
          data-name="image 155"
        >
          <div className="da757cf2bc">
            <img
              alt=""
              className="d61ea8108d"
              src={helperImage}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />
          </div>
        </div>
        <div
          className="de8f695808"
          data-node-id="2051:1784"
          {...bind("2051:1784")}
        >
          <div
            className="d43f91339f"
            data-node-id="2051:1785"
            {...bind("2051:1785")}
            data-name="stat-18-reviews"
          >
            <img alt="" className="d8faf267d3" src={imgStat18Reviews} />
          </div>
          <p
            className="df97d7dd11"
            data-node-id="2051:1786"
            {...bind("2051:1786")}
          >
            <span className="dec34fe2a2">★</span>
            <span className="da88e3a345">{` 4.7`}</span>
          </p>
          <p
            className="dd4782899f"
            data-node-id="2051:1787"
            {...bind("2051:1787")}
          >
            18 reviews
          </p>
        </div>
        <div
          className="dddde2b91d"
          data-node-id="2051:1788"
          {...bind("2051:1788")}
        >
          <div
            className="dddde2b91d"
            data-node-id="2051:1789"
            {...bind("2051:1789")}
          >
            <div
              className="dfd302e71f"
              data-node-id="2051:1790"
              {...bind("2051:1790")}
              data-name="stat-18-reviews"
            >
              <img alt="" className="d8faf267d3" src={imgStat18Reviews} />
            </div>
            <p
              className="df11bd4ea5"
              data-node-id="2051:1791"
              {...bind("2051:1791")}
            >
              4 yrs
            </p>
            <p
              className="d43a54aa1e"
              data-node-id="2051:1792"
              {...bind("2051:1792")}
            >
              experience
            </p>
          </div>
        </div>
        <div
          className="d04c793877"
          data-node-id="2051:1793"
          {...bind("2051:1793")}
        >
          <div
            className="d7b7190997"
            data-node-id="2051:1794"
            {...bind("2051:1794")}
            data-name="stat-18-reviews"
          >
            <img alt="" className="d8faf267d3" src={imgStat18Reviews} />
          </div>
          <p
            className="d2d24c6634"
            data-node-id="2051:1795"
            {...bind("2051:1795")}
          >
            2.1 km
          </p>
          <p
            className="dcfbaf2780"
            data-node-id="2051:1796"
            {...bind("2051:1796")}
          >
            from you
          </p>
        </div>
        <p
          className="dbbcecb5fa"
          data-node-id="2051:1797"
          {...bind("2051:1797")}
        >
          EGP {helperPrice}
        </p>
        <p
          className="d89874fd45"
          data-node-id="2051:1798"
          {...bind("2051:1798")}
        >
          / day
        </p>
      </div>
      <div
        className="d467d1bf78"
        data-node-id="2051:1799"
        {...bind("2051:1799")}
      >
        <p
          className="deb5c75ed1"
          dir="auto"
          data-node-id="2051:1800"
          {...bind("2051:1800")}
        >
          Book now
        </p>
        <div
          className="ddfdc74363"
          data-node-id="2051:1801"
          {...bind("2051:1801")}
          data-name="image (17) 2"
        >
          <img
            alt=""
            className="d629627208"
            src={imgImage172}
            style={{
              position: "absolute",
              left: "0.00000%",
              top: "0.00000%",
              width: "100.00000%",
              height: "100.00000%",
              objectFit: "fill",
            }}
          />
        </div>
        <p
          className="d68ab37309"
          data-node-id="2051:1802"
          {...bind("2051:1802")}
        >
          Hire this helper
        </p>
        <div
          className="d23cf19d68"
          data-node-id="2051:1803"
          {...bind("2051:1803")}
          data-name="Isolation_Mode"
        >
          <img alt="" className="d8faf267d3" src={imgIsolationMode} />
        </div>
      </div>
      <div
        className="d5fe01d92c"
        data-node-id="2051:1806"
        {...bind("2051:1806")}
      >
        <p
          className="dee89e8be2"
          dir="auto"
          data-node-id="2051:1807"
          {...bind("2051:1807")}
        >
          Chat
        </p>
        <div
          className="ddc6e14fbc"
          data-node-id="2051:1808"
          {...bind("2051:1808")}
          data-name="image (16) 2"
        >
          <img
            alt=""
            className="d629627208"
            src={imgImage162}
            style={{
              position: "absolute",
              left: "-0.76923%",
              top: "-2.69230%",
              width: "109.23076%",
              height: "109.23075%",
              objectFit: "fill",
            }}
          />
        </div>
        <p
          className="dbdcab7975"
          data-node-id="2051:1809"
          {...bind("2051:1809")}
        >
          Ask about details
        </p>
        <div
          className="d01e0fffec"
          data-node-id="2051:1810"
          {...bind("2051:1810")}
          data-name="Isolation_Mode"
        >
          <img alt="" className="d8faf267d3" src={imgIsolationMode1} />
        </div>
      </div>
      <div
        className="d2c03fe861"
        data-node-id="2051:1813"
        {...bind("2051:1813")}
      >
        <div
          className="de66e11112"
          data-node-id="2051:1814"
          {...bind("2051:1814")}
        />
        <div
          className="d806f7c2ee"
          data-node-id="2051:1815"
          {...bind("2051:1815")}
        >
          <div
            className="d19efab1ec"
            data-node-id="2051:1816"
            {...bind("2051:1816")}
            data-name="Isolation_Mode"
          >
            <img alt="" className="d8faf267d3" src={imgIsolationMode2} />
          </div>
          <div
            className="d8f9049f82"
            data-node-id="2051:1819"
            {...bind("2051:1819")}
          >
            <div
              className="dd37403a56"
              data-node-id="2051:1820"
              {...bind("2051:1820")}
            >
              <p className="defcc9af6d" dir="auto">
                Profile Details
              </p>
            </div>
            <div
              className="d8fd4d9ba6"
              data-node-id="2051:1821"
              {...bind("2051:1821")}
            >
              <p className="defcc9af6d" dir="auto">
                Today 25 Apr
              </p>
            </div>
          </div>
          <div
            className="dacd5f142e"
            data-node-id="2051:1822"
            {...bind("2051:1822")}
            data-name="Vector"
          >
            <img alt="" className="d8faf267d3" src={imgVector} />
          </div>
        </div>
      </div>
      <div
        className="deae832815"
        data-node-id="2051:1823"
        {...bind("2051:1823")}
        data-name="StatusBar / iPhone 13"
      >
        <div
          className="da854c62c9"
          data-node-id="I2051:1823;839:7137"
          {...bind("I2051:1823;839:7137")}
          data-name="Notch"
        >
          <img alt="" className="d8faf267d3" src={imgNotch} />
        </div>
        <div
          className="d8e06b6bdc"
          data-node-id="I2051:1823;839:7139"
          {...bind("I2051:1823;839:7139")}
          data-name="Left Side"
        >
          <div
            className="df4cc3f513"
            data-node-id="I2051:1823;839:7140"
            {...bind("I2051:1823;839:7140")}
            data-name="_StatusBar-time"
          >
            <p
              className="d8bd1dd523"
              data-node-id="I2051:1823;839:7140;839:7100"
              {...bind("I2051:1823;839:7140;839:7100")}
            >
              9:41
            </p>
          </div>
        </div>
        <div
          className="d3651158e4"
          data-node-id="I2051:1823;839:7141"
          {...bind("I2051:1823;839:7141")}
          data-name="Right Side"
        >
          <img alt="" className="d8faf267d3" src={imgRightSide1} />
        </div>
      </div>
      <div
        className="d80a4942a9"
        data-node-id="2051:1824"
        {...bind("2051:1824")}
      >
        <div
          className="d054c9bc20"
          data-node-id="2051:1825"
          {...bind("2051:1825")}
        />
        <div
          className="daeb5058e0"
          data-node-id="2051:1826"
          {...bind("2051:1826")}
        >
          <p
            className="dc149c7bfe"
            dir="auto"
            data-node-id="2051:1827"
            {...bind("2051:1827")}
          >
            Services
          </p>
          <p
            className="d0e672228e"
            data-node-id="2051:1828"
            {...bind("2051:1828")}
          >
            Cleaning ,laundry, kitchen help
          </p>
          <div
            className="dc074a5cfd"
            data-node-id="2051:1829"
            {...bind("2051:1829")}
            data-name="saved"
          >
            <img alt="" className="d8faf267d3" src={imgSaved} />
          </div>
        </div>
        <div
          className="d2f700fcfd"
          data-node-id="2051:1830"
          {...bind("2051:1830")}
        >
          <p
            className="d55441b859"
            dir="auto"
            data-node-id="2051:1831"
            {...bind("2051:1831")}
          >
            Availability
          </p>
          <p
            className="d0e672228e"
            data-node-id="2051:1832"
            {...bind("2051:1832")}
          >
            Sun-Thu, 9:00 AM - 5:00 PM
          </p>
          <div
            className="dc074a5cfd"
            data-node-id="2051:1833"
            {...bind("2051:1833")}
            data-name="saved"
          >
            <img alt="" className="d8faf267d3" src={imgSaved} />
          </div>
        </div>
        <div
          className="d1f49ac98c"
          data-node-id="2051:1834"
          {...bind("2051:1834")}
        >
          <p
            className="d55441b859"
            dir="auto"
            data-node-id="2051:1835"
            {...bind("2051:1835")}
          >
            Languages
          </p>
          <p
            className="d0e672228e"
            data-node-id="2051:1836"
            {...bind("2051:1836")}
          >
            Arabic, Basic English
          </p>
          <div
            className="dc074a5cfd"
            data-node-id="2051:1837"
            {...bind("2051:1837")}
            data-name="saved"
          >
            <img alt="" className="d8faf267d3" src={imgSaved} />
          </div>
        </div>
        <div
          className="dcebd2f295"
          data-node-id="2051:1838"
          {...bind("2051:1838")}
        >
          <p
            className="d9a546c4f0"
            dir="auto"
            data-node-id="2051:1839"
            {...bind("2051:1839")}
          >
            Location
          </p>
          <p
            className="d0e672228e"
            data-node-id="2051:1840"
            {...bind("2051:1840")}
          >
            Giza, Egypt
          </p>
          <div
            className="dc074a5cfd"
            data-node-id="2051:1841"
            {...bind("2051:1841")}
            data-name="saved"
          >
            <img alt="" className="d8faf267d3" src={imgSaved} />
          </div>
        </div>
      </div>
      <div
        className="d091ace4c0"
        data-node-id="2051:1842"
        {...bind("2051:1842")}
      >
        <div
          className="d091ace4c0"
          data-node-id="2051:1843"
          {...bind("2051:1843")}
        >
          <div
            className="da2eb163f2"
            data-node-id="2051:1844"
            {...bind("2051:1844")}
          >
            <p
              className="d8dc81b627"
              dir="auto"
              data-node-id="2051:1845"
              {...bind("2051:1845")}
            >
              Customer reviews
            </p>
            <p
              className="da8e55e71e"
              data-node-id="2051:1846"
              {...bind("2051:1846")}
            >
              Read recent feedback
            </p>
            <div
              className="deac7b4c3f"
              data-node-id="2051:1847"
              {...bind("2051:1847")}
              data-name="saved"
            >
              <img alt="" className="d8faf267d3" src={imgSaved1} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="d6bd3f744f"
        data-node-id="2051:1848"
        {...bind("2051:1848")}
      >
        <div
          className="d6bd3f744f"
          data-node-id="2051:1849"
          {...bind("2051:1849")}
        >
          <div
            className="d300b902b9"
            data-node-id="2051:1850"
            {...bind("2051:1850")}
          >
            <p
              className="d8dc81b627"
              dir="auto"
              data-node-id="2051:1851"
              {...bind("2051:1851")}
            >
              Background Checks
            </p>
            <p
              className="da8e55e71e"
              data-node-id="2051:1852"
              {...bind("2051:1852")}
            >
              Verified documents and profile
            </p>
            <div
              className="deac7b4c3f"
              data-node-id="2051:1853"
              {...bind("2051:1853")}
              data-name="saved"
            >
              <img alt="" className="d8faf267d3" src={imgSaved1} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="d89f1ce1b0"
        data-node-id="2051:1854"
        {...bind("2051:1854")}
      >
        <p className="defcc9af6d" dir="auto">
          About {person.split(" ")[0]}
        </p>
      </div>
      <div
        className="d3441cfe53"
        data-node-id="2051:1855"
        {...bind("2051:1855")}
      >
        <div
          className="dde865e858"
          data-node-id="2051:1856"
          {...bind("2051:1856")}
        >
          <div
            className="d3ed53e344"
            data-node-id="2051:1857"
            {...bind("2051:1857")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="2051:1858"
              {...bind("2051:1858")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse4} />
            </div>
            <div
              className="de7a1d0c8d"
              data-node-id="2051:1859"
              {...bind("2051:1859")}
            >
              <p className="defcc9af6d" dir="auto">
                Home
              </p>
            </div>
            <div
              className="deb56045e6"
              data-node-id="2051:1860"
              {...bind("2051:1860")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector1} />
              </div>
            </div>
          </div>
          <div
            className="d3ed53e344"
            data-node-id="2051:1861"
            {...bind("2051:1861")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="2051:1862"
              {...bind("2051:1862")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse5} />
            </div>
            <div
              className="d8aca73d9b"
              data-node-id="2051:1863"
              {...bind("2051:1863")}
            >
              <p className="defcc9af6d" dir="auto">
                Store
              </p>
            </div>
            <div
              className="d20c7685d3"
              data-node-id="2051:1864"
              {...bind("2051:1864")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector2} />
              </div>
            </div>
          </div>
          <div
            className="d3ed53e344"
            data-node-id="2051:1865"
            {...bind("2051:1865")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="2051:1866"
              {...bind("2051:1866")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse5} />
            </div>
            <div
              className="d2cff10e30"
              data-node-id="2051:1867"
              {...bind("2051:1867")}
            >
              <p className="defcc9af6d" dir="auto">
                Monitoring
              </p>
            </div>
            <div
              className="d20c7685d3"
              data-node-id="2051:1868"
              {...bind("2051:1868")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector3} />
              </div>
            </div>
          </div>
          <div
            className="d3ed53e344"
            data-node-id="2051:1869"
            {...bind("2051:1869")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="2051:1870"
              {...bind("2051:1870")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse5} />
            </div>
            <div
              className="d4e401c6f6"
              data-node-id="2051:1871"
              {...bind("2051:1871")}
              data-name="Vector"
            >
              <div className="d10df0e13d">
                <img alt="" className="dacc3667e9" src={imgVector4} />
              </div>
            </div>
            <div
              className="d987b92ee7"
              data-node-id="2051:1872"
              {...bind("2051:1872")}
            >
              <p className="defcc9af6d" dir="auto">
                Schedule
              </p>
            </div>
          </div>
          <div
            className="d4e104ade6"
            data-node-id="2051:1873"
            {...bind("2051:1873")}
          >
            <div
              className="d0233fdec1"
              data-node-id="2051:1874"
              {...bind("2051:1874")}
              data-name="Vector"
            >
              <div className="d8c8983e95">
                <img alt="" className="dacc3667e9" src={imgVector5} />
              </div>
            </div>
            <div
              className="d7accbd6b3"
              data-node-id="2051:1875"
              {...bind("2051:1875")}
            >
              <p className="defcc9af6d" dir="auto">
                Profile
              </p>
            </div>
          </div>
        </div>
        <div
          className="d71a0b40d1"
          data-node-id="2051:1876"
          {...bind("2051:1876")}
          data-name="Home Bar"
        >
          <div
            className="d5d21febc9"
            data-node-id="2051:1877"
            {...bind("2051:1877")}
            data-name="Rectangle"
          />
        </div>
      </div>
    </div>
  );
}
