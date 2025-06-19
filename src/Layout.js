import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './HeaderLayout.css'; // style riêng cho header nếu cần
// import { List } from 'devextreme-react';

const menuItems = [
  { text: 'Customer', path: '/customer' },
  { text: 'Product', path: '/product' },
  { text: 'Order', path: '/order' },
  { text: 'Order Detail', path: '/order-detail' },
  { text: 'Risk Accordion', path: '/risk-accordion' },
];

const handleClick = () => {
  window.location.href = '/';
}
export default function HeaderLayout() {
  return (
    <div>

      <header style={{ background: '#78BCA4', padding: '20px', color: 'white', display: 'flex' }}>
        <div className="logo">🌿</div>
        <div className="title" onClick={handleClick}>My Website</div>
        <div className="navigation">
          <nav style={{ display: 'flex', gap: '100px' }}>
            {menuItems.map(item => (
              <NavLink
                key={item.text}
                to={item.path}
                className={({ isActive }) => isActive ? 'active-link' : ''}
                style={{ color: 'white' }}>{item.text}</NavLink>
            ))}
            {/* <NavLink to="/customer" className={({ isActive }) => isActive ? 'active-link' : ''} style={{ color: 'white' }}>Customer</NavLink>
           <NavLink to="/product" className={({ isActive }) => isActive ? 'active-link' : ''} style={{ color: 'white' }}>Product</NavLink>
           <NavLink to="/order" className={({ isActive }) => isActive ? 'active-link' : ''} style={{ color: 'white' }}>Order</NavLink>
           <NavLink to="/order-detail" className={({ isActive }) => isActive ? 'active-link' : ''} style={{ color: 'white' }}>Order Detail</NavLink> */}
          </nav>
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}
