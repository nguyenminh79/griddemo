import { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';

export default function TablesOrderItems() {

    const [orderItems, setOrderItems] = useState([]);
    const fetchOrderTtems = async () => {
        try {
            const response = await fetch('https://localhost:7288/api/OrderItems');
            const data = await response.json();
            if (response.ok) {
                console.log("Lấy dữ liệu thành công");
                setOrderItems(data);
            } else {
                console.error("Lỗi lấy dữ liệu:", response.text());
            }
        } catch (error) {
            console.error('Lỗi fetch:', error);
        }
    };
    useEffect(() => {
        fetchOrderTtems();
    }, []);

    const handleRowInserted = async (e) => {
        try {
            const orderItem = {
                "orderId": e.data.orderId,
                "productId": e.data.productId,
                "quantity": e.data.quantity,
                "unitPrice": e.data.unitPrice
            };
            // Đặt ID đơn hàng là 0 để server tự sinh ID mới
            await fetch('https://localhost:7288/api/OrderItems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderItem),
            }).then(async response => {
                if (response.ok) {
                    fetchOrderTtems();
                    window.alert('Thêm đơn hàng thành công');
                } else {
                    console.error('Lỗi thêm đơn hàng:', await response.text());
                    window.alert('Lỗi thêm đơn hàng không thành công: ' + await response.statusText);
                }
            });
        } catch (error) {
            console.error('Lỗi thêm đơn hàng:', error);
        }
    };
    const handelRowUpdated = async (e) => {
        try {
            await fetch(`https://localhost:7288/api/OrderItems/${e.key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(e.data),
            }).then(async response => {
                if (response.ok) {
                    fetchOrderTtems();
                    window.alert('Cập nhật đơn hàng thành công');
                } else {

                    console.error('Lỗi cập nhật đơn hàng:', await response.text());
                    window.alert('Lỗi cập nhật đơn hàng không thành công: ' + await response.text());
                }
            });
        } catch (error) {
            console.error('Lỗi cập nhật đơn hàng:', error);

        }
    };
    const handelRowDeleted = async (e) => {
        try {
            await fetch(`https://localhost:7288/api/OrderItems/${e.key}`, {
                method: 'DELETE',
            }).then(async response => {
                if (response.ok) {
                    fetchOrderTtems();
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
            <h3>Order Details</h3>
            <DataGrid
                dataSource={orderItems}
                keyExpr="orderItemId"
                showBorders={true}
                onRowInserted={handleRowInserted}
                onRowUpdated={handelRowUpdated}
                onRowRemoved={handelRowDeleted}
            >
                <Paging enabled={true} />
                <Editing mode="row" allowUpdating allowDeleting allowAdding />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="orderItemId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="orderId" dataType='number' />
                <Column dataField="productId" dataType='number' />
                <Column dataField="quantity" dataType='number' />
                <Column dataField="unitPrice" dataType='number' format="currency" />
            </DataGrid>
        </>
    )
};

