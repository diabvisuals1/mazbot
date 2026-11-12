import React from "react";
import {ProductArt} from "../components/ImageExplorer.jsx";
import { useScreen } from "../context/ScreenContext.jsx";
const imgFrame318 = "/assets/4d30f.svg";
const imgFrame301 = "/assets/c4d8a.png";
const imgImage171 = "/assets/15e62.png";
const imgFrame275 = "/assets/11275.svg";
const imgVector = "/assets/e0293.svg";
const imgVector1 = "/assets/ac56f.svg";
const imgIconStar2 = "/assets/2b43f.svg";
const imgEllipse6 = "/assets/4602e.svg";
const imgAkarIconsPlus = "/assets/52aa5.svg";
const imgAkarIconsPlus1 = "/assets/736a2.svg";
const imgVector2 = "/assets/9d90a.svg";
const imgVector3 = "/assets/a2594.svg";
const imgGroup190 = "/assets/65e5e.svg";
const imgNotch = "/assets/5eb74.svg";
const imgRightSide = "/assets/53bca.svg";
const imgVector4 = "/assets/95924.svg";
const imgEllipse5 = "/assets/cee8e.svg";
const imgEllipse4 = "/assets/ef657.svg";
const imgVector5 = "/assets/7cba9.svg";
const imgVector6 = "/assets/b1c42.svg";
const imgVector7 = "/assets/1c4e4.svg";
const imgVector8 = "/assets/9d19b.svg";

function Frame317({ className, property1 = "Default" }) {
  const { bind, product } = useScreen("2051:3241");
  return (
    <div
      className={className || "d0cd85ab14"}
      data-node-id="1983:11283"
      {...bind("1983:11283")}
    >
      <div
        className="dc529fc618"
        data-node-id="1983:11262"
        {...bind("1983:11262")}
      >
        <img alt="" className="d8faf267d3" src={imgFrame318} />
      </div>
    </div>
  );
}

