import React from "react";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  lazy,
  Suspense,
} from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ScreenContext } from "./context/ScreenContext.jsx";
import {ImageExplorer} from "./components/ImageExplorer.jsx";
import Experience, { AnimatedNumber } from "./components/Experience.jsx";
import PageSkeleton from "./components/PageSkeleton.jsx";
import TopBar from "./components/TopBar.jsx";
import ChatExpandedSheet from "./components/ChatExpandedSheet.jsx";
import Navigation from "./components/Navigation.jsx";
import Dialog from "./components/Dialog.jsx";
import FilterSheet from "./components/FilterSheet.jsx";
import { Button } from "./components/Primitives.jsx";
import {
  Booking,
  Schedule,
  Account,
  Conversation,
  Cart,
  CategoryPage,
} from "./pages/JourneyPages.jsx";
import config from "./data/controls.json";
import catalog from "./data/catalog.json";
const AuthPages = lazy(() => import("./pages/AuthPages.jsx"));
const authPaths = ["/start","/onboarding","/onboarding/2","/onboarding/3","/auth","/signup","/forgot-password","/verify"];
const FlowPages = lazy(() => import("./pages/FlowPages.jsx"));
import { initialWorkflow, helperDirectory, roleHomes } from "./data/workflow.js";
const Home = lazy(() => import("./pages/Screen2051_1878.jsx"));
const Services = FlowPages;
const Helpers = FlowPages;
const Profile = lazy(() => import("./pages/Screen2051_1778.jsx"));
const Chats = lazy(() => import("./pages/Screen2051_2475.jsx"));
const AllChats = lazy(() => import("./pages/Screen2051_2607.jsx"));
const Store = lazy(() => import("./pages/Screen2051_2752.jsx"));
const Mobility = lazy(() => import("./pages/Screen2051_2892.jsx"));
const Equipment = lazy(() => import("./pages/Screen2051_3069.jsx"));
const Product = lazy(() => import("./pages/Screen2051_3241.jsx"));
const Monitoring = lazy(() => import("./pages/Screen2051_2015.jsx"));
const Tracking = FlowPages;
const Cameras = lazy(() => import("./pages/Screen2051_2188.jsx"));
function usePersistent(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mazbot:" + key)) ?? initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("mazbot:" + key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}
const screens = [
  ["/", "2051:1878", 994, Home],
  ["/services", "2051:2267", 1110, Services],
  ["/helpers", "2051:1435", 1403, Helpers],
  ["/helpers/profile", "2051:1778", 1099, Profile],
  ["/chats", "2051:2475", 812, Chats],
  ["/chats/all", "2051:2607", 900, AllChats],
  ["/store", "2051:2752", 1254, Store],
  ["/store/mobility", "2051:2892", 1254, Mobility],
  ["/store/monitoring", "2051:3069", 1254, Equipment],
  ["/store/product", "2051:3241", 1254, Product],
  ["/monitoring", "2051:2015", 934, Monitoring],
  ["/monitoring/tracking", "2051:2106", 810, Tracking],
  ["/monitoring/cameras", "2051:2188", 835, Cameras],
];
const defaultProduct = {
  key: "Monitoring Camera",
  name: "Monitoring Camera",
  price: 300,
  image: "/assets/c4d8a.png",
};
export default function App() {
  const navigate = useNavigate(),
    location = useLocation();
  const reduced = useReducedMotion();
  const scroll = useRef(null);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [chatTransition, setChatTransition] = useState(false);
  const [chatListExpanded, setChatListExpanded] = useState(false);
  useLayoutEffect(() => {
    if (!chatListExpanded) return;
    const device = scroll.current?.parentElement;
    if (device) device.scrollTop = 0;
  }, [chatListExpanded]);
  const [toast, setToast] = useState("");
  const [saved, setSaved] = usePersistent("favorites", []);
  const [workflow, setWorkflow] = usePersistent("workflow", initialWorkflow);
  const [cart, setCart] = usePersistent("cart", []);
  const [bookings, setBookings] = usePersistent("bookings", []);
  const [bookingDraft, setBookingDraft] = usePersistent("booking-draft", null);
  const [profile, setProfile] = usePersistent("profile", { name: "Diab" });
  const [messages, setMessages] = usePersistent("messages", {});
  const [day, setDay] = usePersistent("day", 25);
  const [service, setService] = usePersistent("service", "Cleaning");
  const [filters, setFilters] = usePersistent("filters", {
    service: "Cleaning",
    budget: 600,
    rating: 0,
    date: "",
  });
  const [person, setPerson] = usePersistent("person", "Amal Mostafa");
  const [helperImage, setHelperImage] = usePersistent(
    "helper-image",
    "/assets/b2a63.png",
  );
  const [helperPrice, setHelperPrice] = usePersistent("helper-price", 475);
  const [product, setProduct] = usePersistent("product", defaultProduct);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (product.name === 'Monitoring Camera' && product.price !== 300) setProduct(p=>({...p,price:300}));
  }, [product.name, product.price, setProduct]);
  const [addons, setAddons] = useState([]);
  const [category, setCategory] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  useEffect(() => {
    if (location.pathname === "/" && !workflow.onboarded) navigate("/start", { replace: true });
    else if (location.pathname === "/" && workflow.role !== "owner") navigate(roleHomes[workflow.role], { replace: true });
  }, [location.pathname, workflow.onboarded, workflow.role, navigate]);
  useEffect(() => {
    setQuery(location.state?.search || "");
    setModal(location.state?.openFilters ? "store-filters" : null);
    scroll.current?.scrollTo({ top: 0 });
    document.title =
      "MAZBOT · " +
      (screens
        .find((s) => s[0] === location.pathname)?.[0]
        .split("/")
        .filter(Boolean)
        .at(-1) || "Your home, organized");
  }, [location.pathname]);
  useEffect(() => {
    if (!location.state?.chatTransition) return;
    const timer = setTimeout(() => setChatTransition(false), 760);
    return () => clearTimeout(timer);
  }, [location.key]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);
  const closeModal = useCallback(() => setModal(null), []);
  function addCart(item, q = 1) {
    setCart((old) => {
      const found = old.find((p) => p.key === item.key);
      return found
        ? old.map((p) =>
            p.key === item.key ? { ...p, ...item, quantity: p.quantity + q } : p,
          )
        : [...old, { ...item, quantity: q }];
    });
    setToast(item.name + " added to cart");
  }
  function updateCart(key, delta) {
    setCart((old) =>
      old
        .map((p) =>
          p.key === key ? { ...p, quantity: p.quantity + delta } : p,
        )
        .filter((p) => p.quantity > 0),
    );
  }
  function act(c, id, fromExpandedChatList = false) {
    switch (c.action) {
      case "navigate":
        navigate(c.path);
        break;
      case "back":
        navigate(
          location.pathname.startsWith("/helpers/profile")
            ? "/helpers"
            : location.pathname.startsWith("/monitoring/")
              ? "/monitoring"
              : location.pathname === "/services"
                ? "/"
                : location.pathname.startsWith("/store/")
                  ? "/store"
                  : "/",
        );
        break;
      case "save":
        setSaved((old) =>
          old.includes(c.key)
            ? old.filter((x) => x !== c.key)
            : [...old, c.key],
        );
        break;
      case "day":
        setDay(c.day);
        break;
      case "service":
        setService(c.category);
        setFilters((v) => ({ ...v, service: c.category }));
        navigate("/flow/requirements");
        break;
      case "category":
        setCategory(c.category);
        navigate(
          c.category === "Mobility aids"
            ? "/store/mobility"
            : c.category === "Nursing supplies"
              ? "/store/nursing"
              : c.category === "Cleaning supplies"
                ? "/store/cleaning"
                : "/store/monitoring",
        );
        break;
      case "helper": {
        const h = catalog.helpers[c.card] || helperDirectory.find(h=>h.name===c.person);
        setPerson(h?.name || c.person || "Amal Mostafa");
        setHelperImage(h?.image || "/assets/b2a63.png");
        setHelperPrice(h?.price || 475);
        setWorkflow(old=>({...old,selectedBooking:null,selectedHelper:helperDirectory.find(x=>x.name===h?.name)||h}));
        navigate("/helpers/profile");
        break;
      }
      case "product": {
        const p = catalog.products[c.card] || defaultProduct;
        setProduct(p.name === "Monitoring Camera" ? defaultProduct : p);
        setQuantity(1);
        setAddons([]);
        navigate("/store/product");
        break;
      }
      case "buy": {
        const p = catalog.products[c.card] || { ...defaultProduct, price: 300 };
        addCart(p);
        navigate("/cart");
        break;
      }
      case "cart-add":
        addCart({ ...product, addons }, quantity);
        break;
      case "cart":
        navigate("/cart");
        break;
      case "quantity-up":
        setQuantity((v) => Math.min(v + 1, 99));
        break;
      case "quantity-down":
        setQuantity((v) => Math.max(v - 1, 1));
        break;
      case "chat":
        if (c.label === "Ask AI") { navigate("/flow/assistant"); break; }
        if (!fromExpandedChatList && location.pathname === "/chats" && ["2051:2486", "2051:2505", "2051:2524", "2051:2543"].includes(id)) {
          setChatListExpanded(true);
          break;
        }
        if (c.person) setPerson(c.person);
        if (["/chats", "/chats/all"].includes(location.pathname)) {
          setChatTransition(true);
          setChatListExpanded(false);
          navigate("/chats/conversation", { state: { chatTransition: "up" } });
        } else navigate("/chats/conversation");
        break;
      case "offline":
        setToast("Bedroom camera is offline. Check its power and connection.");
        break;
      case "camera":
        navigate("/flow/device/" + (c.label?.toLowerCase().includes("kitchen") ? "kitchen" : c.label?.toLowerCase().includes("entrance") ? "entrance" : "living"));
        break;
      case "issue":
        navigate("/flow/support");
        break;
      case "reset-filters":
        setFilters({service:"Cleaning",budget:600,rating:0,date:""});
        break;
      default:
        setModal(c.action);
    }
  }
  const app = {
    workflow,
    setWorkflow,
    act,
    query,
    setQuery,
    modal,
    setModal,
    chatListExpanded,
    setChatListExpanded,
    saved,
    setSaved,
    cart,
    setCart,
    updateCart,
    bookings,
    setBookings,
    bookingDraft,
    setBookingDraft,
    profile,
    setProfile,
    messages,
    setMessages,
    person,
    setPerson,
    helperImage,
    setHelperImage,
    helperPrice,
    setHelperPrice,
    product,
    setProduct,
    quantity,
    setQuantity,
    addons,
    setAddons,
    day,
    service,
    setService,
    filters,
    setFilters,
    setToast,
    category,
    savedOnly,
    setSavedOnly,
    onlineOnly,
    setOnlineOnly,
  };
  const active = screens.find((s) => s[0] === location.pathname);
  const isFilters = location.pathname === "/helpers/filters";
  const canSearch =
    location.pathname.startsWith("/store") ||
    location.pathname === "/chats" ||
    location.pathname === "/chats/all";
  return (
    <ScreenContext.Provider value={app}>
      <div className={"device "+(!authPaths.includes(location.pathname)?"with-topbar":"")} >
        {!authPaths.includes(location.pathname)&&<TopBar/>}
        <div className="app-scroll" ref={scroll} inert={isFilters || !!modal || chatListExpanded}>
          <AnimatePresence mode="wait" custom={chatTransition ? "chat-up" : null}>
            <motion.div
              key={location.pathname}
              className="route-view"
              custom={location.state?.chatTransition ? "chat-enter" : null}
              variants={{
                initial: direction => reduced ? { opacity: 1, y: 0 } : direction === "chat-enter" ? { opacity: 1, y: "100%" } : { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] } },
                exit: direction => reduced ? { opacity: 1, y: 0 } : direction === "chat-up" ? { opacity: 1, y: "-24%", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } } : { opacity: 0, y: 0, transition: { duration: 0.09, ease: "easeOut" } },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense
                fallback={<PageSkeleton path={location.pathname} />}
              >
                <div className="route-content"><Routes location={location}>
                  {screens.map(([path, id, height, Component]) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <div
                          className="screen-canvas"
                          data-screen={id}
                          style={{ height }}
                        >
                          <Component />
                          {canSearch && (
                            <input
                              className="design-search"
                              style={{
                                top:
                                  path === "/chats"
                                    ? 354
                                    : path === "/chats/all"
                                      ? 163
                                      : 153,
                              }}
                              aria-label="Search"
                              placeholder="Search"
                              type="search"
                              enterKeyHint="search"
                              onKeyDown={e=>{if(e.key==="Enter"&&path==="/store/product")navigate("/store",{state:{search:query}})}}
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                            />
                          )}
                          <Enhancements screen={id} />
                          <ResultsState screen={id} />
                          {canSearch && path !== "/chats" && (
                            <button
                              className="search-filter-button"
                              style={{ top: path === "/chats/all" ? 173 : 163 }}
                              aria-label="Search filters"
                              onClick={() =>
                                path==="/store/product"?navigate("/store",{state:{search:query,openFilters:true}}):setModal(
                                  path.startsWith("/store")
                                    ? "store-filters"
                                    : "chat-filters",
                                )
                              }
                            >
                              <img src="/assets/search-filter.svg" alt="" />
                            </button>
                          )}
                        </div>
                      }
                    />
                  ))}
                  <Route
                    path="/helpers/filters"
                    element={
                      <div className="screen-canvas" style={{ height: 1403 }}>
                        <Helpers />
                      </div>
                    }
                  />
                  <Route path="/booking" element={<FlowPages />} />
                  <Route path="/schedule" element={<FlowPages />} />
                  {authPaths.map(path=><Route key={path} path={path} element={<AuthPages/>}/>)}
                  {["/complete-profile","/roles","/flow/*","/helper/*","/company/*","/checkout","/orders","/orders/:id"].map(path=><Route key={path} path={path} element={<FlowPages/>}/>)}
                  <Route path="/account" element={<Account />} />
                  <Route
                    path="/chats/conversation"
                    element={<Conversation />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/store/nursing"
                    element={<CategoryPage name="Nursing supplies" />}
                  />
                  <Route
                    path="/store/cleaning"
                    element={<CategoryPage name="Cleaning supplies" />}
                  />
                  <Route
                    path="*"
                    element={
                      <div className="new-content">
                        <h1>Let’s get you home.</h1>
                        <Button onClick={() => navigate("/")}>
                          Open MAZBOT
                        </Button>
                      </div>
                    }
                  />
                </Routes></div>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence>{chatListExpanded && <ChatExpandedSheet app={app} onClose={()=>setChatListExpanded(false)}/>}</AnimatePresence>
        {!isFilters && ![...authPaths,"/complete-profile","/roles"].includes(location.pathname) && <Navigation />}
        {isFilters && <FilterSheet />}
        <AnimatePresence>
          {toast && (
            <motion.div
              className="toast"
              role="status"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {modal && modal !== "notifications" && (
            <Dialog
              title={modalTitles[modal] || "MAZBOT"}
              onClose={closeModal}
              wide={modal === "camera"}
            >
              <ModalContent modal={modal} app={app} close={closeModal} />
            </Dialog>
          )}
        </AnimatePresence>
        <Experience />
      </div>
    </ScreenContext.Provider>
  );
}
const modalTitles = {
  "product-preview":"Explore product",
  reviews: "Customer reviews",
  checks: "Background Checks",
  camera: "Living Room preview",
  settings: "Camera settings",
  alerts: "Recent Alerts",
  call: "Call helper",
  issue: "Report issue",
  notifications: "Notifications",
  favorites: "Saved items",
  "store-filters": "Filter products",
  "chat-filters": "Filter chats",
};
function ModalContent({ modal, app, close }) {
  const navigate=useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [issue, setIssue] = useState("");
  const [sound, setSound] = useState(app.workflow.cameraAlerts);
  const [zoom, setZoom] = useState(1);
  const [reset, setReset] = useState(0);
  if(modal === "notifications") return <><p className="demo-note">Updates from your local workspace.</p>{!app.bookings.length&&!app.workflow.orders.length?<p>No booking or order updates yet.</p>:<>{app.bookings.slice(-3).reverse().map(b=><Button secondary key={b.id} onClick={()=>{close();navigate('/flow/bookings/'+b.id)}}>{b.service}: {b.status}</Button>)}{app.workflow.orders.slice(-2).reverse().map(o=><Button secondary key={o.id} onClick={()=>{close();navigate('/orders/'+o.id)}}>Order: {o.status}</Button>)}</>}<Button onClick={close}>Done</Button></>;
  if(modal === "alerts") return <><p className="demo-note">Device status in this local preview.</p>{app.workflow.devices.filter(d=>!d.online).map(d=><Button secondary key={d.id} onClick={()=>{close();navigate('/flow/device/'+d.id)}}>{d.name}: offline</Button>)}{app.workflow.devices.every(d=>d.online)&&<p>No offline devices.</p>}<Button onClick={close}>Done</Button></>;
  if (modal === "product-preview") return <ImageExplorer src={app.product.image} alt={app.product.name}/>;
  if (modal === "store-filters" || modal === "chat-filters")
    return (
      <>
        <label className="toggle-row">
          {modal === "store-filters"
            ? "Saved products only"
            : "Online helpers only"}
          <input
            type="checkbox"
            checked={modal === "store-filters" ? app.savedOnly : app.onlineOnly}
            onChange={(e) =>
              modal === "store-filters"
                ? app.setSavedOnly(e.target.checked)
                : app.setOnlineOnly(e.target.checked)
            }
          />
        </label>
        <Button onClick={close}>Apply filters</Button>
        <Button
          secondary
          onClick={() => {
            app.setSavedOnly(false);
            app.setOnlineOnly(false);
            close();
          }}
        >
          Reset
        </Button>
      </>
    );
  if (modal === "camera")
    return (
      <>
        <div className="room-viewer">
          <motion.img
            key={reset}
            drag
            dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
            dragElastic={0.08}
            animate={{ scale: zoom }}
            src="/assets/living-room.png"
            alt="Living room from the original MAZBOT design"
          />
        </div>
        <div className="viewer-controls">
          <Button
            secondary
            aria-label="Zoom out"
            onClick={() => setZoom((v) => Math.max(1, v - 0.2))}
          >
            −
          </Button>
          <Button
            secondary
            onClick={() => {
              setZoom(1);
              setReset((v) => v + 1);
            }}
          >
            Reset view
          </Button>
          <Button
            secondary
            aria-label="Zoom in"
            onClick={() => setZoom((v) => Math.min(2, v + 0.2))}
          >
            +
          </Button>
        </div>
        <p className="demo-note">
          Static design image. Drag and zoom to inspect. A compatible panorama
          is required for a genuine 360° view; no live camera is connected.
        </p>
        <a
          href="https://seed-swipe-81014304.figma.site"
          target="_blank"
          rel="noreferrer"
        >
          Open original linked prototype ↗
        </a>
      </>
    );
  if (modal === "settings")
    return (
      <>
        <p>Camera preferences for this local demo.</p>
        <label className="toggle-row">
          Camera alerts
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => setSound(e.target.checked)}
          />
        </label>
        <Button
          onClick={() => {
            app.setWorkflow(old=>({...old,cameraAlerts:sound}));
            app.setToast("Camera preferences saved for this session");
            close();
          }}
        >
          Save settings
        </Button>
      </>
    );
  if (modal === "issue")
    return submitted ? (
      <>
        <h3>Report saved</h3>
        <p>
          This demo report stays on this device. No support request was sent.
        </p>
        <Button onClick={close}>Done</Button>
      </>
    ) : (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (issue.trim()) setSubmitted(true);
        }}
      >
        <label className="field">
          <span>What happened?</span>
          <textarea
            required
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe the issue"
          />
        </label>
        <Button type="submit" disabled={!issue.trim()}>
          Save demo report
        </Button>
      </form>
    );
  if (modal === "reviews")
    return (
      <>
        <p>★ 4.7 · 18 reviews in the source design</p>
        <p className="empty">
          Individual review text was not included in the design.
        </p>
      </>
    );
  if (modal === "checks")
    return (
      <>
        <p>Verified documents and profile</p>
        <p className="demo-note">
          This label comes from the prototype. No real identity verification is
          available in this demo.
        </p>
      </>
    );
  if (modal === "call")
    return (
      <>
        <p>Call {app.person}</p>
        <p className="demo-note">
          No phone number is provided in the source design.
        </p>
        <Button onClick={close}>Done</Button>
      </>
    );
  if (modal === "favorites")
    return app.saved.length ? (
      <ul className="favorite-list">
        {app.saved.map((key) => (
          <li key={key}>
            {catalog.products[key]?.name ||
              catalog.helpers[key]?.name ||
              helperDirectory.find(h=>h.id===key)?.name ||
              app.workflow.team.find(h=>h.id===key)?.name ||
              (key.startsWith('helper:') ? key.slice(7) : null) ||
              "Saved helper"}
            <button
              onClick={() => app.setSaved(app.saved.filter((k) => k !== key))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="empty">
        Tap a heart on a helper or product to save it here.
      </p>
    );
  return (
    <>
      <p>
        {modal === "alerts"
          ? "All cameras are working properly."
          : "Your home is up to date."}
      </p>
      <p className="demo-note">
        Demo status from the original design. No live services are connected.
      </p>
      <Button onClick={close}>Done</Button>
    </>
  );
}
import { useApp } from "./context/ScreenContext.jsx";
function Enhancements({ screen }) {
  const app = useApp(),
    navigate = useNavigate();
  const benefits=app.product.name==='Monitoring Camera'?['Easy monitoring','Home security','Remote viewing','Simple setup']:app.product.name==='Ramp'?['Easy access','Portable support','Home mobility','Simple setup']:app.product.name==='Cleaning spray bottle'?['Refillable','Easy handling','Reusable bottle','Home cleaning']:['Home readings','Easy operation','Compact size','Everyday care'];
  const addonLabels=app.product.name==='Monitoring Camera'?['Installation support','Setup assistance']:['Product guidance','Care instructions'];
  if (screen === "2051:3241")
    return (
      <>
        <div className="benefit-grid">
          {benefits.map(text=><span key={text}>{text}</span>)}
        </div>
        <div className="addon-options">
          <label>
            <input
              type="checkbox"
              checked={app.addons.includes(addonLabels[0])}
              onChange={(e) =>
                app.setAddons(
                  e.target.checked
                    ? [...app.addons, addonLabels[0]]
                    : app.addons.filter((x) => x !== addonLabels[0]),
                )
              }
            />{" "}
            {addonLabels[0]}
          </label>
          <label>
            <input
              type="checkbox"
              checked={app.addons.includes(addonLabels[1])}
              onChange={(e) =>
                app.setAddons(
                  e.target.checked
                    ? [...app.addons, addonLabels[1]]
                    : app.addons.filter((x) => x !== addonLabels[1]),
                )
              }
            />{" "}
            {addonLabels[1]}
          </label>
        </div>
        <span className="quantity-live" aria-live="polite">
          <AnimatedNumber value={app.quantity}/>
        </span>
        <button
          className="cart-hotspot"
          aria-label={
            "Shopping cart, " +
            app.cart.reduce((s, p) => s + p.quantity, 0) +
            " items"
          }
          onClick={() => navigate("/cart")}
        />
      </>
    );
  if (["2051:2752", "2051:2892", "2051:3069"].includes(screen))
    return (
      <>
        <button
          className="cart-hotspot"
          aria-label={
            "Shopping cart, " +
            app.cart.reduce((s, p) => s + p.quantity, 0) +
            " items"
          }
          onClick={() => navigate("/cart")}
        />
        {app.cart.length > 0 && (
          <span className="cart-count">
            {app.cart.reduce((s, p) => s + p.quantity, 0)}
          </span>
        )}
      </>
    );
  if (screen === "2051:2475")
    return (
      <motion.button
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.y) > 20) setChatListExpanded(true);
        }}
        className="chat-list-handle"
        aria-label="Show all chats"
        onClick={() => app.setChatListExpanded(true)}
      />
    );
  if (screen === "2051:2607")
    return (
      <motion.button
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.y) > 20) navigate("/chats");
        }}
        className="chat-list-handle all"
        aria-label="Show favorite chats"
        onClick={() => navigate("/chats")}
      />
    );
  if (screen === "2051:1435") return null;
  if (screen === "2051:2106") return null;
  if (screen === "2051:2015") return <div style={{position:'absolute',top:845,left:16,right:16}}><Button onClick={()=>navigate('/monitoring/tracking')}>Track your booking</Button><Button secondary onClick={()=>navigate('/flow/devices')}>Connected devices</Button></div>;
  if (screen === "2051:2188")
    return (
      <span className="simulation-note">
        Interactive demo · No live connection
      </span>
    );
  return null;
}
function HelperFilters() {
  const app = useApp();
  const result = Object.values(catalog.helpers).filter(
    (h) => h.price <= app.filters.budget && h.rating >= app.filters.rating,
  );
  return result.length === 0 ? (
    <div className="helper-empty">
      <h3>No helpers match these filters</h3>
      <Button
        onClick={() =>
          app.setFilters({
            service: "Cleaning",
            budget: 600,
            rating: 0,
            date: "",
          })
        }
      >
        Reset filters
      </Button>
    </div>
  ) : null;
}

