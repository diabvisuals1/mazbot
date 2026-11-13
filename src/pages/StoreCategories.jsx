import React from 'react';
import {Link} from 'react-router-dom';
const categories=[
 ['Mobility','912df.png','Comfort and support for everyday movement.'],
 ['Monitoring','9d2af.png','Keep a closer eye on your home.'],
 ['Nursing','35a6b.png','Care essentials for your loved ones.'],
 ['Cleaning','4d9d1.png','A little help keeping things fresh.'],
];
export default function StoreCategories(){return <main className="store-category-page"><header><span>THE MAZBOT STORE</span><h1>Find what your<br/>home needs.</h1><p>Explore our categories.</p></header><div className="store-category-grid">{categories.map(([name,image,description])=><Link key={name} to={'/store?category='+encodeURIComponent(name)} className={'store-category-card category-'+name.toLowerCase()}><span className="store-category-art"><img src={'/assets/'+image} alt=""/></span><h2>{name}</h2><p>{description}</p><span className="store-category-link">Explore <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></span></Link>)}</div><Link className="store-browse-all" to="/store">Browse all products</Link></main>}
