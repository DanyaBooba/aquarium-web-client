import { useState, useRef, useEffect } from 'react'
import { Input } from '@mui/joy'

function CodeInput({ callback, setError, reset, loading, error }) {
    const [code, setCode] = useState('');

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const resetCode = () => {
        inputRefs.forEach(ref => {
            const inputEl = ref.current?.querySelector('input');
            if (inputEl) inputEl.value = '';
        });
        const firstInput = inputRefs[0]?.current?.querySelector('input');
        firstInput?.focus();
        setCode('');
    };

    useEffect(() => {
        if (code.length === 6) {
            if (typeof callback === 'function') callback(code);
        }
    }, [code]); //eslint-disable-line

    useEffect(() => {
        resetCode();
    }, [reset]); //eslint-disable-line

    function handleInput(e, index) {
        setError(null);

        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        const newCode = [...code];

        if (/^[a-z]+$/.test(input.value)) {
            return;
        } else {
            newCode[index] = input.value;
        }

        setCode(newCode.join(''));
        input.select();

        if (input.value === '') {
            if (previousInput?.current) {
                const prev = previousInput.current.querySelector('input');
                prev?.focus();
            }
        } else if (nextInput?.current) {
            const next = nextInput.current.querySelector('input');
            next?.select();
        }
    }

    function handleFocus(e) {
        e.target.select();
    }

    function handleKeyDown(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
            if (previousInput?.current) {
                const prev = previousInput.current.querySelector('input');
                prev?.focus();
            }
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData.getData('text').trim();

        if (!/^\d{6}$/.test(pasted)) return;

        const digits = pasted.split('');
        setCode(pasted);

        digits.forEach((digit, index) => {
            const inputEl = inputRefs[index]?.current?.querySelector('input');
            if (inputEl) inputEl.value = digit;
        });

        const lastInput = inputRefs[5]?.current?.querySelector('input');
        lastInput?.focus();
    };

    return (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    onChange={(e) => handleInput(e, index)}
                    ref={inputRefs[index]}
                    autoFocus={index === 0}
                    onFocus={handleFocus}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={loading}
                    error={error}
                    sx={{
                        width: 50,
                        height: 60,
                        textAlign: 'center',
                        boxShadow: 'none',
                        borderRadius: '12px',
                        '& input': {
                            textAlign: 'center',
                            fontSize: 30,
                            MozAppearance: 'textfield',
                            '&::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                            '&::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                        },
                    }}
                />
            ))}
        </div>
    );
}


export default CodeInput
