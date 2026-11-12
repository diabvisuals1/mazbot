const assetPathPrefix = "https://www.figma.com/api/mcp/asset/a1bb5f2f-3455-4923-b4b3-44585f676357";
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

export default function PhoneVerificationScreen() {
  return (
    <div className="bg-white relative size-full" data-node-id="2140:2666" data-name="Phone Verification Screen">
      <a className="-translate-x-1/2 absolute block cursor-pointer h-[52px] left-[calc(50%-0.5px)] overflow-clip top-[710px] w-[344px]" data-node-id="2140:2667" data-name="Isolation_Mode">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIsolationMode} />
        <p className="[word-break:break-word] absolute font-['Arial:Bold'] inset-[26.92%_26.45%] leading-[normal] not-italic text-[21px] text-center text-white" data-node-id="2140:2669">
          Continue
        </p>
      </a>
      <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex h-[34px] items-center justify-center left-0 overflow-clip pt-[13px] right-0 top-[778px]" data-node-id="2140:2670" data-name="Home Bar">
        <div className="bg-black h-[5px] relative rounded-[3px] shrink-0 w-[134px]" data-node-id="2140:2671" data-name="Rectangle" />
      </div>
      <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 overflow-clip right-0 top-0" data-node-id="2140:2672" data-name="Status Bar">
        <div className="content-stretch flex flex-[1_0_0] h-full items-end justify-center min-w-px overflow-clip relative" data-node-id="2140:2673" data-name="Time">
          <div className="h-[13px] relative shrink-0 w-[40px]" data-node-id="2140:2674" data-name="Time">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTime} />
          </div>
        </div>
        <div className="content-stretch flex h-[32px] items-start justify-center overflow-clip relative shrink-0 w-[172px]" data-node-id="2140:2676" data-name="Notch Frame">
          <div className="h-[32px] relative shrink-0 w-[172px]" data-node-id="2140:2677" data-name="Notch" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-end justify-center min-w-px overflow-clip relative" data-node-id="2140:2678" data-name="Icons">
          <div className="h-[12px] relative shrink-0 w-[18px]" data-node-id="2140:2679" data-name="Reception">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgReception} />
          </div>
          <div className="h-[12px] relative shrink-0 w-[18px]" data-node-id="2140:2684" data-name="Wi-fi">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWiFi} />
          </div>
          <div className="h-[13px] relative shrink-0 w-[28px]" data-node-id="2140:2686" data-name="Battery">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBattery} />
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Black'] h-[105px] leading-[0] left-[calc(50%-0.5px)] not-italic text-[43px] text-[color:var(--petrol,#003744)] text-center top-[70px] w-[354px]" data-node-id="2140:2690">
        <p className="leading-[47px] mb-0">Verify your</p>
        <p className="leading-[47px]">phone number</p>
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Regular'] leading-[0] left-[calc(50%-0.5px)] not-italic text-[21px] text-[color:var(--petrol,#003744)] text-center top-[175px] whitespace-nowrap" data-node-id="2140:2691">
        <p className="leading-[normal] mb-0">We’ve sent a 6-digit code to</p>
        <p className="leading-[normal]">+20 10 3253 9836</p>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex items-center left-[calc(50%-0.5px)] top-[679px]" data-node-id="2140:2692">
        <p className="[word-break:break-word] font-['Arial:Regular'] leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--petrol,#003744)] whitespace-nowrap" data-node-id="2140:2693">
          <span className="leading-[normal] text-[rgba(0,55,68,0.5)]">Resend code in</span>
          <span className="leading-[normal] text-[#003744]">{` `}</span>
          <span className="font-['Arial:Bold'] leading-[normal] text-[#003744]">00:29</span>
        </p>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex items-center left-[calc(50%+0.5px)] top-[659px]" data-node-id="2140:2694">
        <p className="[word-break:break-word] font-['Arial:Regular'] leading-[normal] not-italic relative shrink-0 text-[13px] text-[rgba(0,55,68,0.5)] whitespace-nowrap" data-node-id="2140:2695">
          Didn’t receive the code?
        </p>
      </div>
      <div className="absolute content-stretch flex items-start left-[23px] top-[587px]" data-node-id="2140:2696">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="I2140:2696;235:1507">
          <div className="border border-[rgba(0,55,68,0.5)] border-solid h-[56px] relative rounded-[12px] shrink-0 w-[48px]" data-node-id="I2140:2696;235:1507;428:843" />
          <div className="border border-[rgba(0,55,68,0.5)] border-solid h-[56px] relative rounded-[12px] shrink-0 w-[47px]" data-node-id="I2140:2696;235:1507;428:845" />
          <div className="border border-[rgba(0,55,68,0.5)] border-solid h-[56px] relative rounded-[12px] shrink-0 w-[49px]" data-node-id="I2140:2696;235:1507;428:846" />
          <div className="border border-[rgba(0,55,68,0.5)] border-solid h-[56px] relative rounded-[12px] shrink-0 w-[49px]" data-node-id="I2140:2696;235:1507;428:847" />
          <div className="border border-[rgba(0,55,68,0.5)] border-solid h-[56px] relative rounded-[12px] shrink-0 w-[47px]" data-node-id="I2140:2696;235:1507;428:852" />
          <div className="border border-[rgba(0,55,68,0.5)] border-solid h-[56px] relative rounded-[12px] shrink-0 w-[48px]" data-node-id="I2140:2696;235:1507;428:853" />
        </div>
      </div>
      <div className="absolute inset-[27.59%_72.53%_50.62%_-22.13%]" data-node-id="2140:2697" data-name="Vector">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
      </div>
      <div className="absolute left-[calc(80%+33px)] size-[56px] top-[294px]" data-node-id="2140:2698" data-name="Layer_1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer1} />
      </div>
      <div className="absolute left-[calc(80%+6px)] size-[93px] top-[407px]" data-node-id="2140:2700" data-name="Layer_1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer2} />
      </div>
      <div className="absolute h-[40px] left-[77px] top-[531px] w-[229px]" data-node-id="2140:2702">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse9} />
      </div>
      <div className="absolute left-[57px] size-[277px] top-[302px]" data-node-id="2140:2703" data-name="image 104">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage104} />
      </div>
    </div>
  );
}
