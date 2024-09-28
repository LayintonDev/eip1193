/// <reference types="vite/client" />
declare global {
    interface Window {
        ethereum: {
            request: (args: any) => Promise<any>;
            on: (event: string, callback: (payload?: any, payload2?: any) => void) => void
            removeListener: (event: string, callback: (payload?: any, payload2?: any) => void) => void
        };

    }
}


export { };