function ResultsState({ screen }) {
  const app = useApp();
  const products = Object.entries(catalog.products).filter(
    ([, p]) => p.screen === screen,
  );
  const chats = Object.entries(config.rows).filter(
    ([, r]) => r.screen === screen,
  );
  let empty = false,
    top = 0;
  if (products.length && (app.query || app.savedOnly)) {
    empty = !products.some(
      ([key, p]) =>
        (!app.savedOnly || app.saved.includes(key)) &&
        p.name.toLowerCase().includes(app.query.toLowerCase()),
    );
    top = screen === "2051:2752" ? 604 : 333;
  } else if (chats.length && (app.query || app.onlineOnly)) {
    empty = !chats.some(
      ([, r]) =>
        (!app.onlineOnly || !r.text.includes("Offline")) &&
        r.text.toLowerCase().includes(app.query.toLowerCase()),
    );
    top = screen === "2051:2475" ? 413 : 224;
  }
  return empty ? (
    <div className="product-empty" style={{ top }} role="status">
      <h3>No matches found</h3>
      <p>Try another search or reset your filters.</p>
      <Button
        secondary
        onClick={() => {
          app.setQuery("");
          app.setSavedOnly(false);
          app.setOnlineOnly(false);
        }}
      >
        Reset search
      </Button>
    </div>
  ) : null;
}
