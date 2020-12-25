import styled from "styled-components";
import { Label } from "./TextField";

export const Select = styled.select`
    width: 100%;
    min-height: 35;
    font-size: 100%;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0;
    border: 1px solid black;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    line-height: 33px;
    padding: 0 10px;
`;

export const Dropdown = ({ label, ...props }) => {
    return (
        <span>
            <Label>{label}</Label>
            <Select {...props} />
        </span>
    );
};
