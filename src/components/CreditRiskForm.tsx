import { Button, Form, InputNumber } from 'antd';
import { ChildProps } from './LambdaForm';
import { DensityData } from './DensityChart';
import { getData } from '../utils/service';
import { INPUT_NUMBER_STYLE, LABEL_COL, WRAPPER_COL } from '../constants/forms';

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

interface CreditInput {
    lambda: number;
    q: number;
    numU: number;
    pd: number;
    numLoans: number;
    volatility: number;
}

type CreditInputType = {
    [P in keyof CreditInput]?: number
};
const defaultFieldsDensity: CreditInput = {
    "lambda": 0.5,
    "q": 0.05,
    "numU": 128,
    "pd": 0.02,
    "numLoans": 100000,
    "volatility": 0.5
}

const CreditRiskForm = ({ onSubmit, isLoading, isVisible }: ChildProps<DensityData[]>) => (
    <Form
        style={isVisible ? {} : { display: "none" }}
        name="creditriskform"
        labelCol={LABEL_COL}
        wrapperCol={WRAPPER_COL}
        initialValues={defaultFieldsDensity}
        onFinish={fields => onSubmit(() => getData(fields, 'https://5qsvissse9.execute-api.us-east-1.amazonaws.com/prd/v1/credit/density'))}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<CreditInputType>
            label="Lambda"
            name="lambda"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<CreditInputType>
            label="q"
            name="q"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item<CreditInputType>
            label="Steps in U"
            name="numU"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>
        <Form.Item<CreditInputType>
            label="Probability of default"
            name="pd"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>
        <Form.Item<CreditInputType>
            label="Number of loans"
            name="numLoans"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>
        <Form.Item<CreditInputType>
            label="Volatility"
            name="volatility"
        >
            <InputNumber style={INPUT_NUMBER_STYLE} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: LABEL_COL.span, span: WRAPPER_COL.span }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
            </Button>
        </Form.Item>
    </Form>
);

export default CreditRiskForm