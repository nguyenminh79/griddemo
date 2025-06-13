import { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Paging, SearchPanel } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import Popup from 'devextreme-react/popup';
// import TextBox from 'devextreme-react/text-box';
import DateBox from 'devextreme-react/date-box';
import SelectBox from 'devextreme-react/select-box';
import Button from 'devextreme-react/button';
import DynamicProductsSelectBoxes from './DynamicProductsSelectBox';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TableOrders() {
    let orders = [];
    const [newOrder, setNewOrder] = useState({
        customerId: null,
        orderDate: new Date(),
        totalAmount: 0
    });
    const [orderItems, setOrderItems] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState();
    const [popUp, setPopUp] = useState(false);
    const [popUpInvoice, setPopUpInvoice] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://localhost:7288/api/Customers');
            const data = await response.json();
            if (response.ok) {
                console.log("Lấy dữ liệu customer thành công ");
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
            return response.json(); // trả về dữ liệu đơn hàng đã cập nhật
        },
        remove: async (key) => {
            const response = await fetch(`https://localhost:7288/api/Orders/${key}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            alert("Xoá đơn hàng thành công");
            return key; // trả về key để DataGrid biết đã xoá thành công
        }
    });
    const onToolbarPreparing = (e) => {
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                text: 'Create new order',
                onClick: handleCustomAdd,
            },
        });
    };
    const handleCustomAdd = async () => {
        setPopUp(true);
    };

    const handleAddOrder = async () => {
        const customerId = newOrder.customerId;
        // const sum = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
        const checkRes = await fetch(`https://localhost:7288/api/Customers/${customerId}`);
        if (!checkRes.ok) {
            throw new Error('Khách hàng không tồn tại. Vui lòng kiểm tra lại.');
        }
        let sum = 0;
        products.forEach(async (product) => {
            sum += product.price * product.quantity;
        })
        const orderToSend = {
            ...newOrder,
            totalAmount: sum,
        };

        const response = await fetch('https://localhost:7288/api/Orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderToSend),
        });
        const data = await response.json();
        if (response.ok) {
            products.forEach(async (product) => {
                const orderItem = {
                    orderId: data.orderId,
                    productId: product.productId,
                    quantity: product.quantity,
                    unitPrice: product.price
                };
                const res = await fetch('https://localhost:7288/api/OrderItems', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderItem),
                });
                if (!res.ok) {
                    throw new Error(await res.text());
                }
                console.log(product);
            }
            )
            alert('Tạo đơn hàng thành công');
            setPopUp(false);
        } else {
            alert('Lỗi khi thêm đơn hàng');
        }
    };
    const renderDetailsButton = (data) => {
        return (
            <Button
                hint='ViewDetail'
                text={data.data.orderId}
                stylingMode="text"
                onClick={() => handleViewDetails(data.data)}
                style={{ display: 'flex', textAlign: 'center', color: '#03a9f4' }}
            />
        );
    };
    const handleViewDetails = async (data) => {
        // console.log(selectedOrder);
        
        const response = await fetch('https://localhost:7288/api/OrderItems');
        if (!response.ok) {
            alert("Error get detail order");
        }
        const result = await response.json();
        const OrderDetails = await result.filter((e) => e.orderId === data.orderId);
        console.log(OrderDetails)
        setOrderItems(OrderDetails);
        setSelectedOrder(data);
        setPopUpInvoice(true);
    }




    const exportCustomFormToPDF = () => {
        const input = document.getElementById("pdf-content");

        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL("image/png");

            // Kích thước gốc của canvas (theo px)
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Chuyển đổi từ px sang mm (1px = 0.264583mm)
            const pdfWidth = imgWidth * 0.264583;
            const pdfHeight = imgHeight * 0.264583;

            // Tạo PDF với đúng kích thước của content
            const pdf = new jsPDF({
                orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`order-${selectedOrder.orderId}.pdf`);
        });
    };

    return (
        <>
            <Popup
                visible={popUpInvoice}
                title="Order Invoice"
                onHiding={() => setPopUpInvoice(false)}
                showCloseButton={true}
            >

                <div
                    id="pdf-content"
                    style={{

                        padding: '80px 40px', // lề trái phải toàn bộ nội dung
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    {selectedOrder && (
                        <>
                            {/* Header gói chung với chiều rộng bằng bảng */}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '80%' }}>
                                    {/* Logo và Order ID */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>🌿 My Website</div>
                                        <div>
                                            <h3 style={{ margin: 0 }}>Order #{selectedOrder.orderId}</h3>
                                        </div>
                                    </div>

                                    {/* Customer Name và Address */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <h5 style={{ margin: 0 }}>Customer Name: {selectedOrder.customerName}</h5>
                                        <h5 style={{ margin: 0 }}>Address: {selectedOrder.address}</h5>
                                    </div>
                                </div>
                            </div>

                            {/* Bảng sản phẩm */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <table
                                    style={{
                                        border: '1px solid black',
                                        borderCollapse: 'collapse',
                                        width: '80%',
                                        textAlign: 'left',
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            {['Product', 'Quantity', 'Price', 'Total'].map((text) => (
                                                <th
                                                    key={text}
                                                    style={{
                                                        border: '1px solid black',
                                                        padding: '10px',
                                                        height: '50px',
                                                    }}
                                                >
                                                    {text}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderItems.map((item) => (
                                            <tr key={item.orderItemId}>
                                                <td style={{ border: '1px dotted black', padding: '10px' }}>{item.productName}</td>
                                                <td style={{ border: '1px dotted black', padding: '10px' }}>{item.quantity}</td>
                                                <td style={{ border: '1px dotted black', padding: '10px' }}>${item.unitPrice}</td>
                                                <td style={{ border: '1px dotted black', padding: '10px' }}>${item.unitPrice * item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Bảng tổng tiền */}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <table
                                    style={{
                                        border: '1px solid black',
                                        borderCollapse: 'collapse',
                                        width: '80%',
                                        textAlign: 'left',
                                    }}
                                >
                                    <tbody>
                                        <tr>
                                            <td style={{ border: '1px dotted black', padding: '10px' }}>
                                                <b>Total Amount</b>
                                            </td>
                                            <td style={{ border: '1px dotted black', padding: '10px' }}>
                                                <b>${selectedOrder.totalAmount.toFixed(2)}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px dotted black', padding: '10px' }}>
                                                <b>TAX (8%)</b>
                                            </td>
                                            <td style={{ border: '1px dotted black', padding: '10px' }}>
                                                <b>${(selectedOrder.totalAmount * 0.08).toFixed(2)}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px dotted black', padding: '10px' }}>
                                                <b>Total Payment</b>
                                            </td>
                                            <td style={{ border: '1px dotted black', padding: '10px' }}>
                                                <b>${(selectedOrder.totalAmount * 1.08).toFixed(2)}</b>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
                <Button text="📄 Export PDF" onClick={() => exportCustomFormToPDF()} />
            </Popup>

            <h3>List Orders</h3>

            <DataGrid
                dataSource={orderStore}
                keyExpr="orderId"
                showBorders={true}
                paging={{ pageSize: 5 }}
                onToolbarPreparing={onToolbarPreparing}
            >
                <Paging enabled={true} />
                <Editing mode="row" allowUpdating allowDeleting />
                <SearchPanel visible={true} highlightCaseSensitive={false} width={500} />
                <Column caption="OrderID" cellRender={renderDetailsButton} width={100} />
                {/* <Column dataField="orderId" caption="ID" allowEditing={false} width={100} /> */}
                <Column dataField="customerId" caption="Customer" dataType='number' width={300} lookup={{
                    dataSource: customers, valueExpr: "customerId", searchEnabled: 'true', displayExpr: (item) => {
                        return item ? `ID: ${item.customerId} - ${item.fullName}` : '';
                    }
                }} />
                <Column dataField="orderDate" format={"dd/MM/yyyy"} dataType="date" />
                <Column dataField="totalAmount" format="currency" dataType='number' allowEditing={false} />

            </DataGrid>
            <Popup
                visible={popUp}
                title="Tạo đơn hàng mới"
                onHiding={() => setPopUp(false)}
                showCloseButton={true}
                width={800}
                height={500}
            >
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <SelectBox
                        dataSource={customers}
                        valueExpr="customerId"
                        displayExpr={(item) => item ? `ID: ${item.customerId} - ${item.fullName}` : ''}
                        value={newOrder.customerId}
                        onValueChanged={(e) => setNewOrder({ ...newOrder, customerId: e.value })}
                        placeholder="Choose a customer"
                        searchEnabled={true}
                    />
                    <DateBox
                        type="date"
                        value={newOrder.orderDate}
                        onValueChanged={(e) => setNewOrder({ ...newOrder, orderDate: e.value })}
                    />
                    <DynamicProductsSelectBoxes onChange={(e) => { setProducts(e) }} />
                    <Button text="Lưu đơn hàng" type="success" onClick={handleAddOrder} />
                </div>
            </Popup>



        </>

    )
};

