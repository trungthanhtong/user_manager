import styled from 'styled-components'

export const Input = styled.input`
    border: 1px solid black;
    min-height: 35px;
    font-size: 17px;
    width: 100%;
`

export const Label = styled.div`
    color: black;
`

export const TextField = ({label, error, ...props}) => {
    return <span>
        <Label>
            {label}
        </Label>
        <Input {...props}/>
        <div className="text-danger" style={{minHeight:'25px'}}>{error}</div>
    </span>
}