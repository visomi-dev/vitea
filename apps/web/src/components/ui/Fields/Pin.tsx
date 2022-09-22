import type {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
} from 'react';

import {
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import type { PinFieldComponentProps as Props } from '~/entities/ui';

import { fieldClasses, formClasses, Label } from './Base';

const sizes = {
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  8: 'grid-cols-8',
};

const commands = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];

export function PinField({
  id,
  name,
  digits,
  className,
  label,
  errorMessage,
  disabled,
  onInput,
  onComplete,
}: Props) {
  const pins = useRef<HTMLInputElement[]>([]);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    pins.current[value.length]?.focus();

    if (onInput) {
      onInput(value.join(''));
    }

    if (onComplete && value.length === digits) {
      onComplete(value.join(''));
    }
  }, [value]);

  const onChangeOrInput = (
    event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
  };

  const onFocus = (
    event: FocusEvent<HTMLInputElement, Element>,
    digit: number,
  ) => {
    if (digit > value.length) {
      event.preventDefault();

      const element = pins.current[value.length];

      if (element) {
        element.focus();
      }
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const values = event.clipboardData?.getData('text').split('');

    if (values?.every(($value) => Number.isInteger(parseInt($value, 10)))) {
      setValue(values);
    }
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>, digit: number) => {
    event.preventDefault();

    if (!/[0-9]/.test(event.key) && !commands.includes(event.key)) {
      return;
    }

    if (commands.includes(event.key) && value.length === 0) {
      return;
    }

    if (event.key === 'ArrowLeft' && value.length > 0) {
      const element = pins.current[digit - 2];

      if (element) {
        element.focus();
      }

      return;
    }

    if (event.key === 'ArrowRight' && digit < value.length) {
      const element = pins.current[digit];

      if (element) {
        element.focus();
      }

      return;
    }

    if (event.key === 'Backspace' && value.length > 0) {
      if (pins.current[digit - 1]?.value) {
        setValue(value.slice(0, digit - 1));
      } else {
        setValue(value.slice(0, digit - 2));
      }

      const element = pins.current[digit - 2];

      if (element) {
        element.focus();
      }

      return;
    }

    if (!commands.includes(event.key) && value.length <= digits) {
      setValue([...value, event.key]);
    }
  };

  return (
    <div className={clsx(fieldClasses, className)}>
      {label && <Label id={id}>{label}</Label>}

      <ul className={clsx('grid gap-2', sizes[digits])}>
        {new Array(digits)
          .fill(null)
          .map((_, index) => index + 1)
          .map((digit, index) => (
            <li key={`${id}-${digit}`}>
              <input
                id={`${id}-${digit}`}
                name={`${name}-${digit}`}
                ref={(el) => {
                  pins.current[index] = el as HTMLInputElement;
                }}
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={1}
                pattern="\d{1}"
                placeholder="#"
                className={clsx(formClasses, 'text-center text-lg')}
                value={value[index] || ''}
                disabled={disabled}
                onChange={onChangeOrInput}
                onInput={onChangeOrInput}
                onFocus={(event) => onFocus(event, digit)}
                onKeyUp={(event) => onKeyUp(event, digit)}
                onPaste={(event) => onPaste(event)}
                required
              />
            </li>
          ))}
      </ul>

      {errorMessage && (
        <p className="error transition-all overflow-hidden text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
