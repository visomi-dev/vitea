import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

export type MenuItem = {
  icon?: React.ReactNode;
  label: string;
  link: string;
  className?: string;
};

export type Notification = {
  icon?: string;
  iconClass?: string;
  title: string;
  description?: string;
  duration?: number;
  timestamp: number;
};

export type ButtonComponentProps = DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  type?: 'button' | 'submit';
  className?: string;
  children: React.ReactNode;
  to?: string;
  variant?: 'solid' | 'outline';
  color?: 'slate' | 'blue' | 'emerald' | 'white';
  loading?: boolean;
  disabled?: boolean;
  form?: string;
};

export type LinkComponentProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export type LoaderComponentProps = {
  className?: string;
  duration?: number;
};

export type LabelComponentProps = {
  id: string;
  children: React.ReactNode;
};

export type FieldComponentProps = DetailedHTMLProps<
InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & {
  id: string;
  name?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
};

export type TextFieldComponentProps = FieldComponentProps & {
  type?: 'text' | 'email';
};

export type PasswordFieldComponentProps = FieldComponentProps & {
  pattern?: string;
  min?: number;
  children?: React.ReactNode;
};

export type PinFieldComponentProps = Omit<FieldComponentProps, 'onInput'> & {
  digits: 4 | 6 | 8;
  onInput?(value: string): void;
  onComplete?(value: string): void;
};

export type DefaultLayoutComponentProps = {
  className?: string;
  sidebar?: {
    start: MenuItem[];
    end: MenuItem[];
  };
  navbar?: MenuItem[];
  children: React.ReactNode | React.ReactNode[];
};
