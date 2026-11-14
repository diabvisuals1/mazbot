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
import PhoneStatusBar from "./components/PhoneStatusBar.jsx";
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
const AccountProfile = lazy(() => import('./pages/AccountProfile.jsx'));
const AuthPages = lazy(() => import("./pages/AuthPages.jsx"));
const authPaths = ["/start","/onboarding","/onboarding/2","/onboarding/3","/auth","/signup","/forgot-password","/verify"];
const FlowPages = lazy(() => import("./pages/FlowPages.jsx"));
import { initialWorkflow, helperDirectory, roleHomes, matchesHelper, uid } from "./data/workflow.js";
import { getCameraPreview } from './data/camera-route.js';
const Home = lazy(() => import("./pages/Screen2051_1878.jsx"));
const Services = lazy(() => import("./pages/Screen2051_2267.jsx"));
const Helpers = lazy(() => import("./pages/HelpersList.jsx"));
const Profile = lazy(() => import("./pages/HelperProfile.jsx"));
const Chats = lazy(() => import("./pages/Screen2051_2475.jsx"));
const AllChats = lazy(() => import("./pages/Screen2051_2607.jsx"));
const StoreCategories = lazy(() => import('./pages/StoreCategories.jsx'));
const Store = lazy(() => import("./pages/StorePage.jsx"));
const Mobility = lazy(() => import("./pages/Screen2051_2892.jsx"));
const Equipment = lazy(() => import("./pages/Screen2051_3069.jsx"));
const Product = lazy(() => import("./pages/ProductPage.jsx"));
const Monitoring = lazy(() => import("./pages/MonitoringPage.jsx"));
const AssistantChat = lazy(() => import("./pages/AssistantChat.jsx"));
const Tracking = lazy(() => import('./pages/TrackingPage.jsx'));
const Cameras = lazy(() => import("./pages/CamerasPage.jsx"));
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
  const deviceRef = useRef(null);
  const visitedScreens = useRef([location.pathname + location.search]);
  useLayoutEffect(() => {
    const path = location.pathname + location.search;
    const stack = visitedScreens.current;
    if (stack.at(-1) !== path) stack.push(path);
  }, [location.pathname, location.search]);
  function goBack(fallback = '/') {
    if (modal) { setModal(null); return; }
    if (chatListExpanded) { setChatListExpanded(false); return; }
    const stack = visitedScreens.current;
    if (stack.length > 1) stack.pop();
    else stack[0] = fallback;
    navigate(stack.at(-1), {replace:true});
  }
  useLayoutEffect(() => {
    const host = scroll.current;
    if (!host) return;
    let frame;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        host.querySelectorAll('.screen-canvas').forEach(canvas => {
          const content = canvas.firstElementChild;
          if (!content) return;
          const children = [...content.children].filter(el => getComputedStyle(el).display !== 'none');
          const positioned = children.filter(el => getComputedStyle(el).position === 'absolute');
          if (positioned.length > 2) {
            const bottom = Math.max(0, ...children.map(el => el.offsetTop + el.offsetHeight));
            if (bottom) canvas.style.setProperty('--content-height', `${bottom}px`);
          } else {
            canvas.style.setProperty('--content-height', 'auto');
          }
        });
      });
    };
    const observer = new MutationObserver(measure);
    observer.observe(host, {childList:true, subtree:true});
    host.addEventListener('load', measure, true);
    measure();
    return () => {observer.disconnect();cancelAnimationFrame(frame);host.removeEventListener('load', measure, true);};
  }, [location.pathname]);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [chatTransition, setChatTransition] = useState(false);
  const [chatMeta, setChatMeta] = usePersistent("chat-meta", {
    unread: { "Souad Ibrahim": 2, "Fatma El-Sayed": 1 },
    favorites: ["Souad Ibrahim", "Amal Mostafa"],
  });
  const [chatListExpanded, setChatListExpanded] = useState(false);
  useLayoutEffect(() => {
    if (!chatListExpanded) return;
    const device = scroll.current?.parentElement;
    if (device) device.scrollTop = 0;
  }, [chatListExpanded]);
  useLayoutEffect(() => {
    const device = deviceRef.current;
    if (!device) return;
    const updateScale = () => {
      const scale = Math.min(1, (window.innerWidth - 16) / 435, (window.innerHeight - 16) / 872);
      device.parentElement.style.setProperty("--phone-scale", String(Math.max(.1, scale)));
      device.style.setProperty("--design-scale", "1");
      device.style.setProperty("--auth-scale", "1");
      device.style.setProperty("--auth-y-adjust", "1");
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(device);
    window.visualViewport?.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", updateScale);
    window.addEventListener("resize", updateScale);
    return () => {
      observer.disconnect();
      window.visualViewport?.removeEventListener("resize", updateScale);
      window.removeEventListener("orientationchange", updateScale);
      window.removeEventListener("resize", updateScale);
    };
  }, []);
  const [toast, setToast] = useState("");
  const [saved, setSaved] = usePersistent("favorites", []);
  const [workflow, setWorkflow] = usePersistent("workflow", initialWorkflow);
  const cameraPreview = getCameraPreview(location, workflow.devices);
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
      (location.pathname.startsWith("/chats")
        ? "Chats"
        : location.pathname === '/flow/assistant' ? 'Mazbot AI'
        : location.pathname === '/monitoring' ? 'Monitoring'
        : location.pathname === '/monitoring/tracking' ? 'Service tracking'
        : location.pathname === '/monitoring/cameras' || location.pathname === '/flow/devices' || location.pathname.startsWith('/flow/device/') ? 'Your cameras'
        : screens
            .find((s) => s[0] === location.pathname)?.[0]
            .split("/")
            .filter(Boolean)
            .at(-1) || "Your home, organized");
  }, [location.pathname]);
  useEffect(() => {
    if (!location.state?.chatTransition) {
      setChatTransition(false);
      return;
    }
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
  function act(c, id) {
    switch (c.action) {
      case "navigate":
        navigate(c.path);
        break;
      case "back":
        goBack();
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
        setFilters({service:c.category,budget:10000,rating:0,date:""});
        navigate(location.pathname === "/services" ? "/helpers" : "/flow/requirements");
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
        const name = h?.name || c.person || "Amal Mostafa";
        const fallback = {
          id: `figma-${name.toLowerCase().replaceAll(" ", "-")}`,
          name,
          services: [service],
          price: 475,
          rating: 4.8,
          image: ({
            "Souad Ibrahim": "/assets/e91be.png",
            "Fatma El-Sayed": "/assets/8526c.png",
            "Amal Mostafa": "/assets/b2a63.png",
            "Hoda Mahmoud": "/assets/e91be.png",
            "Eman Ragab": "/assets/8526c.png",
            "Shaimaa Ali": "/assets/867ad.png",
          })[name] || "/assets/b2a63.png",
          experience: 5,
          jobs: 42,
          location: "Cairo",
          days: [0, 1, 2, 3, 4],
        };
        const selected = helperDirectory.find(x=>x.name===name) || { ...fallback, ...h };
        setPerson(name);
        setHelperImage(selected.image || "/assets/b2a63.png");
        setHelperPrice(selected.price || 475);
        setWorkflow(old=>({...old,selectedBooking:null,selectedHelper:selected}));
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
        if (c.person) {
          const personName = helperDirectory.find((helper) => helper.name.toLowerCase() === c.person.toLowerCase())?.name || c.person;
          const helper = helperDirectory.find((entry) => entry.name.toLowerCase() === personName.toLowerCase());
          const relatedBooking = c.bookingId != null
            ? bookings.find(booking => String(booking.id) === String(c.bookingId) && booking.helper?.toLowerCase() === personName.toLowerCase())
            : [...bookings].reverse().find((booking) => booking.helper?.toLowerCase() === personName.toLowerCase());
          setPerson(personName);
          if (helper?.image) setHelperImage(helper.image);
          setWorkflow((current) => ({ ...current, selectedBooking: relatedBooking?.id || null }));
          setChatMeta((current) => ({ ...current, unread: { ...(current.unread || {}), [personName]: 0 } }));
        }
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
    goBack,
    cameraPreview,
    workflow,
    setWorkflow,
    act,
    query,
    setQuery,
    modal,
    setModal,
    chatMeta,
    setChatMeta,
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
  const isHelperJourney = ["/services", "/helpers", "/helpers/filters", "/helpers/profile"].includes(location.pathname);
  const isMonitoringJourney = location.pathname.startsWith('/monitoring') || location.pathname === '/flow/assistant' || location.pathname === '/flow/devices' || location.pathname.startsWith('/flow/device/');
  const routeLocation = isFilters ? { ...location, pathname: "/helpers" } : location;
  const routeViewKey = location.pathname === "/helpers/filters"
    ? "/helpers"
    : location.pathname.startsWith("/onboarding")
      ? "onboarding"
      : location.pathname;
  const canSearch =
    (location.pathname.startsWith("/store") && location.pathname !== "/store" && location.pathname !== "/store/product") ||
    location.pathname === "/chats" ||
    location.pathname === "/chats/all";
  return (
    <ScreenContext.Provider value={app}>
      <div className="phone-frame">
      <div ref={deviceRef} className={"device "+(!authPaths.includes(location.pathname)?"with-topbar":"")+(cameraPreview?' is-room-preview':'')} >
        {!authPaths.includes(location.pathname)&&<TopBar/>}
        <div className="app-scroll" ref={scroll} inert={isFilters || !!modal || chatListExpanded}>
          <AnimatePresence key={isMonitoringJourney ? routeViewKey : 'app-routes'} mode={chatTransition ? "sync" : "wait"} custom={chatTransition ? "chat-up" : null}>
            <motion.div
              key={routeViewKey}
              className="route-view"
              custom={location.state?.chatTransition ? "chat-enter" : null}
              variants={{
                initial: direction => reduced ? { opacity: 1, y: 0 } : direction === "chat-enter" ? { opacity: 1, y: "100%" } : { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : isHelperJourney ? 0.27 : 0.34, ease: [0.22, 1, 0.36, 1] } },
                exit: direction => reduced ? { opacity: 1, y: 0 } : direction === "chat-up" ? { opacity: 1, y: "-24%", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } } : { opacity: 0, y: 0, transition: { duration: isHelperJourney ? 0.15 : 0.09, ease: [0.4, 0, 1, 1] } },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense
                fallback={<PageSkeleton path={location.pathname} />}
              >
                <div className="route-content"><Routes location={routeLocation}>
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
                          {path!=="/store"&&path!=="/store/product"&&<Enhancements screen={id} />}
                          {path!=="/store"&&path!=="/store/product"&&<ResultsState screen={id} />}
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
                  <Route path="/onboarding/*" element={<AuthPages/>}/>{authPaths.filter(path=>!path.startsWith('/onboarding')).map(path=><Route key={path} path={path} element={<AuthPages/>}/>)}
                  {["/complete-profile","/roles","/flow/*","/helper/*","/company/*","/checkout","/orders","/orders/:id"].map(path=><Route key={path} path={path} element={<FlowPages/>}/>)}
                  <Route path="/account" element={<AccountProfile />} />
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/monitoring/tracking" element={<Tracking />} />
                  <Route path="/monitoring/cameras" element={<Cameras />} />
                  <Route path="/flow/devices" element={<Cameras />} />
                  <Route path="/flow/device/:id" element={<Cameras />} />
                  <Route path="/flow/assistant" element={<AssistantChat />} />
                  <Route
                    path="/chats/conversation"
                    element={<Conversation />}
                  />
                  <Route path="/store/categories" element={<StoreCategories/>}/><Route path="/cart" element={<Cart />} />
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
        {location.pathname === "/chats" && <ChatExpandedSheet app={app} expanded={chatListExpanded} onExpandedChange={setChatListExpanded} />}
        {!cameraPreview && !isFilters && ![...authPaths,"/complete-profile","/roles"].includes(location.pathname) && <Navigation />}
        <AnimatePresence>{isFilters && <FilterSheet key="helper-filters" />}</AnimatePresence>
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
          {modal && modal !== "notifications" && modal !== "cart-sheet" && (
            <Dialog
              title={modalTitles[modal] || "MAZBOT"}
              onClose={closeModal}
              wide={modal === "camera"}
            >
              <ModalContent modal={modal} app={app} close={closeModal} />
            </Dialog>
          )}
        </AnimatePresence>
        <PhoneStatusBar />
        <Experience />
      </div>
      <svg className="phone-hardware" viewBox="0 0 435 872" aria-hidden="true">
        <path fill="black" fillRule="evenodd" d="M70 10H365A60 60 0 0 1 425 70V802A60 60 0 0 1 365 862H70A60 60 0 0 1 10 802V70A60 60 0 0 1 70 10ZM70 30A40 40 0 0 0 30 70V802A40 40 0 0 0 70 842H365A40 40 0 0 0 405 802V70A40 40 0 0 0 365 30Z"/>
        <path fill="black" d="M151 30H284Q276 30 276 38V47Q276 56 267 56H168Q159 56 159 47V38Q159 30 151 30Z"/>
        <rect x="2" y="205" width="10" height="27" rx="5"/>
        <rect x="2" y="241" width="10" height="64" rx="5"/>
        <rect x="2" y="316" width="10" height="64" rx="5"/>
        <rect x="423" y="203" width="10" height="112" rx="5"/>
        <rect x="159" y="831" width="117" height="5" rx="2.5"/>
      </svg>
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
          if (issue.trim() && !submitted) {
            app.setWorkflow(current => ({...current, reports:[...(current.reports || []), {
              id: uid(), text: issue.trim(), status: 'Open',
              bookingId: current.selectedBooking, helper: app.person, createdAt: new Date().toISOString(),
            }]}));
            setSubmitted(true);
          }
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
  if (screen === "2051:2475") return null;
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
  const navigate = useNavigate();
  if (screen === "2051:1435") return null;
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
