import { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
// import TableCustomer from './TableCustomers';


export default function TableOrders() {
    let orders = [];
    const [customers, setCustomers] = useState([]);
    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://localhost:7288/api/Customers');
            const data = await response.json();
            if (response.ok) {
                console.log("Lấy dữ liệu thành công");
                setCustomers(data);
            } else {
                console.error("Lỗi lấy dữ liệu:", response.text());
            }
        } catch (error) {
            console.error('Lỗi fetch:', error);
        }
    };
    useEffect(() => {
        fetchCustomers();
    }, []);
    const orderStore = new CustomStore({
        key: 'orderId',
        load: async () => {
            const res = await fetch('https://localhost:7288/api/Orders');
            if (!res.ok) {
                throw new Error('Không thể tải dữ liệu đơn hàng');
            }
            const data = await res.json();
            orders = data;
            return data;
        },
        insert: async (values) => {
            const customerId = values.customerId;
            const checkRes = await fetch(`https://localhost:7288/api/Customers/${customerId}`);
            if (!checkRes.ok) {
                throw new Error('Khách hàng không tồn tại. Vui lòng kiểm tra lại.');
            }

            const order = {
                customerId: values.customerId,
                orderDate: values.orderDate,
                totalAmount: values.totalAmount,
            };

            const response = await fetch('https://localhost:7288/api/Orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            alert("Thêm đơn hàng thành công");

        },
        update: async (key, values) => {
            const original = orders.find(o => o.orderId === key);
            // Kiểm tra xem đơn hàng có tồn tại không trong mảng orders đã lưu sau khi loadload
            const updatedOrder = {
                ...original,
                ...values
            };
            //hợp nhất các trường đã thay đổi với dữ liệu gốc
            const response = await fetch(`https://localhost:7288/api/Orders/${key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOrder),
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            alert("Cập nhật đơn hàng thành công");
        },
        remove: async (key) => {
            const response = await fetch(`https://localhost:7288/api/Orders/${key}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            alert("Xoá đơn hàng thành công");
        }
    });
    // const [orders, setOrders] = useState([]);
    // const fetchOrders = async () => {
    //     try {
    //         const response = await fetch('https://localhost:7288/api/Orders');
    //         const data = await response.json();
    //         if (response.ok) {
    //             console.log("Lấy thành dữ liệu thành công");
    //             setOrders(data);
    //         } else {
    //             console.error("Lỗi lấy dữ liệu:", await response.text());
    //         }
    //     } catch (error) {
    //         console.error('Lỗi fetch:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchOrders();
    // }, []);
    // const handleRowInserting = async (e) => {
    //     const customerId = e.data.customerId;
    //     try {
    //         await fetch(`https://localhost:7288/api/Customers/${customerId}`).then(async fetchCustomer => {
    //             if (!fetchCustomer.ok) {
    //                 window.alert('Khách hàng không tồn tại, không thể thêm đơn hàng');
    //                 console.error('Khách hàng không tồn tại:', await fetchCustomer.text());
    //                 e.cancel = true; // Dừng thêm đơn hàng nếu khách hàng không tồn tại
    //             }
    //         });
    //     } catch (error) {
    //         window.alert('Khách hàng không tồn tại, không thể thêm đơn hàng');
    //         e.cancel = true; // 
    //     }

    // };
    // const handleRowInserted = async (e) => {
    //     try {
    //         const order = {
    //             "customerId": e.data.customerId,
    //             "orderDate": e.data.orderDate,
    //             "totalAmount": e.data.totalAmount,
    //         };
    //         // Đặt ID đơn hàng là 0 để server tự sinh ID mới
    //         await fetch('https://localhost:7288/api/Orders', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(order),
    //         }).then(async response => {
    //             if (response.ok) {
    //                 fetchOrders();
    //                 window.alert('Thêm đơn hàng thành công');
    //             } else {
    //                 console.error('Lỗi thêm đơn hàng:', await response.text());
    //                 // window.alert('Lỗi thêm đơn hàng không thành công: ' + response.text());
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Lỗi thêm đơn hàng:', error);
    //         window.alert('Lỗi thêm đơn hàng: ' + error.message);
    //     }
    // };
    // const handleRowUpdated = async (e) => {
    //     try {
    //         await fetch(`https://localhost:7288/api/Orders/${e.key}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(e.data),
    //         }).then(async response => {
    //             if (response.ok) {
    //                 fetchOrders();
    //                 window.alert('Cập nhật đơn hàng thành công');
    //             } else {
    //                 console.error('Lỗi cập nhật đơn hàng:', await response.text());
    //                 // window.alert('Lỗi cập nhật đơn hàng không thành công: ' + response.text());
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Lỗi cập nhật đơn hàng:', error);
    //     }
    // };
    // const handleRowRemoved = async (e) => {
    //     try {
    //         await fetch(`https://localhost:7288/api/Orders/${e.key}`, {
    //             method: 'DELETE',
    //         }).then(async response => {
    //             if (response.ok) {
    //                 fetchOrders();
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

    return (
        <>
            <h3>List Customers</h3>
            <DataGrid
                dataSource={customers}
                keyExpr="customerId"
                showBorders={true}
                paging={{ pageSize: 5 }}
            >
                <Paging enabled={true} />
                {/* <Editing mode="row" allowUpdating allowDeleting allowAdding /> */}
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="customerId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="fullName" dataType='string' />
                <Column dataField="email" dataType='string' />
                <Column dataField="phone" dataType='string' />
            </DataGrid>
            <h3>List Orders</h3>
            <DataGrid
                dataSource={orderStore}
                keyExpr="orderId"
                showBorders={true}
                paging={{ pageSize: 5 }}
            // onRowInserting={handleRowInserting}
            // onRowInserted={handleRowInserted}
            // onRowUpdating={handleRowInserting}
            // onRowUpdated={handleRowUpdated}
            // onRowRemoved={handleRowRemoved}
            >
                <Paging enabled={true} />
                <Editing mode="row" allowUpdating allowDeleting allowAdding />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="orderId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="customerId" dataType='number' />
                {/* <Column dataField="customer.fullName" caption="Customer Name" dataType='string' allowEditing={false} /> */}
                <Column dataField="orderDate" format={"dd/MM/yyyy"} dataType="date" />
                <Column dataField="totalAmount" format="currency" dataType='number' allowEditing={false} />
            </DataGrid>

        </>

    )
};

