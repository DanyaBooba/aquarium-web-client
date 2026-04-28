import { useEffect, useState, useRef } from 'react'
import { OTPInput } from 'input-otp'

function CodeInput({ callback, setError, reset, loading, error }) {
    const [value, setValue] = useState('')
    const otpRef = useRef(null)

    useEffect(() => {
        if (reset) {
            setTimeout(() => {
                setValue('')
                // Фокус на первом инпуте после сброса
                setTimeout(() => {
                    const firstInput = otpRef.current?.querySelector('input')
                    firstInput?.focus()
                }, 50)
            }, 800)
        }
    }, [reset])

    const handleComplete = (val) => {
        if (val.length === 6) {
            if (typeof callback === 'function') callback(val)
        }
    }

    const handleChange = (val) => {
        setValue(val)
        setError(null)
        if (val.length === 6) {
            handleComplete(val)
        }
    }

    return (
        <div ref={otpRef}>
            <OTPInput
                maxLength={6}
                value={value}
                onChange={handleChange}
                disabled={loading}
                autoFocus
                inputMode="numeric"
                pattern="[0-9]*"
                containerClassName="otp-container"
                render={({ slots }) => (
                    <div style={{
                        display: 'flex',
                        gap: 8,
                        justifyContent: 'center'
                    }}>
                        {slots.map((slot, idx) => (
                            <div
                                key={idx}
                                className={`otp-slot ${error ? 'otp-slot-error' : ''}`}
                                style={{
                                    width: 50,
                                    height: 60,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: error
                                        ? '1px solid var(--joy-palette-danger-500)'
                                        : slot.isActive
                                            ? '2px solid var(--joy-palette-primary-500)'
                                            : '1px solid var(--joy-palette-neutral-outlinedBorder)',
                                    borderRadius: 12,
                                    fontSize: 30,
                                    fontWeight: 500,
                                    backgroundColor: loading
                                        ? 'var(--joy-palette-neutral-softBg)'
                                        : 'var(--joy-palette-background-surface)',
                                    color: 'var(--joy-palette-text-primary)',
                                    transition: 'all 0.2s',
                                    outline: 'none',
                                    cursor: loading ? 'not-allowed' : 'text',
                                    opacity: loading ? 0.6 : 1,
                                }}
                            >
                                {slot.char !== null ? slot.char : slot.isActive ? '|' : ''}
                            </div>
                        ))}
                    </div>
                )}
            />
        </div>
    )
}

export default CodeInput
