
// import React, { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
export default function TableProducts() {
  // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch('https://localhost:7288/api/Products');
  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("Lấy dữ liệu thành công");
  //       setProducts(data);
  //     } else {
  //       console.error("Lỗi lấy dữ liệu:", response.text());
  //     }
  //   } catch (error) {
  //     console.error('Lỗi fetch:', error);
  //   }
  // };
  // const handleRowInsertedProducts = async (e) => {
  //   try {
  //     const product = {
  //       "productName": e.data.productName,
  //       "price": e.data.price
  //     };
  //     // Đặt ID sản phẩm là 0 để server tự sinh ID mới
  //     await fetch('https://localhost:7288/api/Products', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(product),
  //     }).then(async response => {
  //       if (response.ok) {
  //         fetchProducts();
  //         window.alert('Thêm sản phẩm thành công');
  //       } else {
  //         console.error('Lỗi thêm sản phẩm:', await response.text());
  //         window.alert('Lỗi thêm sản phẩm không thành công: ' + await response.text());
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Lỗi thêm sản phẩm:', error);
  //   }
  // };
  // const handleRowUpdatedProducts = async (e) => {
  //   try {
  //     await fetch(`https://localhost:7288/api/Products/${e.key}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(e.data),
  //     }).then(async response => {
  //       if (response.ok) {
  //         fetchProducts();
  //         window.alert('Cập nhật sản phẩm thành công');
  //       } else {
  //         console.error('Lỗi cập nhật sản phẩm:', await response.text());
  //         window.alert('Lỗi cập nhật sản phẩm không thành công: ' + await response.text());
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Lỗi cập nhật sản phẩm:', error);
  //   }
  // };
  // const handleRowRemovedProducts = async (e) => {
  //   try {
  //     await fetch(`https://localhost:7288/api/Products/${e.key}`, {
  //       method: 'DELETE',
  //     }).then(async response => {
  //       if (response.ok) {
  //         fetchProducts();
  //         window.alert('Xoá sản phẩm thành công');
  //       } else {
  //         console.error('Lỗi xoá sản phẩm:', await response.text());
  //         window.alert('Lỗi xoá sản phẩm không thành công: ' + await response.text());
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Lỗi xoá sản phẩm:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  let productsLists = [];
  const products = new CustomStore({
    key: 'productId',
    load: async () => {
      const response = await fetch('https://localhost:7288/api/Products');
      if (!response.ok) {
        throw new Error('Load data error');
      }
      productsLists = await response.json();
      return productsLists;
    },
    insert: async (values) => {
      const response = await fetch('https://localhost:7288/api/Products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Insert error');
      }
      alert('Thêm sản phẩm thành công');
      return response.json();
    },
    update: async (key, values) => {
      const original = productsLists.find(p => p.productId === key);
      const updateProduct = {
        ...original,
        ...values,
      };
      const response = await fetch(`https://localhost:7288/api/Products/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateProduct),
      });
      if (!response.ok) {
        throw new Error('Update error');
      }
      alert('Cập nhật sản phẩm thành công');
      return response.json();
    },
    remove: async (key) => {
      const response = await fetch(`https://localhost:7288/api/Products/${key}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Delete error');
      }
      alert('Xoá sản phẩm thành công');
      return key;
    },
  });
  return (
    <>
      <h3>List Products</h3>
      <DataGrid
        dataSource={products}
        keyExpr="productId"
        showBorders={true}
        paging={{ pageSize: 5 }}
        // onRowInserted={handleRowInsertedProducts}
        // onRowUpdated={handleRowUpdatedProducts}
        // onRowRemoved={handleRowRemovedProducts}
      >
        <Paging enabled={true} />
        <Editing mode="row" allowUpdating allowDeleting allowAdding />
        <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
        <Column dataField="productId" caption="ID" allowEditing={false} width={100} />
        <Column dataField="productName" dataType='string' />
        <Column dataField="price" format="currency" dataType='number' />


      </DataGrid>
    </>

  )
};

