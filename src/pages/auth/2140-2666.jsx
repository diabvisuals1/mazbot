import React from 'react';
import {enhance} from './controls.jsx';
const assetPathPrefix = "/assets/auth";
const imgImage104 = `${assetPathPrefix}/05d09.png`;
const imgIsolationMode = `${assetPathPrefix}/99631.svg`;
const imgTime = `${assetPathPrefix}/ea77a.svg`;
const imgReception = `${assetPathPrefix}/50e69.svg`;
const imgWiFi = `${assetPathPrefix}/0be8d.svg`;
const imgBattery = `${assetPathPrefix}/55081.svg`;
const imgVector = `${assetPathPrefix}/7b5f6.svg`;
const imgLayer1 = `${assetPathPrefix}/7eeb8.svg`;
const imgLayer2 = `${assetPathPrefix}/fcfc1.svg`;
const imgEllipse9 = `${assetPathPrefix}/32d65.svg`;

export default function PhoneVerificationScreen({ui}) {
  return enhance((
    <div className="auth-design-0" data-node-id="2140:2666" data-name="Phone Verification Screen">
      <a className="auth-design-141" data-node-id="2140:2667" data-name="Isolation_Mode">
        <img alt="" className="auth-design-8" src={imgIsolationMode} />
        <p className="auth-design-116" data-node-id="2140:2669">
          Continue
        </p>
      </a>
      <div className="auth-design-25" data-node-id="2140:2670" data-name="Home Bar">
        <div className="auth-design-26" data-node-id="2140:2671" data-name="Rectangle" />
      </div>
      <div className="auth-design-35" data-node-id="2140:2672" data-name="Status Bar">
        <div className="auth-design-36" data-node-id="2140:2673" data-name="Time">
          <div className="auth-design-37" data-node-id="2140:2674" data-name="Time">
            <img alt="" className="auth-design-8" src={imgTime} />
          </div>
        </div>
        <div className="auth-design-38" data-node-id="2140:2676" data-name="Notch Frame">
          <div className="auth-design-39" data-node-id="2140:2677" data-name="Notch" />
        </div>
        <div className="auth-design-40" data-node-id="2140:2678" data-name="Icons">
          <div className="auth-design-41" data-node-id="2140:2679" data-name="Reception">
            <img alt="" className="auth-design-8" src={imgReception} />
          </div>
          <div className="auth-design-41" data-node-id="2140:2684" data-name="Wi-fi">
            <img alt="" className="auth-design-8" src={imgWiFi} />
          </div>
          <div className="auth-design-42" data-node-id="2140:2686" data-name="Battery">
            <img alt="" className="auth-design-8" src={imgBattery} />
          </div>
        </div>
      </div>
      <div className="auth-design-117" data-node-id="2140:2690">
        <p className="auth-design-44">Verify your</p>
        <p className="auth-design-45">phone number</p>
      </div>
      <div className="auth-design-142" data-node-id="2140:2691">
        <p className="auth-design-47">We’ve sent a 6-digit code to</p>
        <p className="auth-design-10">+20 10 3253 9836</p>
      </div>
      <div className="auth-design-143" data-node-id="2140:2692">
        <p className="auth-design-144" data-node-id="2140:2693">
          <span className="auth-design-145">Resend code in</span>
          <span className="auth-design-146">{` `}</span>
          <span className="auth-design-147">00:29</span>
        </p>
      </div>
      <div className="auth-design-148" data-node-id="2140:2694">
        <p className="auth-design-149" data-node-id="2140:2695">
          Didn’t receive the code?
        </p>
      </div>
      <div className="auth-design-150" data-node-id="2140:2696">
        <div className="auth-design-151" data-node-id="I2140:2696;235:1507">
          <div className="auth-design-152" data-node-id="I2140:2696;235:1507;428:843" />
          <div className="auth-design-153" data-node-id="I2140:2696;235:1507;428:845" />
          <div className="auth-design-154" data-node-id="I2140:2696;235:1507;428:846" />
          <div className="auth-design-154" data-node-id="I2140:2696;235:1507;428:847" />
          <div className="auth-design-153" data-node-id="I2140:2696;235:1507;428:852" />
          <div className="auth-design-152" data-node-id="I2140:2696;235:1507;428:853" />
        </div>
      </div>
      <div className="auth-design-155" data-node-id="2140:2697" data-name="Vector">
        <img alt="" className="auth-design-8" src={imgVector} />
      </div>
      <div className="auth-design-156" data-node-id="2140:2698" data-name="Layer_1">
        <img alt="" className="auth-design-8" src={imgLayer1} />
      </div>
      <div className="auth-design-157" data-node-id="2140:2700" data-name="Layer_1">
        <img alt="" className="auth-design-8" src={imgLayer2} />
      </div>
      <div className="auth-design-158" data-node-id="2140:2702">
        <img alt="" className="auth-design-8" src={imgEllipse9} />
      </div>
      <div className="auth-design-159" data-node-id="2140:2703" data-name="image 104">
        <img alt="" className="auth-design-78" src={imgImage104} />
      </div>
    </div>
  ), ui);
}
