import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Box } from '@mui/joy'
import StepEmail from "./StepEmail";
import StepPassword from "./StepPassword";
import StepRegister from './StepRegister';
import StepVerify from './StepVerify';

function TemplateAuth() {
    const [step, setStep] = useState(() => {
        return (
            localStorage.getItem('signInStep')
                && sessionStorage.getItem('signInEmail')
                ? localStorage.getItem('signInStep')
                : 'email'
        );
    });

    const [email, setEmail] = useState(() => sessionStorage.getItem('signInEmail') || '');
    const [emailInput, setEmailInput] = useState(email);
    const [direction, setDirection] = useState('forward');

    const isInitialMount = useRef(true);

    useEffect(() => {
        localStorage.setItem('signInStep', step);
    }, [step]);

    useEffect(() => {
        sessionStorage.setItem('signInEmail', email);
    }, [email]);

    useEffect(() => {
        if (step === 'email') {
            setEmailInput(email);
        }
    }, [step, email]);

    useEffect(() => {
        if (isInitialMount.current) {
            window.history.replaceState({ step }, '');
            isInitialMount.current = false;
        } else {
            window.history.pushState({ step }, '');
        }
    }, [step]);

    useEffect(() => {
        const onPopState = (event) => {
            setDirection('backward');
            setStep(event.state?.step || 'email');
        };

        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const handleEmailInputChange = (e) => {
        setEmailInput(e.target.value);
        sessionStorage.setItem('signInEmail', e.target.value);
    };

    const handleEditEmail = () => {
        setDirection('backward');
        setStep('email');
    };

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
            minHeight: 340,
            display: 'flex',
            overflow: 'hidden',
        }}>
            <AnimatePresence mode="wait" initial={false}>
                {step === 'email' && (
                    <StepEmail
                        key="email"
                        direction={direction}
                        emailInput={emailInput}
                        handleEmailInputChange={handleEmailInputChange}
                        setDirection={setDirection}
                        setStep={setStep}
                        setEmail={setEmail}
                    />
                )}

                {step === 'code' && (
                    <StepVerify
                        key="code"
                        direction={direction}
                        handleEditEmail={handleEditEmail}
                        setDirection={setDirection}
                        setStep={setStep}
                        email={email}
                    />
                )}

                {step === 'password' && (
                    <StepPassword
                        key="password"
                        direction={direction}
                        email={email}
                        handleEditEmail={handleEditEmail}
                    />
                )}

                {step === 'register' && (
                    <StepRegister
                        key="register"
                        direction={direction}
                        email={email}
                        handleEditEmail={handleEditEmail}
                    />
                )}
            </AnimatePresence>
        </Box>
    );
}

export default TemplateAuth;
