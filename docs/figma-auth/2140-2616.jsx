const assetPathPrefix = "https://www.figma.com/api/mcp/asset/4cfd4551-6cf5-4fab-945d-58128f73b0b7";
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

export default function SignupScreen() {
  return (
    <div className="bg-white relative size-full" data-node-id="2140:2616" data-name="Signup Screen">
      <div className="absolute inset-[30.42%_66.67%_47.78%_-16.27%]" data-node-id="2140:2617" data-name="Vector">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
      </div>
      <div className="-translate-x-1/2 absolute h-[52px] left-[calc(50%-0.5px)] overflow-clip top-[631px] w-[344px]" data-node-id="2140:2618" data-name="Isolation_Mode">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIsolationMode} />
        <p className="[word-break:break-word] absolute font-['Arial:Bold'] inset-[26.92%_26.45%] leading-[normal] not-italic text-[21px] text-center text-white" data-node-id="2140:2620">
          Create account
        </p>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex h-[34px] items-center justify-center left-0 overflow-clip pt-[13px] right-0 top-[778px]" data-node-id="2140:2621" data-name="Home Bar">
        <div className="bg-black h-[5px] relative rounded-[3px] shrink-0 w-[134px]" data-node-id="2140:2622" data-name="Rectangle" />
      </div>
      <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 overflow-clip right-0 top-0" data-node-id="2140:2623" data-name="Status Bar">
        <div className="content-stretch flex flex-[1_0_0] h-full items-end justify-center min-w-px overflow-clip relative" data-node-id="2140:2624" data-name="Time">
          <div className="h-[13px] relative shrink-0 w-[40px]" data-node-id="2140:2625" data-name="Time">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTime} />
          </div>
        </div>
        <div className="content-stretch flex h-[32px] items-start justify-center overflow-clip relative shrink-0 w-[172px]" data-node-id="2140:2627" data-name="Notch Frame">
          <div className="h-[32px] relative shrink-0 w-[172px]" data-node-id="2140:2628" data-name="Notch" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-end justify-center min-w-px overflow-clip relative" data-node-id="2140:2629" data-name="Icons">
          <div className="h-[12px] relative shrink-0 w-[18px]" data-node-id="2140:2630" data-name="Reception">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgReception} />
          </div>
          <div className="h-[12px] relative shrink-0 w-[18px]" data-node-id="2140:2635" data-name="Wi-fi">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWiFi} />
          </div>
          <div className="h-[13px] relative shrink-0 w-[28px]" data-node-id="2140:2637" data-name="Battery">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBattery} />
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Black'] h-[105px] leading-[0] left-[calc(50%-0.5px)] not-italic text-[43px] text-[color:var(--petrol,#003744)] text-center top-[70px] w-[354px]" data-node-id="2140:2641">
        <p className="leading-[47px] mb-0">Create your</p>
        <p className="leading-[47px]">account.</p>
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Regular'] leading-[0] left-1/2 not-italic text-[21px] text-[color:var(--petrol,#003744)] text-center top-[175px] whitespace-nowrap" data-node-id="2140:2642">
        <p className="leading-[normal] mb-0">Join Mazbot to find trusted help</p>
        <p className="leading-[normal]">or offer your skills.</p>
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Regular'] leading-[0] left-1/2 not-italic text-[0px] text-black text-center top-[699px] whitespace-nowrap" data-node-id="2140:2643">
        <p className="leading-[normal] mb-0 text-[12px]">By continuning, you agree to our</p>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] text-[12px] underline">{`Terms & Privacy Policy`}</p>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Regular'] leading-[normal] left-[calc(50%-22px)] not-italic text-[12px] text-black text-center top-[743px] whitespace-nowrap" data-node-id="2140:2644">{`Already have an account? `}</p>
      <a className="-translate-x-1/2 [word-break:break-word] absolute block cursor-pointer font-['Arial:Bold'] leading-[0] left-[calc(70%-1px)] not-italic text-[12px] text-black text-center top-[743px] whitespace-nowrap" data-node-id="2140:2645">
        <p className="[text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] underline">Log in</p>
      </a>
      <div className="absolute left-[calc(80%+8px)] size-[56px] top-[97px]" data-node-id="2140:2646" data-name="Layer_1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer1} />
      </div>
      <div className="absolute h-[215.696px] left-[calc(40%+47px)] top-[220px] w-[226.999px]" data-node-id="2140:2648">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup172} />
      </div>
      <div className="absolute left-[calc(80%+29px)] size-[93px] top-[125px]" data-node-id="2140:2654" data-name="Layer_1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer2} />
      </div>
      <div className="-translate-x-1/2 absolute border border-[rgba(0,55,68,0.5)] border-solid content-stretch flex gap-[32px] h-[52px] items-center left-1/2 overflow-clip pl-[24px] pr-[22px] py-[19px] rounded-[19px] top-[443px] w-[343px]" data-node-id="2140:2656">
        <div className="h-[18px] relative shrink-0 w-[14px]" data-node-id="2140:2657" data-name="Vector">
          <div className="absolute inset-[-5.56%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={imgVector1} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Arial:Regular'] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,55,68,0.5)] text-center whitespace-nowrap" dir="auto" data-node-id="2140:2658">
          Full Name
        </p>
      </div>
      <div className="absolute border border-[rgba(0,55,68,0.5)] border-solid h-[52px] left-[16px] overflow-clip rounded-[19px] top-[563px] w-[343px]" data-node-id="2140:2659">
        <div className="absolute h-[18px] left-[24px] top-[16px] w-[16px]" data-node-id="2140:2660" data-name="Vector">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <img alt="" className="block max-w-none size-full" src={imgVector2} />
          </div>
        </div>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Regular'] leading-[normal] left-[107.5px] not-italic text-[16px] text-[rgba(0,55,68,0.5)] text-center top-[16px] whitespace-nowrap" dir="auto" data-node-id="2140:2661">
          Password
        </p>
        <div className="absolute h-[16px] left-[300px] top-[16px] w-[18.694px]" data-node-id="2140:2662" data-name="Vector">
          <div className="absolute inset-[-6.25%_-5.35%]">
            <img alt="" className="block max-w-none size-full" src={imgVector3} />
          </div>
        </div>
      </div>
      <div className="absolute border border-[rgba(0,55,68,0.5)] border-solid content-stretch flex gap-[32px] h-[52px] items-center left-[16px] overflow-clip pl-[24px] pr-[23px] py-[19px] rounded-[19px] top-[503px] w-[343px]" data-node-id="2140:2663">
        <div className="relative shrink-0 size-[18px]" data-node-id="2140:2664" data-name="Vector">
          <div className="absolute inset-[-5.56%]">
            <img alt="" className="block max-w-none size-full" src={imgVector4} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Arial:Regular'] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,55,68,0.5)] text-center whitespace-nowrap" dir="auto" data-node-id="2140:2665">
          Phone number
        </p>
      </div>
    </div>
  );
}
