import { Button, Form, InputNumber } from 'antd';
import { ChildProps } from './LambdaForm';
import { DensityData } from './DensityChart';
import { getData } from '../utils/service';
import { INPUT_NUMBER_STYLE, LABEL_COL, WRAPPER_COL } from '../constants/forms';


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

interface OpsInput {
    t: number;
    numU: number;
    numOde: number;
    a: number;
    sigma: number;
    lambda: number;
    correlation: number;
    alpha: number;
    mu: number;
    c: number;
}

type OpsInputType = {
    [P in keyof OpsInput]?: number
};
const defaultFieldsDensity: OpsInput = {
    "t": 1,
    "numU": 128,
    "numOde": 128,
    "a": 0.3,
    "sigma": 0.3,
    "lambda": 100,
    "correlation": 0.8,
    "alpha": 1.1,
    "mu": 1300,
    "c": 100
}

const OpsRiskForm = ({ onSubmit, isLoading, isVisible }: ChildProps<DensityData[]>) => (
    isVisible ? <Form
        name="opsriskform"
        labelCol={LABEL_COL}
        wrapperCol={WRAPPER_COL}
        initialValues={defaultFieldsDensity}
        onFinish={fields => onSubmit(() => getData(fields, 'https://e43exqgwxl.execute-api.us-east-1.amazonaws.com/prd/v1/ops/density'))}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<OpsInputType>
            label="Time Horizon"
            name="t"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>
        <Form.Item<OpsInputType>
            label="Steps in U"
            name="numU"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<OpsInputType>
            label="Steps in ODE"
            name="numOde"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<OpsInputType>
            label="Speed"
            name="a"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<OpsInputType>
            label="Volatility"
            name="sigma"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<OpsInputType>
            label="Jump Frequency"
            name="lambda"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<OpsInputType>
            label="Correlation"
            name="correlation"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<OpsInputType>
            label="Alpha"
            name="alpha"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<OpsInputType>
            label="Shift (Stable)"
            name="mu"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<OpsInputType>
            label="Scale (Stable)"
            name="c"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: LABEL_COL.span, span: WRAPPER_COL.span }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
            </Button>
        </Form.Item>
    </Form> : <></>
);

export default OpsRiskForm