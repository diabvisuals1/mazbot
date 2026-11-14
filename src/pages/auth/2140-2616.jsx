import React from 'react';
import {enhance} from './controls.jsx';
const assetPathPrefix = "/assets/auth";
const imgVector = `${assetPathPrefix}/7b5f6.svg`;
const imgIsolationMode = `${assetPathPrefix}/b9bcc.svg`;
const imgTime = `${assetPathPrefix}/ea77a.svg`;
const imgReception = `${assetPathPrefix}/50e69.svg`;
const imgWiFi = `${assetPathPrefix}/0be8d.svg`;
const imgBattery = `${assetPathPrefix}/55081.svg`;
const imgLayer1 = `${assetPathPrefix}/7eeb8.svg`;
const imgGroup172 = `${assetPathPrefix}/11a83.svg`;
const imgLayer2 = `${assetPathPrefix}/fcfc1.svg`;
const imgVector1 = `${assetPathPrefix}/5ccf8.svg`;
const imgVector2 = `${assetPathPrefix}/5165b.svg`;
const imgVector3 = `${assetPathPrefix}/98d5b.svg`;
const imgVector4 = `${assetPathPrefix}/4eb9c.svg`;

export default function SignupScreen({ui}) {
  return enhance((
    <div className="auth-design-0" data-node-id="2140:2616" data-name="Signup Screen">
      <div className="auth-design-114" data-node-id="2140:2617" data-name="Vector">
        <img alt="" className="auth-design-8" src={imgVector} />
      </div>
      <div className="auth-design-115" data-node-id="2140:2618" data-name="Isolation_Mode">
        <img alt="" className="auth-design-8" src={imgIsolationMode} />
        <p className="auth-design-116" data-node-id="2140:2620">
          Create account
        </p>
      </div>
      <div className="auth-design-25" data-node-id="2140:2621" data-name="Home Bar">
        <div className="auth-design-26" data-node-id="2140:2622" data-name="Rectangle" />
      </div>
      <div className="auth-design-35" data-node-id="2140:2623" data-name="Status Bar">
        <div className="auth-design-36" data-node-id="2140:2624" data-name="Time">
          <div className="auth-design-37" data-node-id="2140:2625" data-name="Time">
            <img alt="" className="auth-design-8" src={imgTime} />
          </div>
        </div>
        <div className="auth-design-38" data-node-id="2140:2627" data-name="Notch Frame">
          <div className="auth-design-39" data-node-id="2140:2628" data-name="Notch" />
        </div>
        <div className="auth-design-40" data-node-id="2140:2629" data-name="Icons">
          <div className="auth-design-41" data-node-id="2140:2630" data-name="Reception">
            <img alt="" className="auth-design-8" src={imgReception} />
          </div>
          <div className="auth-design-41" data-node-id="2140:2635" data-name="Wi-fi">
            <img alt="" className="auth-design-8" src={imgWiFi} />
          </div>
          <div className="auth-design-42" data-node-id="2140:2637" data-name="Battery">
            <img alt="" className="auth-design-8" src={imgBattery} />
          </div>
        </div>
      </div>
      <div className="auth-design-117" data-node-id="2140:2641">
        <p className="auth-design-44">Create your</p>
        <p className="auth-design-45">account.</p>
      </div>
      <div className="auth-design-118" data-node-id="2140:2642">
        <p className="auth-design-47">Join Mazbot to find trusted help</p>
        <p className="auth-design-10">or offer your skills.</p>
      </div>
      <div className="auth-design-119" data-node-id="2140:2643">
        <p className="auth-design-120">By continuing, you agree to our</p>
        <p className="auth-design-121">{`Terms & Privacy Policy`}</p>
      </div>
      <p className="auth-design-122" data-node-id="2140:2644">{`Already have an account? `}</p>
      <a className="auth-design-123" data-node-id="2140:2645">
        <p className="auth-design-124">Log in</p>
      </a>
      <div className="auth-design-125" data-node-id="2140:2646" data-name="Layer_1">
        <img alt="" className="auth-design-8" src={imgLayer1} />
      </div>
      <div className="auth-design-126" data-node-id="2140:2648">
        <img alt="" className="auth-design-8" src={imgGroup172} />
      </div>
      <div className="auth-design-127" data-node-id="2140:2654" data-name="Layer_1">
        <img alt="" className="auth-design-8" src={imgLayer2} />
      </div>
      <div className="auth-design-128" data-node-id="2140:2656">
        <div className="auth-design-129" data-node-id="2140:2657" data-name="Vector">
          <div className="auth-design-130">
            <img alt="" className="auth-design-30" src={imgVector1} />
          </div>
        </div>
        <p className="auth-design-131" dir="auto" data-node-id="2140:2658">
          Full Name
        </p>
      </div>
      <div className="auth-design-132" data-node-id="2140:2659">
        <div className="auth-design-133" data-node-id="2140:2660" data-name="Vector">
          <div className="auth-design-134">
            <img alt="" className="auth-design-30" src={imgVector2} />
          </div>
        </div>
        <p className="auth-design-135" dir="auto" data-node-id="2140:2661">
          Password
        </p>
        <div className="auth-design-136" data-node-id="2140:2662" data-name="Vector">
          <div className="auth-design-137">
            <img alt="" className="auth-design-30" src={imgVector3} />
          </div>
        </div>
      </div>
      <div className="auth-design-138" data-node-id="2140:2663">
        <div className="auth-design-139" data-node-id="2140:2664" data-name="Vector">
          <div className="auth-design-140">
            <img alt="" className="auth-design-30" src={imgVector4} />
          </div>
        </div>
        <p className="auth-design-131" dir="auto" data-node-id="2140:2665">
          Phone number
        </p>
      </div>
    </div>
  ), ui);
}
