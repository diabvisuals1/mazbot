import React from 'react';
import {enhance} from './controls.jsx';
const assetPathPrefix = "/assets/auth";
const imgDashiconsArrowLeftAlt2 = `${assetPathPrefix}/16c8a.svg`;
const imgLayer1 = `${assetPathPrefix}/eaf46.svg`;
const imgAppIconLogo = `${assetPathPrefix}/7023b.svg`;
const imgRightSide = `${assetPathPrefix}/91254.svg`;
const imgVector = `${assetPathPrefix}/29983.svg`;

export default function Welcome({ui}) {
  return enhance((
    <div className="auth-design-0" data-node-id="2140:2420" data-name="Welcome">
      <a className="auth-design-1" data-node-id="2140:2421">
        <div className="auth-design-2" data-node-id="2140:2422">
          <div className="auth-design-3" data-node-id="2140:2423">
            <p className="auth-design-4" dir="auto">
              Get Started
            </p>
          </div>
          <div className="auth-design-5" data-node-id="2140:2424">
            <div className="auth-design-6">
              <div className="auth-design-7" data-name="dashicons:arrow-left-alt2">
                <img alt="" className="auth-design-8" src={imgDashiconsArrowLeftAlt2} />
              </div>
            </div>
          </div>
        </div>
      </a>
      <a className="auth-design-9" data-node-id="2140:2426">
        <p>
          <span className="auth-design-10">{`Already have an account? `}</span>
          <span className="auth-design-11">Log in</span>
        </p>
      </a>
      <div className="auth-design-12" data-node-id="2140:2427">
        <div className="auth-design-13" data-node-id="2140:2428">
          <div className="auth-design-13" data-node-id="2140:2429">
            <div className="auth-design-14" data-node-id="2140:2430" data-name="Layer_1">
              <img alt="" className="auth-design-8" src={imgLayer1} />
            </div>
          </div>
        </div>
        <div className="auth-design-15" data-node-id="2140:2437" data-name="app-icon-logo">
          <img alt="" className="auth-design-8" src={imgAppIconLogo} />
        </div>
      </div>
      <div className="auth-design-16" data-node-id="2140:2438" data-name="StatusBar / iPhone 13">
        <div className="auth-design-17" data-node-id="I2140:2438;839:7139" data-name="Left Side">
          <div className="auth-design-18" data-node-id="I2140:2438;839:7140" data-name="_StatusBar-time">
            <p className="auth-design-19" data-node-id="I2140:2438;839:7140;839:7100">
              9:41
            </p>
          </div>
        </div>
        <div className="auth-design-20" data-node-id="I2140:2438;839:7141" data-name="Right Side">
          <img alt="" className="auth-design-8" src={imgRightSide} />
        </div>
      </div>
      <div className="auth-design-21" data-node-id="2140:2439" style={{ containerType: "size" }}>
        <div className="auth-design-22">
          <div className="auth-design-23" data-name="Vector">
            <img alt="" className="auth-design-8" src={imgVector} />
          </div>
        </div>
      </div>
      <p className="auth-design-24" data-node-id="2140:2440">{`Better care Brighter days `}</p>
      <div className="auth-design-25" data-node-id="2140:2441" data-name="Home Bar">
        <div className="auth-design-26" data-node-id="2140:2442" data-name="Rectangle" />
      </div>
    </div>
  ), ui);
}
