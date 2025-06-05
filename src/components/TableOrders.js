import { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';


export default function TableOrders() {
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        try {
            const response = await fetch('https://localhost:7288/api/Orders');
            const data = await response.json();
            if (response.ok) {
                console.log("Lấy thành dữ liệu thành công");
                setOrders(data);
            } else {
                console.error("Lỗi lấy dữ liệu:", await response.text());
            }
        } catch (error) {
            console.error('Lỗi fetch:', error);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    const handleRowInserted = async (e) => {
        try {
            const order = {
                "customerId": e.data.customerId,
                "orderDate": e.data.orderDate,
                "totalAmount": e.data.totalAmount,
            };
            // Đặt ID đơn hàng là 0 để server tự sinh ID mới
            await fetch('https://localhost:7288/api/Orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            }).then(async response => {
                if (response.ok) {
                    fetchOrders();
                    window.alert('Thêm đơn hàng thành công');
                }   else {
                    console.error('Lỗi thêm đơn hàng:', await response.text());
                    // window.alert('Lỗi thêm đơn hàng không thành công: ' + response.text());
                }
            });
        } catch (error) {
            console.error('Lỗi thêm đơn hàng:', error);
            window.alert('Lỗi thêm đơn hàng: ' + error.message);
        }
    };
    const handleRowUpdated = async (e) => {
        try {
            await fetch(`https://localhost:7288/api/Orders/${e.key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(e.data),
            }).then(async response => {
                if (response.ok) {
                    fetchOrders();
                    window.alert('Cập nhật đơn hàng thành công');
                }else{
                    console.error('Lỗi cập nhật đơn hàng:', await response.text());
                    // window.alert('Lỗi cập nhật đơn hàng không thành công: ' + response.text());
                }
            });
        } catch (error) {
            console.error('Lỗi cập nhật đơn hàng:', error);
        }
    };
    const handleRowRemoved = async (e) => {
        try {
            await fetch(`https://localhost:7288/api/Orders/${e.key}`, {
                method: 'DELETE',
            }).then(async response => {
                if (response.ok) {
                    fetchOrders();
                    window.alert('Xoá đơn hàng thành công');
                } else {
                    console.error('Lỗi xoá đơn hàng:', await response.text());
                    window.alert('Lỗi xoá đơn hàng không thành công: ' + await response.text());
                }
            });
        } catch (error) {
            console.error('Lỗi xoá đơn hàng:', error);
        }
    };

    return (
        <>
            <h3>List Orders</h3>
            <DataGrid
                dataSource={orders}
                keyExpr="orderId"
                showBorders={true}
                onRowInserted={handleRowInserted}
                onRowUpdated={handleRowUpdated}
                onRowRemoved={handleRowRemoved}
            >
                <Paging enabled={true} />
                <Editing mode="row" allowUpdating allowDeleting allowAdding />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="orderId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="customerId" dataType='number' />
                <Column dataField="orderDate" format={"dd/MM/yyyy"} dataType="date" />
                <Column dataField="totalAmount" format="currency" dataType='number' allowEditing={false} />
            </DataGrid>
        </>

    )
};

