import { useState } from 'react';
import Tabs from 'devextreme-react/tabs';
// import SelectBox from 'devextreme-react/select-box';
// import CheckBox from 'devextreme-react/check-box';
import TableCustomers from './TableCustomers.js';
import TableOrders from './TableOrders.js';
import TableProducts from './TableProducts.js';
import TablesOrderItems from './TablesOrderItems.js';
import RiskAccordion from './RiskAccordion.js';
// const STRICT_WIDTH_CLASS = 'strict-width';
// function OptionWrapper(props) {
//     return (
//         <div className="option">
//             {props.caption && <span>{props.caption}</span>}
//             {props.children}
//         </div>
//     );
// }
const Hello = () => {
    // const [orientation, setOrientation] = useState(orientations[0]);
    // const [stylingMode, setStylingMode] = useState(stylingModes[1]);
    // const [iconPosition, setIconPosition] = useState(iconPositions[0]);
    // const [showNavigation, setShowNavigation] = useState(false);
    // const [scrollContent, setScrollContent] = useState(false);
    // const [fullWidth, setFullWidth] = useState(false);
    // const [width, setWidth] = useState('auto');
    // const [rtlEnabled, setRtlEnabled] = useState(false);
    // const [widgetWrapperClasses, setWidgetWrapperClasses] = useState(
    //     'widget-wrapper widget-wrapper-horizontal',
    // );

    //useCallBack sử dụng để lưu method vào bộ nhớ tránh tạo lại hàm mới mỗi lần gọi đến khiến bị render lại không cần thiết.
    //useCallBack chỉ tạo lại method nếu phần bên trong [] thay đổi, ở dưới là setWidgerWapperClass hàm này thực chất không hề thay đổi tuy nhiên để đảm bảo luồng hoạt động vẫn cần cho nó vào component
    // const enforceWidthConstraint = useCallback(
    //     (shouldRestrictWidth) => {
    //         const callback = (prevClasses) => {
    //             const restClasses = prevClasses
    //                 .split(' ')
    //                 .filter((className) => className !== STRICT_WIDTH_CLASS)
    //                 .join(' ');
    //             const strictWidthClass = shouldRestrictWidth ? STRICT_WIDTH_CLASS : '';
    //             return `${restClasses} ${strictWidthClass}`;
    //         };
    //         setWidgetWrapperClasses(callback);
    //     },
    //     [setWidgetWrapperClasses],
    // );
    // const stylingModeChanged = useCallback(
    //     (e) => {
    //         setStylingMode(e.value);
    //     },
    //     [setStylingMode],
    // );
    // const iconPositionChanged = useCallback(
    //     (e) => {
    //         setIconPosition(e.value);
    //     },
    //     [setIconPosition],
    // );
    // const orientationChanged = useCallback(
    //     (e) => {
    //         const isVertical = e.value === 'vertical';
    //         const callback = (prevClasses) => {
    //             const restClasses = prevClasses
    //                 .split(' ')
    //                 .filter(
    //                     (className) =>
    //                         className !== (isVertical ? 'widget-wrapper-horizontal' : 'widget-wrapper-vertical'),
    //                 )
    //                 .join(' ');
    //             return `${restClasses} widget-wrapper-${e.value}`;
    //         };
    //         setWidgetWrapperClasses(callback);
    //         setOrientation(e.value);
    //     },
    //     [setOrientation, setWidgetWrapperClasses],
    // );
    // const showNavigationChanged = useCallback(
    //     (e) => {
    //         const shouldRestrictWidth = e.value || scrollContent;
    //         enforceWidthConstraint(shouldRestrictWidth);
    //         setShowNavigation(e.value);
    //     },
    //     [scrollContent, setShowNavigation, enforceWidthConstraint],
    // );
    // const scrollContentChanged = useCallback(
    //     (e) => {
    //         const shouldRestrictWidth = e.value || showNavigation;
    //         enforceWidthConstraint(shouldRestrictWidth);
    //         setScrollContent(e.value);
    //     },
    //     [showNavigation, setScrollContent, enforceWidthConstraint],
    // );
    // const fullWidthChanged = useCallback(
    //     (e) => {
    //         setFullWidth(e.value);
    //         setWidth(e.value ? '100%' : 'auto');
    //     },
    //     [setFullWidth, setWidth],
    // );
    // const rtlEnabledChanged = useCallback(
    //     (e) => {
    //         setRtlEnabled(e.value);
    //     },
    //     [setRtlEnabled],
    // );
    const tabContentMap = {
        customers: <TableCustomers />,
        products: <TableProducts />,
        orders: <TableOrders />,
        orderItems: <TablesOrderItems />,
        riskAccordion: <RiskAccordion />
    };
    const sidebarLinks = [
        { id: 'customers', text: 'Customers' },
        { id: 'products', text: 'Products' },
        { id: 'orders', text: 'Orders' },
        { id: 'orderItems', text: 'Order Items' },
        { id: 'riskAccordion', text: 'Risk Accordion' }
    ];
    const [tabs, setTabs] = useState([]); // danh sách tabs được thêm vào
    const [selectedTabId, setSelectedTabId] = useState(null); // tab đang chọn

    // 🎯 Thêm tab khi click sidebar
    const addTab = (item) => {
        const exists = tabs.find(t => t.id === item.id);
        if (!exists) {
            setTabs([...tabs, item]);
        }
        setSelectedTabId(item.id);
    };
    const removeTab = (idToRemove) => {
            //Tìm danh sách tất cả các tab có id không giống với id can xoa
            const newTabs = tabs.filter(t => t.id !== idToRemove);
            setTabs(newTabs);

            // Nếu tab đang chọn bị xoá, thì chuyển sang tab đầu tiên
            if (selectedTabId === idToRemove) {
                setSelectedTabId(newTabs.length > 0 ? newTabs[0].id : null);
            }

    };

    // 🎯 Cập nhật khi chọn tab
    const onTabChange = (e) => {
        // Check if there are added items (i.e., a tab was selected)
        if (e.addedItems && e.addedItems.length > 0) {
            setSelectedTabId(e.addedItems[0].id);
        }
    };
    // Render từng item trong tab (custom với nút xoá)
    const renderTabItem = (data) => (

        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{data.text}</span>
            <span
                onClick={(e) => {
                    e.stopPropagation(); // Ngăn chọn tab khi bấm nút xoá

                    removeTab(data.id);
                }}
                style={{
                    marginLeft: 8,
                    cursor: 'pointer',
                    color: 'red',
                    fontWeight: 'bold',
                }}
            >
                ✖
            </span>
        </div>
    );
    return (
        <>
            <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
                {/* Sidebar bên trái */}
                <div
                    style={{
                        width: 220,
                        backgroundColor: '#A8D5BA',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 16,
                        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
                    }}
                >
                    {/* Logo + Tên công ty */}
                    <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 28 }}>🌿</div>
                        <div style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>My Company</div>
                    </div>

                    {/* Danh sách menu */}
                    <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#fff', fontSize: 16, marginBottom: 12 }}>📂 Menu</h4>
                        {sidebarLinks.map((link) => (
                            <div
                                key={link.id}
                                onClick={() => addTab(link)}
                                style={{
                                    padding: '10px 12px',
                                    marginBottom: 8,
                                    borderRadius: 6,
                                    backgroundColor: '#fff',
                                    border: '1px solid #ddd',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e6f0ff';
                                    e.currentTarget.style.borderColor = '#99c2ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#fff';
                                    e.currentTarget.style.borderColor = '#ddd';
                                }}
                            >
                                {link.text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div style={{ flex: 1, padding: 10 }}>
                    {/* Tabs */}
                    <Tabs
                        dataSource={tabs}
                        defaultSelectedItem={tabs.find(t => t.id === 'customers')}
                        onSelectionChanged={onTabChange}
                        keyExpr="id"
                        displayExpr="text"
                        itemRender={renderTabItem}
                        style={{ color: 'red' }}
                        
                    />

                    {/* Nội dung của tab */}
                    <div style={{ marginTop: 20 }}>
                        {selectedTabId ? tabContentMap[selectedTabId] : <div>🔍 Chọn tab để hiển thị nội dung</div>}
                    </div>
                </div>
            </div>
            {/* <div className="tabs-demo">
                <div className="widget-container">

                    <div className='widget-wrapper widget-wrapper-horizontal'>
                        <Tabs
                            //Id của nhóm thẻ 
                            id="withText"
                            //Độ dài của từng thẻ
                            width='auto'
                            //Id thẻ được chọn mặc định
                            defaultSelectedIndex={0}
                            //Đảo chiều thứ tự các thẻ
                            rtlEnabled='false'
                            //Nội dung tên thẻ 
                            dataSource={tabsText}
                            //Cho phép kéo thả hoặc không 
                            scrollByContent='false'
                            //Thêm mũi tên để có thể điều hướng tùy theo hướng của orientation
                            showNavButtons='false'
                            //Hướng list nằm dọc hoặc ngang
                            orientation='horizontal'
                            //Kiểu chữ là viết thường hoặc là in hoa
                            stylingMode='secondary'
                            //Nếu có icon đi kèm thì icon sẽ xuất hiện ở hướng nào với nội dung
                            iconPosition='top'
                            onSelectionChanged={(e) => {


                            }
                            }
                        />
                    </div>
                </div>
                <Tabs
                        id="withIconAndText"
                        width={width}
                        defaultSelectedIndex={0}
                        rtlEnabled={rtlEnabled}
                        dataSource={tabsIconAndText}
                        scrollByContent={scrollContent}
                        showNavButtons={showNavigation}
                        orientation={orientation}
                        stylingMode={stylingMode}
                        iconPosition={iconPosition}
                    />

                    <Tabs
                        id="withIcon"
                        width={width}
                        defaultSelectedIndex={0}
                        rtlEnabled={rtlEnabled}
                        dataSource={tabsIcon}
                        scrollByContent={scrollContent}
                        showNavButtons={showNavigation}
                        orientation={orientation}
                        stylingMode={stylingMode}
                        iconPosition={iconPosition}
                    />
                </div>
            </div>

            <div className="options">
                <div className="caption">Options</div>

                <OptionWrapper caption="Orientation">
                    <SelectBox
                        items={orientations}
                        inputAttr={orientationLabel}
                        value={orientation}
                        onValueChanged={orientationChanged}
                    />
                </OptionWrapper>

                <OptionWrapper caption="Styling mode">
                    <SelectBox
                        items={stylingModes}
                        inputAttr={stylingModeLabel}
                        value={stylingMode}
                        onValueChanged={stylingModeChanged}
                    />
                </OptionWrapper>

                <OptionWrapper caption="Icon position">
                    <SelectBox
                        items={iconPositions}
                        inputAttr={iconPositionLabel}
                        value={iconPosition}
                        onValueChanged={iconPositionChanged}
                    />
                </OptionWrapper>

                <div className="option">
                    <CheckBox
                        id="show-navigation-buttons"
                        text="Show navigation buttons"
                        value={showNavigation}
                        onValueChanged={showNavigationChanged}
                    />
                </div>

                <div className="option">
                    <CheckBox
                        text="Scroll content"
                        value={scrollContent}
                        onValueChanged={scrollContentChanged}
                    />
                </div>

                <div className="option">
                    <CheckBox
                        text="Full width"
                        value={fullWidth}
                        onValueChanged={fullWidthChanged}
                    />
                </div>

                <div className="option">
                    <CheckBox
                        text="Right-to-left mode"
                        value={rtlEnabled}
                        onValueChanged={rtlEnabledChanged}
                    />
                </div>
                
            </div>
             
            </div> */}
        </>
    );
};
export default Hello;
