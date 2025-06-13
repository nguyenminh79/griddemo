import { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
export default function TablesOrderItems() {
    // const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    let orderItems = [];
    // const fetchProducts = async () => {
    //     try {
    //         const responseProducts = await fetch('https://localhost:7288/api/Products');
    //         const dataProducts = await responseProducts.json();
    //         if (responseProducts.ok) {
    //             console.log("Lấy dữ liệu thành công");
    //             setProducts(dataProducts);
    //         } else {
    //             console.error("Lỗi lấy dữ liệu:", responseProducts.text());
    //         }
    //     } catch (error) {
    //         console.error('Lỗi fetch:', error);
    //     }
    // };
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
        // fetchProducts();
        fetchOrders();
    }, []);
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
                return key;
            } else {
                throw new Error('Lỗi xoá đơn hàng không thành công: ' + await response.text());
            }
        }
    })
    return (
        <>
         
            <h3>Order Details</h3>
            <DataGrid
                dataSource={orderItemsStore}
                keyExpr="orderItemId"
                showBorders={true}
                paging={{ pageSize: 5 }}
            
            >
                <Paging enabled={true} />
                <Editing mode="row" allowUpdating allowDeleting allowAdding />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="orderItemId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="orderId" dataType='number' width={100} lookup={{dataSource: orders, valueExpr: "orderId", searchEnabled: 'true', displayExpr: (item) => {
                        return item ? `${item.orderId}` : '';
                    }}}/>
                <Column dataField="orderDate" caption="Order Date" dataType='date' format={"dd/MM/yyyy"} allowEditing={false} />
                <Column dataField="productId" dataType='number' width={100}/>
                <Column dataField="productName" allowEditing={false} />
                <Column dataField="quantity" dataType='number' />
                <Column dataField="unitPrice" dataType='number' format="currency" />
            </DataGrid>
        </>
    )
};