export default function ProductDetailsHomeOwner() {
  const { bind, product } = useScreen("2051:3241");
  return (
    <div
      className="d70d903686"
      data-node-id="2051:3241"
      {...bind("2051:3241")}
      data-name="Product details (Home Owner)"
    >
      <div
        className="d4e12f40ee"
        data-node-id="2051:3242"
        {...bind("2051:3242")}
      >
        <div
          className="d6df8a5619"
          data-node-id="2051:3243"
          {...bind("2051:3243")}
        >
          <p className="defcc9af6d" dir="auto">
            Search
          </p>
        </div>
        <div
          className="d647dc5edc"
          data-node-id="2051:3244"
          {...bind("2051:3244")}
        >
          <img alt="" className="d8faf267d3" src={imgFrame275} />
        </div>
        <div
          className="d839ad3126"
          data-node-id="2051:3246"
          {...bind("2051:3246")}
          style={{ containerType: "size" }}
        >
          <div className="dcf11c648c">
            <div className="d6f0240d42" data-name="lets-icons:filter">
              <div
                className="d6efe4f5fa"
                data-node-id="2051:3247"
                {...bind("2051:3247")}
                data-name="Group"
              >
                <div
                  className="def58abd51"
                  data-node-id="2051:3248"
                  {...bind("2051:3248")}
                  data-name="Vector"
                >
                  <div className="dc92e07960">
                    <img alt="" className="dacc3667e9" src={imgVector} />
                  </div>
                </div>
                <div
                  className="d12dbb9ec6"
                  data-node-id="2051:3249"
                  {...bind("2051:3249")}
                  data-name="Vector"
                >
                  <div className="d521269c24">
                    <img alt="" className="dacc3667e9" src={imgVector1} />
                  </div>
                </div>
                <div
                  className="d3d6837976"
                  data-node-id="2051:3250"
                  {...bind("2051:3250")}
                  data-name="Vector"
                >
                  <div className="d521269c24">
                    <img alt="" className="dacc3667e9" src={imgVector1} />
                  </div>
                </div>
                <div
                  className="d66d169209"
                  data-node-id="2051:3251"
                  {...bind("2051:3251")}
                  data-name="Vector"
                >
                  <div className="d521269c24">
                    <img alt="" className="dacc3667e9" src={imgVector1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductArt product={product}/>

      <p className="dd95364415" data-node-id="2051:3256" {...bind("2051:3256")}>
        {product.name}
      </p>
      <p className="dfbe2b7f6b" data-node-id="2051:3257" {...bind("2051:3257")}>
        Key Benefits
      </p>
      <p className="d4603173b4" data-node-id="2051:3258" {...bind("2051:3258")}>
        Service Add-ons
      </p>
      <p className="d70c571e2b" data-node-id="2051:3259" {...bind("2051:3259")}>
        {product.name === "Monitoring Camera"
          ? "Keep an eye on your home anytime , anywhere"
          : product.name === "Ramp"
            ? "Make everyday access a little easier"
            : product.description || "Everyday essentials for your home"}
      </p>
      <div
        className="d0906ac9d1"
        data-node-id="2051:3260"
        {...bind("2051:3260")}
        data-name="icon-star-2"
      >
        <img alt="" className="d8faf267d3" src={imgIconStar2} />
      </div>
      <p className="d0cf5ee150" data-node-id="2051:3261" {...bind("2051:3261")}>
        4.7
      </p>
      <p className="d2f555b426" data-node-id="2051:3262" {...bind("2051:3262")}>
        (1.2K Reviews)
      </p>
      <p
        className="d3bc900bda"
        dir="auto"
        data-node-id="2051:3263"
        {...bind("2051:3263")}
      >
        <span className="d0d4723b6d">EGP</span>
        <span className="dfdcd7cbc0">{` ${Number(product.price).toLocaleString()}`}</span>
      </p>
      <div
        className="d6a61829c7"
        data-node-id="2051:3264"
        {...bind("2051:3264")}
      />
      <div
        className="dc6cc3121a"
        data-node-id="2051:3265"
        {...bind("2051:3265")}
      />
      <div
        className="d99d63d659"
        data-node-id="2051:3266"
        {...bind("2051:3266")}
      />
      <div
        className="d68379ac28"
        data-node-id="2051:3267"
        {...bind("2051:3267")}
      />
      <div
        className="df64b9e618"
        data-node-id="2051:3268"
        {...bind("2051:3268")}
      />
      <div
        className="db1c9999f8"
        data-node-id="2051:3269"
        {...bind("2051:3269")}
      />
      <div
        className="d1c3943d97"
        data-node-id="2051:3270"
        {...bind("2051:3270")}
      />
      <div
        className="dfccc35171"
        data-node-id="2051:3271"
        {...bind("2051:3271")}
        data-name="image 171"
      >
        <div className="dfb97e384f">
          <img
            alt=""
            className="d567f14bb3"
            src={imgImage171}
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
      </div>
      <div
        className="d6c2351da5"
        data-node-id="2051:3272"
        {...bind("2051:3272")}
        data-name="Round Hover btn"
      >
        <div
          className="d319909ee8"
          data-node-id="I2051:3272;668:3686"
          {...bind("I2051:3272;668:3686")}
        >
          <img alt="" className="d8faf267d3" src={imgEllipse6} />
        </div>
        <p
          className="d83f1e2752"
          data-node-id="I2051:3272;668:3687"
          {...bind("I2051:3272;668:3687")}
        >
          Add To Cart
        </p>
      </div>
      <div
        className="d63d1aa33a"
        data-node-id="2051:3273"
        {...bind("2051:3273")}
      >
        <p
          className="d11aee07d3"
          data-node-id="2051:3274"
          {...bind("2051:3274")}
        >
          1
        </p>
        <div
          className="d83fe9f407"
          data-node-id="2051:3275"
          {...bind("2051:3275")}
          data-name="akar-icons:plus"
        >
          <img alt="" className="d8faf267d3" src={imgAkarIconsPlus} />
        </div>
        <div
          className="d3e44cfdc2"
          data-node-id="2051:3277"
          {...bind("2051:3277")}
          data-name="akar-icons:plus"
        >
          <img alt="" className="d8faf267d3" src={imgAkarIconsPlus1} />
        </div>
      </div>
      <div
        className="d95109e29b"
        data-node-id="2051:3279"
        {...bind("2051:3279")}
      >
        <div className="daeba536ac">
          <div
            className="de66e11112"
            data-node-id="2051:3280"
            {...bind("2051:3280")}
          />
          <div
            className="dad686df94"
            data-node-id="2051:3281"
            {...bind("2051:3281")}
          >
            <a
              className="d19c1e11d0"
              data-node-id="2051:3282"
              {...bind("2051:3282")}
              data-name="Isolation_Mode"
            >
              <div
                className="d5f81ac85e"
                data-node-id="2051:3283"
                {...bind("2051:3283")}
                data-name="Vector"
              >
                <img alt="" className="d8faf267d3" src={imgVector2} />
              </div>
              <div
                className="df2c851dcf"
                data-node-id="2051:3284"
                {...bind("2051:3284")}
                data-name="Vector"
              >
                <div className="db0b873c11">
                  <img alt="" className="dacc3667e9" src={imgVector3} />
                </div>
              </div>
            </a>
            <div
              className="d8f9049f82"
              data-node-id="2051:3285"
              {...bind("2051:3285")}
            >
              <div
                className="dd37403a56"
                data-node-id="2051:3286"
                {...bind("2051:3286")}
              >
                <p className="defcc9af6d" dir="auto">
                  Product Details
                </p>
              </div>
              <div
                className="d8fd4d9ba6"
                data-node-id="2051:3287"
                {...bind("2051:3287")}
              >
                <p className="defcc9af6d" dir="auto">
                  {new Date().toLocaleDateString("en-GB", {day:"numeric",month:"short"})}
                </p>
              </div>
            </div>
            <div
              className="d7fc9bb277"
              data-node-id="2051:3288"
              {...bind("2051:3288")}
            >
              <div
                className="d171854466"
                data-node-id="2051:3289"
                {...bind("2051:3289")}
              >
                <img alt="" className="d8faf267d3" src={imgGroup190} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="deae832815"
        data-node-id="2051:3293"
        {...bind("2051:3293")}
        data-name="StatusBar / iPhone 13"
      >
        <div
          className="da854c62c9"
          data-node-id="I2051:3293;839:7137"
          {...bind("I2051:3293;839:7137")}
          data-name="Notch"
        >
          <img alt="" className="d8faf267d3" src={imgNotch} />
        </div>
        <div
          className="d8e06b6bdc"
          data-node-id="I2051:3293;839:7139"
          {...bind("I2051:3293;839:7139")}
          data-name="Left Side"
        >
          <div
            className="df4cc3f513"
            data-node-id="I2051:3293;839:7140"
            {...bind("I2051:3293;839:7140")}
            data-name="_StatusBar-time"
          >
            <p
              className="d8bd1dd523"
              data-node-id="I2051:3293;839:7140;839:7100"
              {...bind("I2051:3293;839:7140;839:7100")}
            >
              9:41
            </p>
          </div>
        </div>
        <div
          className="d3651158e4"
          data-node-id="I2051:3293;839:7141"
          {...bind("I2051:3293;839:7141")}
          data-name="Right Side"
        >
          <img alt="" className="d8faf267d3" src={imgRightSide} />
        </div>
      </div>
      <div
        className="d686f22555"
        data-node-id="2051:3294"
        {...bind("2051:3294")}
      >
        <div
          className="d2f19aad70"
          data-node-id="2051:3295"
          {...bind("2051:3295")}
        >
          <div
            className="d2f19aad70"
            data-node-id="2051:3296"
            {...bind("2051:3296")}
          >
            <div
              className="d28fee9540"
              data-node-id="2051:3297"
              {...bind("2051:3297")}
              data-name="Home Bar"
            >
              <div
                className="d5d21febc9"
                data-node-id="2051:3298"
                {...bind("2051:3298")}
                data-name="Rectangle"
              />
            </div>
          </div>
        </div>
        <div
          className="d25de2570b"
          data-node-id="2051:3299"
          {...bind("2051:3299")}
          data-name="Navigation (House Owner)"
        >
          <a
            className="d4af6c8eda"
            data-node-id="I2051:3299;413:495"
            {...bind("I2051:3299;413:495")}
          >
            <div
              className="d28d0390e1"
              data-node-id="I2051:3299;413:497"
              {...bind("I2051:3299;413:497")}
            >
              <p className="defcc9af6d" dir="auto">
                Home
              </p>
            </div>
            <div
              className="deb56045e6"
              data-node-id="I2051:3299;413:498"
              {...bind("I2051:3299;413:498")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector4} />
              </div>
            </div>
          </a>
          <div
            className="d3ed53e344"
            data-node-id="I2051:3299;413:499"
            {...bind("I2051:3299;413:499")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="I2051:3299;413:575"
              {...bind("I2051:3299;413:575")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse5} />
            </div>
            <div
              className="d62e2f4de2"
              data-node-id="I2051:3299;413:500"
              {...bind("I2051:3299;413:500")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse4} />
            </div>
            <div
              className="d64c83cc0e"
              data-node-id="I2051:3299;413:501"
              {...bind("I2051:3299;413:501")}
            >
              <p className="defcc9af6d" dir="auto">
                Store
              </p>
            </div>
            <div
              className="d20c7685d3"
              data-node-id="I2051:3299;413:502"
              {...bind("I2051:3299;413:502")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector5} />
              </div>
            </div>
          </div>
          <button
            className="d4af6c8eda"
            data-node-id="I2051:3299;413:503"
            {...bind("I2051:3299;413:503")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="I2051:3299;413:504"
              {...bind("I2051:3299;413:504")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse4} />
            </div>
            <div
              className="d4a0fcbd71"
              data-node-id="I2051:3299;413:505"
              {...bind("I2051:3299;413:505")}
            >
              <p className="defcc9af6d" dir="auto">
                Monitoring
              </p>
            </div>
            <div
              className="d20c7685d3"
              data-node-id="I2051:3299;413:506"
              {...bind("I2051:3299;413:506")}
              data-name="Vector"
            >
              <div className="da468e0c1b">
                <img alt="" className="dacc3667e9" src={imgVector6} />
              </div>
            </div>
          </button>
          <button
            className="d4af6c8eda"
            data-node-id="I2051:3299;413:507"
            {...bind("I2051:3299;413:507")}
          >
            <div
              className="d62e2f4de2"
              data-node-id="I2051:3299;413:508"
              {...bind("I2051:3299;413:508")}
            >
              <img alt="" className="d8faf267d3" src={imgEllipse4} />
            </div>
            <div
              className="d4e401c6f6"
              data-node-id="I2051:3299;413:509"
              {...bind("I2051:3299;413:509")}
              data-name="Vector"
            >
              <div className="d10df0e13d">
                <img alt="" className="dacc3667e9" src={imgVector7} />
              </div>
            </div>
            <div
              className="d91da2ed40"
              data-node-id="I2051:3299;413:510"
              {...bind("I2051:3299;413:510")}
            >
              <p className="defcc9af6d" dir="auto">
                Schedule
              </p>
            </div>
          </button>
          <button
            className="d9e2118d67"
            data-node-id="I2051:3299;413:511"
            {...bind("I2051:3299;413:511")}
          >
            <div
              className="d0233fdec1"
              data-node-id="I2051:3299;413:512"
              {...bind("I2051:3299;413:512")}
              data-name="Vector"
            >
              <div className="d8c8983e95">
                <img alt="" className="dacc3667e9" src={imgVector8} />
              </div>
            </div>
            <div
              className="d2c6e5b666"
              data-node-id="I2051:3299;413:513"
              {...bind("I2051:3299;413:513")}
            >
              <p className="defcc9af6d" dir="auto">
                Profile
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
