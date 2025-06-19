
// import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';
// import TableCustomers from './components/TableCustomers';
// import TableProducts from './components/TableProducts';
// import TableOrders from './components/TableOrders';
// import TablesOrderItems from './components/TablesOrderItems';
// // import { Data } from 'devextreme-react/cjs/common';

// const App = () => {
//   return (
//     <>
//       <TableCustomers />
//       <TableProducts />
//       <TableOrders />
//       <TablesOrderItems />
//     </>
//   );
// };

// export default App;
// src/App.js
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './Layout';
// import Customer from './components/TableCustomers';
// import Product from './components/TableProducts';
// import Order from './components/TableOrders';
// import OrderDetail from './components/TablesOrderItems';
// import RiskAccordion from './components/RiskAccordion';
import Hello from './components/Hello';

export default function App() {

  return (
    <>
    <Hello></Hello>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="customer" element={<Customer />} />
            <Route path="product" element={<Product />} />
            <Route path="order" element={<Order />} />
            <Route path="order-detail" element={<OrderDetail />} />
            <Route path='risk-accordion' element={<RiskAccordion />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
    </>

  );
}

