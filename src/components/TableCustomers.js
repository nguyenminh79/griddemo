import { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';

export default function TableCustomer() {

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

    const handleRowInserting = (e) => {
        const email = e.data.email?.toLowerCase();
        const emailExists = customers.some(c => c.email?.toLowerCase() === email);
        if (emailExists) {
            alert('Email đã tồn tại, không thể thêm khách hàng trùng email.');
            e.cancel = true; // dừng thêm ngay tại client
        }
    };

    const handelRowUpdating = (e) => {
        const email = e.data.email?.toLowerCase();
        const emailExists = customers.some(c => c.customerId !== e.key && c.email?.toLowerCase() === email);
        if (emailExists) {
            alert('Email đã tồn tại, không thể cập nhật khách hàng trùng email.');
            e.cancel = true; // dừng cập nhật ngay tại client
        }
    };
    const handleRowInsertededCustomers = async (e) => {
        try {
            const customer = {
                "fullName": e.data.fullName,
                "email": e.data.email,
                "phone": e.data.phone,
                "address": e.data.address,
            };
            // Đặt ID khách hàng là 0 để server tự sinh ID mới
            const response = await fetch('https://localhost:7288/api/Customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer),
            });
            if (response.ok) {
                fetchCustomers();
                window.alert('Thêm khách hàng thành công');
            } else {
                const errorMessage = await response.text();
                console.error('Lỗi thêm khách hàng:', errorMessage);
                window.alert('Lỗi thêm khách hàng không thành công: ' + errorMessage);
            }
        } catch (error) {
            console.error('Lỗi thêm:', error.message);
        }

    };

    const handleRowUpdated = async (e) => {
        try {
            const response = await fetch(`https://localhost:7288/api/Customers/${e.key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(e.data),
            });
            if (response.ok) {
                fetchCustomers();
                window.alert('Cập nhật khách hàng thành công');
            } else {
                
                console.error('Lỗi cập nhật khách hàng:', await response.text());
                window.alert('Lỗi cập nhật khách hàng không thành công: ' + await response.text());
            }
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
        }
    };

    const handleRowRemoved = async (e) => {
        try {
            const response = await fetch(`https://localhost:7288/api/Customers/${e.key}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                window.alert('Xoá khách hàng thành công');
            } else {
                console.error('Lỗi xoá khách hàng:', await response.text());
                window.alert('Lỗi xoá khách hàng không thành công: ' + await response.text());
            }
        } catch (error) {
            console.error('Lỗi xoá:', error);
            window.alert('Lỗi xoá khách hàng: ' + error.message);
        }
        fetchCustomers();
    };
    return (
        <>
            <h3>List Customer</h3>
            <DataGrid
                dataSource={customers}
                keyExpr="customerId"
                showBorders={true}
                paging={{ pageSize: 5 }}
                onRowInserting={handleRowInserting}
                onRowInserted={handleRowInsertededCustomers}
                onRowUpdating={handelRowUpdating}
                onRowUpdated={handleRowUpdated}
                onRowRemoved={handleRowRemoved}
            >
                <Paging enabled={true} />
                <Editing mode="row" allowUpdating allowDeleting allowAdding />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column dataField="customerId" caption="ID" allowEditing={false} width={100} />
                <Column dataField="fullName" dataType='string' />
                <Column dataField="email" dataType='string' />
                <Column dataField="phone" dataType='string' />
                <Column dataField="address" dataType='string' />
            </DataGrid>
        </>

    )
};




