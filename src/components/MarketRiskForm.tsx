import { useState, useEffect } from 'react';
import { Button, Form, FormInstance, InputNumber, Select, Space } from 'antd';
import { ChildProps } from './LambdaForm';
import { HistogramData } from './HistogramChart';
import { getData } from '../utils/service';
import { INPUT_NUMBER_STYLE, LABEL_COL, WRAPPER_COL } from '../constants/forms';
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

interface BaseMarketInput {
    t: number;
    r0: number;
    a: number;
    b: number;
    sigma: number;
    maturity: number
}

interface Bond extends BaseMarketInput { };
interface EDF extends BaseMarketInput {
    tenor: number;
}

interface BondOption extends BaseMarketInput {
    underlyingMaturity: number;
    strike: number;
}

interface Caplet extends BaseMarketInput {
    tenor: number;
    strike: number;
}
interface Swap extends BaseMarketInput {
    tenor: number;
    swapRate: number;
}

interface Swaption extends BaseMarketInput {
    tenor: number;
    swapTenor: number;
    swapRate: number;
}


const FIELD_LABELS = {
    t: "Simulate to (days)",
    r0: "Current short rate",
    a: "Mean reversion",
    b: "Long run average rate",
    sigma: "Volatility of rate",
    maturity: "Maturity (years)",
    tenor: "Floating tenor (years)",
    swapTenor: "Swap tenor (years)",
    underlyingMaturity: "Maturity of Underlying (years)",
    strike: "Strike",
    swapRate: "Swap rate"
}
const STEP_SIZE = {
    t: 1,
    r0: 0.01,
    a: 0.01,
    b: 0.01,
    sigma: 0.01,
    maturity: 0.25,
    tenor: 0.05,
    swapTenor: 0.25,
    underlyingMaturity: 0.25,
    strike: 0.01,
    swapRate: 0.01,
}

const DEFAULT_FIELDS_BOND: Bond = {
    "t": 10,
    "r0": 0.04,
    "a": 0.3,
    "b": 0.05,
    "sigma": 0.05,
    "maturity": 1
}
const DEFAULT_FIELDS_EDF: EDF = {
    "t": 10,
    "r0": 0.04,
    "a": 0.3,
    "b": 0.05,
    "sigma": 0.05,
    "maturity": 1,
    "tenor": 0.25
}
const DEFAULT_FIELDS_BOND_CALL: BondOption = {
    "t": 10,
    "r0": 0.04,
    "a": 0.3,
    "b": 0.05,
    "sigma": 0.05,
    "maturity": 1,
    "underlyingMaturity": 1.25,
    "strike": 0.97
}
const DEFAULT_FIELDS_BOND_PUT: BondOption = { "t": 10, "r0": 0.04, "a": 0.3, "b": 0.05, "sigma": 0.05, "maturity": 1, "underlyingMaturity": 1.25, "strike": 0.97 }
const DEFAULT_FIELDS_CAPLET: Caplet = { "t": 10, "r0": 0.04, "a": 0.3, "b": 0.05, "sigma": 0.05, "maturity": 1, "tenor": 0.25, "strike": 0.02 }
const DEFAULT_FIELDS_SWAP: Swap = { "t": 10, "r0": 0.04, "a": 0.3, "b": 0.05, "sigma": 0.05, "maturity": 1, "tenor": 0.25, "swapRate": 0.02 }
const DEFAULT_FIELDS_SWAPTION: Swaption = { "t": 10, "r0": 0.04, "a": 0.3, "b": 0.05, "sigma": 0.05, "maturity": 1, "tenor": 0.25, "swapTenor": 5, "swapRate": 0.02 }
const DEFAULT_FIELDS_AMERICAN_SWAPTION: Swaption = { "t": 10, "r0": 0.04, "a": 0.3, "b": 0.05, "sigma": 0.05, "maturity": 1, "tenor": 0.25, "swapTenor": 5, "swapRate": 0.02 }

interface FormEndpoints {
    defaultFields: Bond | EDF | Caplet | BondOption | Swap | Swaption,
    endpoint: string,
    label: string
}
const FORMS: FormEndpoints[] = [
    { defaultFields: DEFAULT_FIELDS_BOND, endpoint: "/v1/market/histogram/bond", label: "Bond" },
    { defaultFields: DEFAULT_FIELDS_EDF, endpoint: "/v1/market/histogram/edf", label: "Edf" },
    { defaultFields: DEFAULT_FIELDS_BOND_CALL, endpoint: "/v1/market/histogram/bondcall", label: "Bond Call" },
    { defaultFields: DEFAULT_FIELDS_BOND_PUT, endpoint: "/v1/market/histogram/bondput", label: "Bond Put" },
    { defaultFields: DEFAULT_FIELDS_CAPLET, endpoint: "/v1/market/histogram/caplet", label: "Caplet" },
    { defaultFields: DEFAULT_FIELDS_SWAP, endpoint: "/v1/market/histogram/swap", label: "Swap" },
    { defaultFields: DEFAULT_FIELDS_SWAPTION, endpoint: "/v1/market/histogram/swaption", label: "Swaption" },
    { defaultFields: DEFAULT_FIELDS_AMERICAN_SWAPTION, endpoint: "/v1/market/histogram/americanswaption", label: "American Swaption" }
]


type MarketInputType = {
    [P in keyof typeof FIELD_LABELS]?: number
};
type AllowableFields = keyof typeof FIELD_LABELS

function generateForm<T>(
    form: FormInstance,
    defaultFormFields: MarketInputType,
    onSubmit: (_: () => Promise<T>) => Promise<void>,
    isLoading: boolean,
    url: string
) {

    return <Form
        form={form}
        labelCol={LABEL_COL}
        wrapperCol={WRAPPER_COL}
        initialValues={defaultFormFields}
        onFinish={fields => onSubmit(() => getData(fields, url))}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        {(Object.keys(defaultFormFields) as AllowableFields[]).map((key: AllowableFields) =>
            <Form.Item<MarketInputType>
                key={key}
                label={FIELD_LABELS[key]}
                name={key}
            >
                <InputNumber style={INPUT_NUMBER_STYLE} min={0} step={STEP_SIZE[key]} />
            </Form.Item>
        )}
        <Form.Item wrapperCol={{ offset: LABEL_COL.span, span: WRAPPER_COL.span }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
            </Button>
        </Form.Item>
    </Form >
}

const MarketRiskForm = ({ onSubmit, isLoading, isVisible }: ChildProps<HistogramData>) => {
    const [endpoint, setEndpoint] = useState(FORMS[0].endpoint)
    const defaultFields = FORMS.find(v => v.endpoint === endpoint)?.defaultFields;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(defaultFields)
    }, [defaultFields, form])
    const selectedForm = defaultFields && generateForm(
        form,
        defaultFields,
        onSubmit,
        isLoading,
        `https://4mf1valfp4.execute-api.us-east-1.amazonaws.com/prd${endpoint}`
    )
    return <Space style={isVisible ? { width: "100%" } : { display: "none" }} direction="vertical">
        <Select
            value={endpoint}
            style={INPUT_NUMBER_STYLE}
            onChange={setEndpoint}
            options={
                FORMS.map(({ endpoint, label }) => ({ value: endpoint, label }))
            }
        />
        {selectedForm}
    </Space >
}

export default MarketRiskForm