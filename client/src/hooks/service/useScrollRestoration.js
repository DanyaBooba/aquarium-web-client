import { useEffect, useLayoutEffect } from 'react';

export function useScrollRestoration(key, deps = []) {
    useEffect(() => {
        const handleScroll = () => {
            sessionStorage.setItem(key, window.scrollY.toString());
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [key]);

    useLayoutEffect(() => {
        const savedScroll = sessionStorage.getItem(key);
        if (savedScroll) {
            window.scrollTo(0, parseInt(savedScroll, 10));
        }
    }, [key, ...deps]);
}
