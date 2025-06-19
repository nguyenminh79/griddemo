import { DateBox, NumberBox, SelectBox, TextBox, Button } from 'devextreme-react';
import Accordion from 'devextreme-react/accordion';
import { useEffect, useState } from 'react';
// import { data } from 'react-router-dom';

export default function RiskAccordion() {
    const [risk, setRisk] = useState(
        {
            id: null,
            riskClass: "",
            locId: "",
            fcSi: null,
            fcPrem: null,
            fromDate: null,
            toDate: null,
            coverCode: "",
            coverDesc: "",
        }
    );
    const [risks, setRisks] = useState([
        {
            id: 1,
            riskClass: "FCFEMD3",
            locId: "6500707",
            fcSi: 14505000000,
            fcPrem: 29010000,
            fromDate: "2020-01-31T16:00",
            toDate: "2021-01-31T16:00",
            coverCode: "FCFC",
            coverDesc: "COMPULSORY FIRE AND EXPLOSION INSURAN",
        },
        {
            id: 2,
            riskClass: "FCFOMD3",
            locId: "6500707",
            fcSi: 0,
            fcPrem: 5802000,
            fromDate: "2020-01-31T16:00",
            toDate: "2021-01-31T16:00",
            coverCode: "FCFC02",
            coverDesc: "NAMED PERILS INSURANCE",
        },
    ]);

    const handleSelectChange = (data) => {
        const result = risks.find((r) => r.id === data);
        if (result) {
            setRisk(result);
        }
    }
    const handleSave = () => {
        if (risk.id === null) {
            // ADD
            const maxId = risks.length > 0 ? Math.max(...risks.map(r => r.id)) : 0;
            const newRisk = { ...risk, id: maxId + 1 };
            setRisks([...risks, newRisk]);
            setRisk(newRisk); // Cập nhật lại risk hiện tại
        } else {
            // UPDATE
            const updatedRisks = risks.map(r => (r.id === risk.id ? risk : r));
            setRisks(updatedRisks);
        }
        if (sum.id === null) {
            const maxId = sums.length > 0 ? Math.max(...sums.map(s => s.id)) : 0;
            const newSum = { ...sum, id: maxId + 1, smiCode: 'FCFISM' + (maxId + 1) };
            setSums([...sums, newSum])
            setSum(newSum);
        } else {
            const updatedSums = sums.map(s => (s.id === sum.id ? sum : s));
            setSums(updatedSums);
        }
        if (broker.id === null) {
            const maxId = brokers.length > 0 ? Math.max(...brokers.map(b => b.id)) : 0;
            const newBroke = { ...broker, id: maxId + 1 };
            setBrokers([...brokers, newBroke])
            setBroker(newBroke);
        } else {
            const updatedBrokes = brokers.map(b => (b.id === broker.id ? broker : b));
            setBrokers(updatedBrokes);
        }
        alert("Save all data success");
    };
    const handleRiskClear = () => {
        setRisk(
            {
                id: null,
                riskClass: "",
                locId: "",
                fcSi: null,
                fcPrem: null,
                fromDate: null,
                toDate: null,
                coverCode: "",
                coverDesc: "",
            }
        );
    }
    const [sum, setSum] = useState({
        id: null,
        smiCode: '',
        fcSi: null,
        rate: null,
        fcPremium: null,
        addSi: false,
        rsmiDesc: "",
        note: "",
    }
    );
    const handleSumClear = () => {
        setSum({
            id: null,
            smiCode: '',
            fcSi: null,
            rate: null,
            fcPremium: null,
            addSi: false,
            rsmiDesc: "",
            note: "",
        });
    }

    const handleSelectSumChange = (data) => {
        const s = sums.find(x => x.smiCode === data);
        console.log(data);
        if (s) {
            setSum(s);
        }
    }
    const [sums, setSums] = useState([
        {
            id: 2,
            smiCode: "FCFISM02",
            fcSi: 2505000000,
            rate: 0.2,
            fcPremium: 5010000,
            addSi: "Yes",
            rsmiDesc: "On Machinery and Equipment",
            note: "E1"
        },
        {
            id: 3,
            smiCode: "FCFISM03",
            fcSi: 12000000000,
            rate: 0.2,
            fcPremium: 24000000,
            addSi: "Yes",
            rsmiDesc: "On Stock",
            note: "E0"
        }
    ]);
    const [broker, setBroker] = useState({
        id: null,
        commCode: "",
        brokerCode: "",
        pbCustName: "",
        subClass: "",
        perCent: null,
        fcComm: null,
        note: '',
    }
    );
    const [brokers, setBrokers] = useState([{
        id: 1,
        commCode: "Agent Commission",
        brokerCode: "FBIA0000358",
        pbCustName: "NGUYEN THI THU GIANG",
        subClass: "CFE",
        perCent: 5.00,
        fcComm: 1450500,
        note: "E1"
    },
    {
        id: 2,
        commCode: "Agent Commission",
        brokerCode: "FBIA0000358",
        pbCustName: "NGUYEN THI THU GIANG",
        subClass: "CFO",
        perCent: 5.00,
        fcComm: 290100,
        note: "E0"
    }]);
    const handleBrokerSelect = (data) => {
        console.log(data);
        const result = brokers.find(b => b.id === data);
        if (result) {
            setBroker(result);
        }
    }
    const handleBrokerClear = () => {
        setBroker({
            id: null,
            commCode: "",
            brokerCode: "",
            pbCustName: "",
            subClass: "",
            perCent: null,
            fcComm: null,
            note: '',
        })
    }
    const [clauses, setClauses] = useState([
        {
            seriNo: 1,
            condCode: "FCA0251",
            condPcDesc: "Warranty 24 Hours Security",
            condLimitation: null
        },
        {
            seriNo: 2,
            condCode: "FCA0237",
            condPcDesc: "Date Recognition Exception (Total Exclusion)",
            condLimitation: null
        },
        {
            seriNo: 3,
            condCode: "FCA0238",
            condPcDesc: "Institute Radioactive Contamination, Chemical, Biological, Bio-Chemical And Electromagnetic Weapon",
            condLimitation: null
        },
        {
            seriNo: 4,
            condCode: "FCA0241",
            condPcDesc: "Pollution/Contamination Exclusion Clause",
            condLimitation: null
        },
        {
            seriNo: 5,
            condCode: "FCA0242",
            condPcDesc: "Political Risks Exclusion Clause",
            condLimitation: null
        },
        {
            seriNo: 6,
            condCode: "FCA0243",
            condPcDesc: "Cyber Primary Exclusion (Applicable To The Whole Policy)",
            condLimitation: null
        }
    ]);
    const [clause, setClause] = useState({
        seriNo: null,
        condCode: "",
        condPcDesc: "",
        condLimitation: null
    });

    const [clausesSearch, setClausesSearch] = useState([])
    const searchDesc = (data) => {

        const result = clauses.filter(c => c.condPcDesc.toLowerCase().includes(data.toLowerCase()));
        if (result) {
            setClausesSearch(result);
        }

    }
    const addClauses = () => {
        const maxId = clauses.length > 0 ? Math.max(...clauses.map(c => c.seriNo)) : 0;
        const newClause = { ...clause, seriNo: maxId + 1 };
        setClauses([...clauses, newClause])
        setClause(newClause);
    }
    const displayClauses = clausesSearch.length > 0 ? clausesSearch : clauses;
    useEffect(()=>{
    }, [displayClauses])
    return (
        <div>
            <div className='container-fluid'>
                <div className="row">
                    <div className='col-md-5'>
                        <Accordion
                            dataSource={[{}]} // luôn giữ cố định 1 phần tử
                            itemTitleRender={() => "RISK INFORMATION"}
                            collapsible
                            multiple
                            keyExpr='risk'
                            itemRender={() => (
                                <div className="container-fluid">
                                    <div className="row mb-3">
                                        <div className='col-md-3'>
                                            <SelectBox
                                                label="Risk Id"
                                                labelMode='floating'
                                                dataSource={risks}
                                                valueExpr="id"
                                                displayExpr="id"
                                                value={risk.id}
                                                onValueChanged={(e) => handleSelectChange(e.value)}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <TextBox
                                                value={risk.riskClass}
                                                label="Risk Class"
                                                labelMode="floating"
                                                onValueChange={(e) => setRisk({ ...risk, riskClass: e })}
                                            />
                                        </div>
                                        <div className='col-md-4'>
                                            <TextBox
                                                value={risk.locId}
                                                label="Loc ID"
                                                labelMode="floating"
                                                onValueChange={(e) => setRisk({ ...risk, locId: e })}
                                            />
                                        </div>
                                        {/* Row 2 */}

                                        <div className="col-md-2">
                                            <NumberBox
                                                value={10}
                                                disabled
                                                label="Tax (%)"
                                                labelMode="floating"

                                            />

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <NumberBox
                                                value={risk.fcSi}
                                                label="FC SI"
                                                labelMode="floating"
                                                format="#,##0"
                                                onValueChange={(e) => setRisk({ ...risk, fcSi: e })}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <NumberBox
                                                value={risk.fcPrem}
                                                label="FC Prem"
                                                labelMode="floating"
                                                format="#,##0"
                                                onValueChange={(e) => setRisk({ ...risk, fcPrem: e })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <DateBox
                                                value={risk.fromDate}
                                                type="date"
                                                label="From Date"
                                                labelMode="floating"
                                                onValueChange={(e) => setRisk({ ...risk, fromDate: e })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <DateBox
                                                value={risk.toDate}
                                                type="date"
                                                label="To Date"
                                                labelMode="floating"
                                                onValueChange={(e) => setRisk({ ...risk, toDate: e })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-3">
                                            <TextBox
                                                value={risk.coverCode}
                                                label="Cover Code"
                                                labelMode="floating"
                                                onValueChange={(e) => setRisk({ ...risk, coverCode: e })}
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <TextBox
                                                value={risk.coverDesc}
                                                label="Cover Desc"
                                                labelMode="floating"
                                                onValueChange={(e) => setRisk({ ...risk, coverDesc: e })}
                                            />
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-3'>
                                            <Button
                                                text="Clear"
                                                onClick={handleRiskClear}
                                            />
                                        </div>
                                    </div>
                                </div>

                            )
                            }
                        />
                    </div>
                    <div className='col-md-7'>
                        <Accordion
                            dataSource={[{}]}
                            multiple
                            collapsible
                            keyExpr='sum'
                            itemTitleRender={() => 'SUM INSURED INFORMATION'}
                            itemRender={() => (
                                <div className='container-fluid'>
                                    <div className='row mb-3'>
                                        <div className='col-md-2'>
                                            <NumberBox
                                                label='ID'
                                                labelMode='floating'
                                                value={sum.id}
                                                readOnly
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <SelectBox
                                                label='SMI Code'
                                                labelMode='floating'
                                                valueExpr='smiCode'
                                                displayExpr='smiCode'
                                                dataSource={sums}
                                                value={sum.smiCode}
                                                onValueChanged={(e) => handleSelectSumChange(e.value)}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <NumberBox
                                                label='FC SI'
                                                labelMode='floating'
                                                value={sum.fcSi}
                                                format='#,##0'
                                                onValueChange={(e) => setSum({ ...sum, fcSi: e })}
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <NumberBox
                                                label='Rate'
                                                labelMode='floating'
                                                value={sum.rate}
                                                format='#.#0'
                                                onValueChange={(e) => setSum({ ...sum, rate: e })}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <NumberBox
                                                label='FC Premium'
                                                labelMode='floating'
                                                value={sum.fcSi * sum.rate}
                                                format='#,##0'
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-2'>
                                            <SelectBox
                                                dataSource={['Yes', 'No']}
                                                label='Add SI'
                                                labelMode='floating'
                                                value={sum.addSi}
                                                onValueChange={(e) => setSum({ ...sum, addSi: e })}
                                            />

                                        </div>


                                        <div className='col-md-8'>
                                            <TextBox
                                                value={sum.rsmiDesc}
                                                label='RSMI Desc'
                                                labelMode='static'
                                                onValueChange={(e) => setSum({ ...sum, rsmiDesc: e })}
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <TextBox
                                                value={sum.note}
                                                label='Note'
                                                labelMode='floating'
                                                onValueChange={(e) => setSum({ ...sum, note: e })}
                                            />
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-3'>
                                            <Button
                                                text="Clear"
                                                onClick={handleSumClear}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                        />
                    </div>
                </div>
                <div className='row'>

                    <Accordion dataSource={[{}]}
                        collapsible
                        multiple
                        itemTitleRender={() => 'BROKER/AGENT INFORMATIONS'}
                        keyExpr='broker'
                        itemRender={() => (
                            <>
                                <div className='row' style={{ boxSizing: 'border-box' }}>
                                    <div className='col-md-3' style={{ textAlign: 'center', color: 'red', borderRight: '1px solid black' }}>
                                        <p><b>Comm Code</b></p>
                                    </div>
                                    <div className='col-md-2' style={{ textAlign: 'center', color: 'red', borderRight: '1px solid black' }}>
                                        <p><b>Broker Code</b></p>
                                    </div>
                                    <div className='col-md-3' style={{ textAlign: 'center', borderRight: '1px solid black' }}>
                                        <p><b>Pb Cust Name</b></p>
                                    </div>
                                    <div className='col-md-1' style={{ textAlign: 'center', color: 'red', borderRight: '1px solid black' }}>
                                        <p><b>Sub Class</b></p>
                                    </div>
                                    <div className='col-md-1' style={{ textAlign: 'center', borderRight: '1px solid black' }}>
                                        <p><b>Percent(%)</b></p>
                                    </div>
                                    <div className='col-md-1' style={{ textAlign: 'center', borderRight: '1px solid black' }}>
                                        <p><b>FC Comm</b></p>
                                    </div>
                                    <div className='col-md-1' style={{ textAlign: 'center' }}></div> {/* Cột trống, không cần border */}
                                </div>

                                <div className='row'>
                                    <div className='col-md-1'>
                                        <SelectBox
                                            dataSource={brokers}
                                            valueExpr='id'
                                            displayExpr='id'
                                            label='id'
                                            value={broker.id}
                                            onValueChange={(e) => handleBrokerSelect(e)}
                                        />
                                    </div>
                                    <div className='col-md-2'>
                                        <TextBox
                                            value={broker.commCode}
                                            label='Comm Code'
                                            onValueChange={(e) => setBroker({ ...broker, commCode: e })}
                                        />
                                    </div>
                                    <div className='col-md-2'>
                                        <SelectBox
                                            dataSource={brokers}
                                            valueExpr='id'
                                            displayExpr='brokerCode'
                                            label='Broker Code'
                                            value={broker.id}
                                            onValueChange={(e) => handleBrokerSelect(e)}
                                        />
                                    </div>
                                    <div className='col-md-3'>
                                        <TextBox
                                            value={broker.pbCustName}
                                            label='Pb Cust Name'
                                            onValueChange={(e) => setBroker({ ...broker, pbCustName: e })}
                                        />
                                    </div>
                                    <div className='col-md-1' style={{ color: 'red' }}>
                                        <TextBox
                                            value={broker.subClass}
                                            label='Sub Class'
                                            onValueChange={(e) => setBroker({ ...broker, subClass: e })}
                                        />
                                    </div>
                                    <div className='col-md-1'>
                                        <NumberBox
                                            value={broker.perCent}
                                            label='Percent(%)'
                                            format='#.##'
                                            onValueChange={(e) => setBroker({ ...broker, perCent: e })}
                                        />
                                    </div>
                                    <div className='col-md-1'>
                                        <NumberBox
                                            value={broker.fcComm}
                                            label='FC Comm'
                                            format='#,##0'
                                            onValueChange={(e) => setBroker({ ...broker, fcComm: e })}
                                        />
                                    </div>
                                    <div className='col-md-1'>
                                        <TextBox
                                            value={broker.note}
                                            label='Note'
                                            onValueChange={(e) => setBroker({ ...broker, note: e })}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <Button
                                            text="Clear"
                                            onClick={handleBrokerClear}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    />
                </div>
                <div className='row'>
                    <Accordion
                        dataSource={[{}]}
                        collapsible
                        multiple
                        keyExpr='clause'
                        itemTitleRender={() => 'ADDITIONAL CLAUSE'}
                        itemRender={() => (
                            <>
                                <div className='row' style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                    <div className='col-md-3'>
                                        <p><b>COND DESC SEARCH</b></p>
                                    </div>
                                    <div className='col-md-9'>
                                        <TextBox
                                            onValueChange={(e) => searchDesc(e)}
                                            style={{ width: '60%' }}
                                        />
                                    </div>

                                </div>
                                <div className='row' >
                                    <div className='col-md-1' style={{ textAlign: 'center', borderRight: '1px solid black' }}>
                                        <p><b>SeriNo</b></p>
                                    </div>
                                    <div className='col-md-2' style={{ textAlign: 'center', color: 'red', borderRight: '1px solid black' }}>
                                        <p><b>Cond Code</b></p>
                                    </div>
                                    <div className='col-md-5' style={{ textAlign: 'center', borderRight: '1px solid black' }}>
                                        <p><b>Cond Pc Desc</b></p>
                                    </div>
                                    <div className='col-md-4' style={{ textAlign: 'center' }}>
                                        <p><b>Cond Limitation</b></p>
                                    </div>
                                </div>

                                {displayClauses && displayClauses.map((clause) => (
                                    <>
                                        <div className='row'>
                                            <div className='col-md-1'>
                                                <NumberBox
                                                    value={clause.seriNo}
                                                    label='Seri No'
                                                    readOnly />
                                            </div>
                                            <div className='col-md-2'>
                                                <TextBox
                                                    value={clause.condCode}
                                                    label='Cond Code'
                                                    onValueChange={(e) => setClauses(prevClauses => prevClauses.map(c =>
                                                        c.seriNo === clause.seriNo ? { ...c, condCode: e } : c
                                                    )
                                                    )
                                                    }
                                                />
                                            </div>
                                            <div className='col-md-5'>
                                                <TextBox
                                                    value={clause.condPcDesc}
                                                    label='Cond Pc Desc'
                                                    onValueChange={(e) => setClauses(prevClauses => prevClauses.map(c =>
                                                        c.seriNo === clause.seriNo ? { ...c, condPcDesc: e } : c
                                                    )
                                                    )
                                                    }
                                                />
                                            </div>
                                            <div className='col-md-4'>
                                                <TextBox
                                                    value={clause.condLimitation}
                                                    label='Cond Limitation'
                                                    onValueChange={(e) => setClauses(prevClauses => prevClauses.map(c =>
                                                        c.seriNo === clause.seriNo ? { ...c, condLimitation: e } : c
                                                    )
                                                    )
                                                    }
                                                />
                                            </div>
                                        </div>

                                    </>

                                ))}
                                <Button
                                    text='Add'
                                    onClick={addClauses}>
                                </Button>
                            </>

                        )}
                    />
                </div>
            </div>
            < Button
                text="Save"
                onClick={handleSave}
            />

        </div >
    )
};
