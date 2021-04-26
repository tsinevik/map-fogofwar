export const sendMessage = (type: string, payload: string) => {
    const message = {type, payload};
    // @ts-ignore
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
};
