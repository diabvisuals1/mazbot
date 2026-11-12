const assetPathPrefix = "https://www.figma.com/api/mcp/asset/2f6cf83f-89d3-4849-bd3f-7deb5f42a068";
const imgDashiconsArrowLeftAlt2 = `${assetPathPrefix}/16c8a.svg`;
const imgLayer1 = `${assetPathPrefix}/eaf46.svg`;
const imgAppIconLogo = `${assetPathPrefix}/7023b.svg`;
const imgRightSide = `${assetPathPrefix}/91254.svg`;
const imgVector = `${assetPathPrefix}/29983.svg`;

export default function Welcome() {
  return (
    <div className="bg-white relative size-full" data-node-id="2140:2420" data-name="Welcome">
      <a className="absolute bg-[#164f60] block border-2 border-[var(--cream,#f3ebde)] border-solid cursor-pointer h-[48px] left-[16px] overflow-clip rounded-[65px] top-[679px] w-[343px]" data-node-id="2140:2421">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] items-center justify-center left-1/2 top-1/2" data-node-id="2140:2422">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap" data-node-id="2140:2423">
            <p className="leading-[13px]" dir="auto">
              Get Started
            </p>
          </div>
          <div className="flex items-center justify-center relative shrink-0" data-node-id="2140:2424">
            <div className="flex-none rotate-180">
              <div className="relative size-[24px]" data-name="dashicons:arrow-left-alt2">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDashiconsArrowLeftAlt2} />
              </div>
            </div>
          </div>
        </div>
      </a>
      <a className="-translate-x-1/2 [word-break:break-word] absolute block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] left-1/2 not-italic text-[#003744] text-[16px] text-center top-[735px] whitespace-nowrap" data-node-id="2140:2426">
        <p>
          <span className="leading-[normal]">{`Already have an account? `}</span>
          <span className="[word-break:break-word] font-['Inter:Black'] font-black leading-[normal] not-italic">Log in</span>
        </p>
      </a>
      <div className="-translate-x-1/2 absolute contents left-[calc(50%+0.04px)] top-[235px]" data-node-id="2140:2427">
        <div className="absolute contents left-[calc(12.5%+42.57px)] top-[380.69px]" data-node-id="2140:2428">
          <div className="absolute contents left-[calc(12.5%+42.57px)] top-[380.69px]" data-node-id="2140:2429">
            <div className="absolute h-[39.311px] left-[calc(12.5%+42.57px)] top-[380.69px] w-[196.191px]" data-node-id="2140:2430" data-name="Layer_1">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer1} />
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[53.82%] left-[calc(50%+0.5px)] top-[28.94%] w-[92px]" data-node-id="2140:2437" data-name="app-icon-logo">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAppIconLogo} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[38px] left-1/2 overflow-clip top-0 w-[375px]" data-node-id="2140:2438" data-name="StatusBar / iPhone 13">
        <div className="-translate-x-1/2 absolute contents left-[calc(16.67%-10.5px)] top-[14px]" data-node-id="I2140:2438;839:7139" data-name="Left Side">
          <div className="-translate-x-1/2 absolute h-[21px] left-[calc(16.67%-10.5px)] rounded-[24px] top-[14px] w-[54px]" data-node-id="I2140:2438;839:7140" data-name="_StatusBar-time">
            <p className="-translate-x-1/2 [word-break:break-word] absolute font-['SF_Pro_Text:Semibold'] h-[20px] leading-[22px] left-[27px] not-italic text-[17px] text-black text-center top-px tracking-[-0.408px] w-[54px]" data-node-id="I2140:2438;839:7140;839:7100">
              9:41
            </p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[13px] left-[calc(83.33%+0.2px)] top-[19px] w-[77.401px]" data-node-id="I2140:2438;839:7141" data-name="Right Side">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRightSide} />
        </div>
      </div>
      <div className="absolute flex inset-[6.44%_42.74%_93.14%_56.11%] items-center justify-center" data-node-id="2140:2439" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-18.3418cqw,40.2575cqh)] rotate-30 w-[hypot(81.6582cqw,59.7425cqh)]">
          <div className="relative size-full" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
          </div>
        </div>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[calc(50%-0.5px)] not-italic text-[20px] text-[color:var(--petrol,#003744)] text-center top-[428px] w-[248px]" data-node-id="2140:2440">{`Better care Brighter days `}</p>
      <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex h-[34px] items-center justify-center left-0 overflow-clip pt-[13px] right-0 top-[778px]" data-node-id="2140:2441" data-name="Home Bar">
        <div className="bg-black h-[5px] relative rounded-[3px] shrink-0 w-[134px]" data-node-id="2140:2442" data-name="Rectangle" />
      </div>
    </div>
  );
}
