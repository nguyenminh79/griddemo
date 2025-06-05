
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';
import TableCustomers from './components/TableCustomers';
import TableProducts from './components/TableProducts';
import TableOrders from './components/TableOrders';
import TablesOrderItems from './components/TablesOrderItems';
// import { Data } from 'devextreme-react/cjs/common';

const App = () => {
  return (
    <>
      <TableCustomers />
      <TableProducts />
      <TableOrders />
      <TablesOrderItems />
    </>
  );
};

export default App;
