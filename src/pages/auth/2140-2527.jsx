import React from 'react';
import {enhance} from './controls.jsx';
const assetPathPrefix = "/assets/auth";
const imgTime = `${assetPathPrefix}/ea77a.svg`;
const imgReception = `${assetPathPrefix}/50e69.svg`;
const imgWiFi = `${assetPathPrefix}/0be8d.svg`;
const imgBattery = `${assetPathPrefix}/55081.svg`;
const imgFrame1 = `${assetPathPrefix}/fe910.svg`;
const imgIsolationMode = `${assetPathPrefix}/95924.svg`;
const imgIsolationMode1 = `${assetPathPrefix}/68c44.svg`;
const imgEllipse9 = `${assetPathPrefix}/20ff6.svg`;
const imgVector = `${assetPathPrefix}/4ce70.svg`;
const imgVector1 = `${assetPathPrefix}/ab0fd.svg`;

export default function On2Screen({ui}) {
  return enhance((
    <div className="auth-design-0" data-node-id="2140:2527" data-name="On2 Screen">
      <div className="auth-design-25" data-node-id="2140:2528" data-name="Home Bar">
        <div className="auth-design-26" data-node-id="2140:2529" data-name="Rectangle" />
      </div>
      <div className="auth-design-35" data-node-id="2140:2530" data-name="Status Bar">
        <div className="auth-design-36" data-node-id="2140:2531" data-name="Time">
          <div className="auth-design-37" data-node-id="2140:2532" data-name="Time">
            <img alt="" className="auth-design-8" src={imgTime} />
          </div>
        </div>
        <div className="auth-design-38" data-node-id="2140:2534" data-name="Notch Frame">
          <div className="auth-design-39" data-node-id="2140:2535" data-name="Notch" />
        </div>
        <div className="auth-design-40" data-node-id="2140:2536" data-name="Icons">
          <div className="auth-design-41" data-node-id="2140:2537" data-name="Reception">
            <img alt="" className="auth-design-8" src={imgReception} />
          </div>
          <div className="auth-design-41" data-node-id="2140:2542" data-name="Wi-fi">
            <img alt="" className="auth-design-8" src={imgWiFi} />
          </div>
          <div className="auth-design-42" data-node-id="2140:2544" data-name="Battery">
            <img alt="" className="auth-design-8" src={imgBattery} />
          </div>
        </div>
      </div>
      <div className="auth-design-86" data-node-id="2140:2548">
        <img alt="" className="auth-design-8" src={imgFrame1} />
      </div>
      <div className="auth-design-87" data-node-id="2140:2552">
        <p className="auth-design-44">Put your skills</p>
        <p className="auth-design-45">to work.</p>
      </div>
      <div className="auth-design-88" data-node-id="2140:2553">
        <p className="auth-design-47">Connect with families looking</p>
        <p className="auth-design-10">for someone like you.</p>
      </div>
      <a className="auth-design-33" data-node-id="2140:2554" data-name="Isolation_Mode">
        <img alt="" className="auth-design-8" src={imgIsolationMode} />
        <p className="auth-design-34" data-node-id="2140:2556">
          Next
        </p>
      </a>
      <a className="auth-design-89" data-node-id="2140:2557" data-name="Isolation_Mode">
        <img alt="" className="auth-design-8" src={imgIsolationMode1} />
      </a>
      <div className="auth-design-90" data-node-id="2140:2560">
        <img alt="" className="auth-design-8" src={imgEllipse9} />
      </div>
      <div className="auth-design-91" data-node-id="2140:2561" data-name="Vector">
        <img alt="" className="auth-design-8" src={imgVector} />
      </div>
      <div className="auth-design-92" data-node-id="2140:2562" data-name="Vector">
        <img alt="" className="auth-design-8" src={imgVector1} />
      </div>
    </div>
  ), ui);
}
