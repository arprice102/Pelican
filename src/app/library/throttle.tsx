/*
** Basic throttle function, limit set in ms
*/

export default function throttle(func: (...args: any[]) => void, limit: number) {
    let lastCall = 0;
    return function (...args: any[]) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func(...args);
        }
    };
}