/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface OptionType  {
    label: string;
    value: any;
    prefix?: ReactNode;
    suffix?: ReactNode;
    component?: ReactNode;
    className?: string;
  };

export interface SelectProps {
    options?: OptionType[];
    placeholder?: string;
    value?: any;
    onChange?: (props: { target: { name: string; value: any } }) => void;
    name?: string;
    label?: string;
    error?: string;
    className?: string;
    disabled?: boolean;

};

