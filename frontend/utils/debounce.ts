export function debounce(callee: () => void, timeoutMs: number) {
    let lastCall = null
    let lastCallTimer = null
    return function perform(...args: any[]) {
        let previousCall = lastCall
        lastCall = Date.now()
        if (previousCall && lastCall - previousCall <= timeoutMs) {
            clearTimeout(lastCallTimer)
        }
        lastCallTimer = setTimeout(() => callee(...args), timeoutMs)

    }
}