import { useState, useEffect } from 'react';
import SelectBox from 'devextreme-react/select-box';
import Button from 'devextreme-react/button';
import NumberBox from 'devextreme-react/number-box';

export default function DynamicProductsSelectBoxes({ onChange }) {
    const [products, setProducts] = useState([]);
    //a rows data default
    const [rows, setRows] = useState([{ id: 1, productId: null, quantity: 1, price: 0 }]);
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
    useEffect(() => {
        fetchProducts();
    }, []);
    
    useEffect(() => {
        onChange(rows);
    }, [rows, onChange]);


    const addRow = () => {
        setRows([...rows, { id: Date.now(), productId: null, quantity: 1, price: 0 }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const updateRow = (id, field, value) => {
        const newRows = rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        );
        setRows(newRows);
    };
    
    const handleProductChange = (id, productId) => {
        const product = products.find(p => p.productId === productId);
        const price = product?.price ?? 0;
        const newRows = rows.map(row =>
            row.id === id
                ? { ...row, productId: productId, price: price }
                : row
        );
        setRows(newRows);
    };


    return (
        <div style={{ padding: 20 }}>
            <Button text="➕ Thêm sản phẩm" type="default" onClick={addRow} />

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 50 }}>
                {rows.map((row, index) => (
                    <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <SelectBox
                            dataSource={products}
                            valueExpr="productId"
                            displayExpr={(item) => item ? `ID: ${item.productId} - ${item.productName}` : ''}
                            value={row.productId}
                            placeholder="Product"
                            searchEnabled={true}
                            onValueChanged={(e) => handleProductChange(row.id, e.value)}
                            style={{ width: 250 }}
                        />

                        <NumberBox
                            value={row.quantity}
                            min={1}
                            showSpinButtons={true}
                            onValueChanged={(e) => updateRow(row.id, 'quantity', e.value)}
                            placeholder="Quantity"
                            style={{ width: 120 }}
                        />
                        <NumberBox
                            readOnly={true}
                            value={row.price * row.quantity}
                            placeholder="Price"
                            style={{ width: 120 }}
                        />

                        <Button
                            text="❌"
                            stylingMode="text"
                            onClick={() => removeRow(row.id)}
                            hint="Xóa dòng"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}