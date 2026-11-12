const assetPathPrefix = "https://www.figma.com/api/mcp/asset/ce448519-40b0-4e9c-b162-a02e7b84733c";
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

export default function On2Screen() {
  return (
    <div className="bg-white relative size-full" data-node-id="2140:2527" data-name="On2 Screen">
      <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex h-[34px] items-center justify-center left-0 overflow-clip pt-[13px] right-0 top-[778px]" data-node-id="2140:2528" data-name="Home Bar">
        <div className="bg-black h-[5px] relative rounded-[3px] shrink-0 w-[134px]" data-node-id="2140:2529" data-name="Rectangle" />
      </div>
      <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 overflow-clip right-0 top-0" data-node-id="2140:2530" data-name="Status Bar">
        <div className="content-stretch flex flex-[1_0_0] h-full items-end justify-center min-w-px overflow-clip relative" data-node-id="2140:2531" data-name="Time">
          <div className="h-[13px] relative shrink-0 w-[40px]" data-node-id="2140:2532" data-name="Time">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTime} />
          </div>
        </div>
        <div className="content-stretch flex h-[32px] items-start justify-center overflow-clip relative shrink-0 w-[172px]" data-node-id="2140:2534" data-name="Notch Frame">
          <div className="h-[32px] relative shrink-0 w-[172px]" data-node-id="2140:2535" data-name="Notch" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-end justify-center min-w-px overflow-clip relative" data-node-id="2140:2536" data-name="Icons">
          <div className="h-[12px] relative shrink-0 w-[18px]" data-node-id="2140:2537" data-name="Reception">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgReception} />
          </div>
          <div className="h-[12px] relative shrink-0 w-[18px]" data-node-id="2140:2542" data-name="Wi-fi">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWiFi} />
          </div>
          <div className="h-[13px] relative shrink-0 w-[28px]" data-node-id="2140:2544" data-name="Battery">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBattery} />
          </div>
        </div>
      </div>
      <div className="absolute h-[14px] left-[142px] top-[646px] w-[90px]" data-node-id="2140:2548">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1} />
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Black'] h-[105px] leading-[0] left-[calc(50%+0.5px)] not-italic text-[45px] text-[color:var(--petrol,#003744)] text-center top-[94px] w-[354px]" data-node-id="2140:2552">
        <p className="leading-[47px] mb-0">Put your skills</p>
        <p className="leading-[47px]">to work.</p>
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Arial:Regular'] leading-[0] left-[calc(50%+0.5px)] not-italic text-[21px] text-[color:var(--petrol,#003744)] text-center top-[199px] whitespace-nowrap" data-node-id="2140:2553">
        <p className="leading-[normal] mb-0">Connect with families looking</p>
        <p className="leading-[normal]">for someone like you.</p>
      </div>
      <a className="-translate-x-1/2 absolute block cursor-pointer h-[52px] left-[calc(50%+3.5px)] overflow-clip rounded-[521px] top-[702px] w-[346px]" data-node-id="2140:2554" data-name="Isolation_Mode">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIsolationMode} />
        <p className="[word-break:break-word] absolute font-['Arial:Bold'] inset-[26.92%_36.72%] leading-[normal] not-italic text-[21px] text-center text-white" data-node-id="2140:2556">
          Next
        </p>
      </a>
      <a className="-translate-x-1/2 absolute block cursor-pointer h-[30px] left-[calc(50%-156px)] top-[48px] w-[31px]" data-node-id="2140:2557" data-name="Isolation_Mode">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIsolationMode1} />
      </a>
      <div className="absolute h-[65px] left-[38px] top-[539px] w-[298px]" data-node-id="2140:2560">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse9} />
      </div>
      <div className="absolute inset-[49.75%_85.33%_47.04%_7.73%]" data-node-id="2140:2561" data-name="Vector">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
      </div>
      <div className="absolute inset-[36.21%_20%_60.59%_73.07%]" data-node-id="2140:2562" data-name="Vector">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
      </div>
    </div>
  );
}
