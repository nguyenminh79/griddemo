import { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
// import TableOrders from './TableOrders';
// import TableProducts from './TableProducts';
export default function TablesOrderItems() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    let orderItems = [];
    const fetchProducts = async () => {
        try {
            const responseProducts = await fetch('https://localhost:7288/api/Products');
            const dataProducts = await responseProducts.json();
            if (responseProducts.ok) {
                console.log("Lấy dữ liệu thành công");
                setProducts(dataProducts);
            } else {
                console.error("Lỗi lấy dữ liệu:", responseProducts.text());
            }
        } catch (error) {
            console.error('Lỗi fetch:', error);
        }
    };
    const fetchOrders = async () => {
        try {
            const responseOrders = await fetch('https://localhost:7288/api/Orders');
            const dataOrders = await responseOrders.json();
            if (responseOrders.ok) {
                console.log("Lấy dữ liệu thành công");
                setOrders(dataOrders);
            } else {
                console.error("Lỗi lấy dữ liệu:", responseOrders.text());
            }
        } catch (error) {
            console.error('Lỗi fetch:', error);
        }
    };
    useEffect(() => {

        fetchProducts();
        fetchOrders();
    }, []);
    // const [orderItems, setOrderItems] = useState([]);
    // const fetchOrderTtems = async () => {
    //     try {
    //         const response = await fetch('https://localhost:7288/api/OrderItems');
    //         const data = await response.json();
    //         if (response.ok) {
    //             console.log("Lấy dữ liệu thành công");
    //             setOrderItems(data);
    //         } else {
    //             console.error("Lỗi lấy dữ liệu:", response.text());
    //         }
    //     } catch (error) {
    //         console.error('Lỗi fetch:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchOrderTtems();
    // }, []);
    // const handleRowInserting = async (e) => {
    //     const orderId = e.data.orderId;
    //     const productId = e.data.productId;
    //     if (!orderId || !productId) {
    //         window.alert('Vui lòng nhập đầy đủ thông tin đơn hàng và sản phẩm');
    //         e.cancel = true; // Dừng thêm đơn hàng nếu thông tin không đầy đủ
    //         return;
    //     } if (e.data.quantity <= 0 || e.data.unitPrice <= 0) {
    //         window.alert('Số lượng và giá đơn vị phải lớn hơn 0');
    //         e.cancel = true; // Dừng thêm đơn hàng nếu số lượng hoặc giá không hợp lệ
    //         return;
    //     }
    //     try {
    //         const fetchOrder = await fetch(`https://localhost:7288/api/Orders/${orderId}`);
    //         const fetchProduct = await fetch(`https://localhost:7288/api/Products/${productId}`);
    //         let mess = '';
    //         if (!fetchOrder.ok) {
    //             mess += 'Đơn hàng không tồn tại, không thể thêm chi tiết đơn hàng\n';
    //         }
    //         if (!fetchProduct.ok) {
    //             mess += 'Sản phẩm không tồn tại, không thể thêm chi tiết đơn hàng\n';
    //         }
    //         if (mess !== '') {
    //             window.alert(mess);
    //             e.cancel = true; // Dừng thêm đơn hàng nếu có lỗi
    //         } // Dừng thêm đơn hàng nếu có lỗi
    //     } catch (error) {
    //         console.error('Lỗi kiểm tra đơn hàng hoặc sản phẩm:', error);
    //         window.alert('Lỗi kiểm tra đơn hàng hoặc sản phẩm: ' + error.message);
    //         e.cancel = true; // Dừng thêm đơn hàng nếu có lỗi
    //     };
    // };
    // const handleRowInserted = async (e) => {
    //     try {
    //         const orderItem = {
    //             "orderId": e.data.orderId,
    //             "productId": e.data.productId,
    //             "quantity": e.data.quantity,
    //             "unitPrice": e.data.unitPrice
    //         };
    //         // Đặt ID đơn hàng là 0 để server tự sinh ID mới
    //         await fetch('https://localhost:7288/api/OrderItems', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(orderItem),
    //         }).then(async response => {
    //             if (response.ok) {
    //                 fetchOrderTtems();
    //                 window.alert('Thêm đơn hàng thành công');
    //             } else {
    //                 console.error('Lỗi thêm đơn hàng:', await response.text());
    //                 window.alert('Lỗi thêm đơn hàng không thành công: ' + await response.text());
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Lỗi thêm đơn hàng:', error);
    //     }
    // };
    // const handelRowUpdated = async (e) => {
    //     try {
    //         await fetch(`https://localhost:7288/api/OrderItems/${e.key}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(e.data),
    //         }).then(async response => {
    //             if (response.ok) {
    //                 fetchOrderTtems();
    //                 window.alert('Cập nhật đơn hàng thành công');
    //             } else {
    //                 console.error('Lỗi cập nhật đơn hàng:', await response.text());
    //                 window.alert('Lỗi cập nhật đơn hàng không thành công: ' + await response.text());
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Lỗi cập nhật đơn hàng:', error);

    //     }
    // };
    // const handelRowDeleted = async (e) => {
    //     try {
    //         await fetch(`https://localhost:7288/api/OrderItems/${e.key}`, {
    //             method: 'DELETE',
    //         }).then(async response => {
    //             if (response.ok) {
    //                 fetchOrderTtems();
    //                 window.alert('Xoá đơn hàng thành công');
    //             } else {
    //                 console.error('Lỗi xoá đơn hàng:', await response.text());
    //                 window.alert('Lỗi xoá đơn hàng không thành công: ' + await response.text());
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Lỗi xoá đơn hàng:', error);
    //     }
    // };
    const validation = async (values) => {
        let mess = '';
        await fetch(`https://localhost:7288/api/Orders/${values.orderId}`, {
            method: 'GET',
        }).then(async response => {
            if (!response.ok) {
                mess += 'Đơn hàng không tồn tại, không thể thêm chi tiết đơn hàng.\t\n';
            }
        });
        await fetch(`https://localhost:7288/api/Products/${values.productId}`, {
            method: 'GET',
        }).then(async response => {
            if (!response.ok) {
                mess += 'Sản phẩm không tồn tại, không thể thêm chi tiết đơn hàng.\t\n';
            }
        });
        if (values.quantity <= 0 || values.unitPrice <= 0) {
            mess += 'Số lượng và giá đơn vị phải lớn hơn 0.\t\n';
        };
        return mess;
    };
    const orderItemsStore = new CustomStore({
        key: 'orderItemId',
        load: async (values) => {
            const response = await fetch('https://localhost:7288/api/OrderItems');
            if (!response.ok) {
                throw new Error('Lỗi tải dữ liệu đơn hàng: ' + await response.text());
            }
            orderItems = await response.json();
            return orderItems;
        },
        insert: async (values) => {
            const orderItem = {
                "orderId": values.orderId,
                "productId": values.productId,
                "quantity": values.quantity,
                "unitPrice": values.unitPrice
            };

            if (await validation(orderItem) !== '') {
                throw new Error(await validation(orderItem) + "Vui lòng kiểm tra lại thông tin.");
            }
            const response = await fetch('https://localhost:7288/api/OrderItems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderItem),
            });
            if (response.ok) {
                alert("Thêm đơn hàng thành công");
                fetchOrders();
                return response.json();
            } else {
                throw new Error('Lỗi thêm đơn hàng không thành công: ' + await response.text());
            }
        },
        update: async (key, values) => {
            const originalItem = orderItems.find(item => item.orderItemId === key);
            const updatedOrderItem = {
                ...originalItem,
                ...values,
            };

            if (await validation(updatedOrderItem) !== '') {
                throw new Error(await validation(updatedOrderItem) + "Vui lòng kiểm tra lại thông tin.");
            }
            const response = await fetch(`https://localhost:7288/api/OrderItems/${key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOrderItem),
            });
            if (response.ok) {
                alert("Cập nhật đơn hàng thành công");
                fetchOrders();
                return response.json();
            } else {
                throw new Error('Lỗi cập nhật đơn hàng không thành công: ' + await response.text());
            }
        },
        remove: async (key) => {
            const response = await fetch(`https://localhost:7288/api/OrderItems/${key}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Xoá đơn hàng thành công");
                fetchOrders();
                return key;
            } else {
                throw new Error('Lỗi xoá đơn hàng không thành công: ' + await response.text());
            }
        }
    })
    return (
        <>
            <h2>Order</h2>
            <DataGrid
                dataSource={orders}
                keyExpr="orderId"
                showBorders={true}
                paging={{ pageSize: 5 }}
            >
                <Paging enabled={true} />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="orderId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="customerId" dataType='number' />
                <Column dataField="orderDate" format={"dd/MM/yyyy"} dataType="date" />
                <Column dataField="totalAmount" format="currency" dataType='number' allowEditing={false} />
            </DataGrid>
            <h3>List Products</h3>
            <DataGrid
                dataSource={products}
                keyExpr="productId"
                showBorders={true}
                paging={{ pageSize: 5 }}
            >
                <Paging enabled={true} />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="productId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="productName" dataType='string' />
                <Column dataField="price" format="currency" dataType='number' />
            </DataGrid>
            <h3>Order Details</h3>
            <DataGrid
                dataSource={orderItemsStore}
                keyExpr="orderItemId"
                showBorders={true}
                paging={{ pageSize: 5 }}
            // onRowInserting={handleRowInserting}
            // onRowUpdating={handleRowInserting}
            // onRowInserted={handleRowInserted}
            // onRowUpdated={handelRowUpdated}
            // onRowRemoved={handelRowDeleted}
            >
                <Paging enabled={true} />
                <Editing mode="row" allowUpdating allowDeleting allowAdding />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="orderItemId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="orderId" dataType='number' />
                {/* <Column dataField="order.orderDate" caption="Order Date" dataType='date' format={"dd/MM/yyyy"} allowEditing={false} /> */}
                <Column dataField="productId" dataType='number' />
                {/* <Column dataField="product.productName" dataType='number' allowEditing={false} /> */}
                <Column dataField="quantity" dataType='number' />
                <Column dataField="unitPrice" dataType='number' format="currency" />
            </DataGrid>
        </>
    )
};

