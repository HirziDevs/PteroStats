module.exports = function promiseTimeout(promise, ms) {
    const timeout = new Promise((resolve) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            resolve(false);
        }, ms);
    });
    return Promise.race([promise, timeout]);
}