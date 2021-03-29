import styled from 'styled-components';
import {createRef} from 'react';
import {camelCase, startCase} from 'lodash';

const WidgetWrapper = styled.div`
`
const InputWrapper  = styled.div`

`;
export function InputWidgetWrapper(props: { input: any, value: any, title: string }) {
    const inputRef       = createRef<HTMLDivElement>();
    const {input, value} = props;
    const title          = startCase(camelCase(props.title));
    return (
        <WidgetWrapper ref={inputRef} className={'input-wrapper range'}>
            <div className={'text-wrapper'}
                 style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div className={'title'}>{title}</div>
                <div className="value">{value}</div>
            </div>
            <InputWrapper>
                {input}
            </InputWrapper>
        </WidgetWrapper>
    );
}