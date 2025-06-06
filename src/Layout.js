// // src/Layout.js
// import React, { useState } from 'react';
// import Drawer from 'devextreme-react/drawer';
// import List from 'devextreme-react/list';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';



// export default function Layout() {
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const selectedIndex = menuItems.findIndex(item => location.pathname.startsWith(item.path));

//   return (
//     <Drawer
//       opened={open}
//       openedStateMode="shrink"
//       position="before"
//       component={() => (
//         <List
//           items={menuItems}
//           selectedItemKeys={[menuItems[selectedIndex]?.text]}
//           onItemClick={(e) => {
//             navigate(e.itemData.path);
//             setOpen(true);
//           }}
//           itemRender={(item) => (
//             <div style={{ padding: '10px', cursor: 'pointer' }}>
//               {item.text}
//             </div>
//           )}
//         />
//       )
//       }
//     >
//       <div style={{ padding: '20px' }}>
//         <Outlet />
//       </div>
//     </Drawer>
//   );
// }


// src/HeaderLayout.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './HeaderLayout.css'; // style riêng cho header nếu cần
// import { List } from 'devextreme-react';

const menuItems = [
  { text: 'Customer', path: '/customer' },
  { text: 'Product', path: '/product' },
  { text: 'Order', path: '/order' },
  { text: 'Order Detail', path: '/order-detail' },
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
