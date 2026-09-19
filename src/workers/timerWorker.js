let timeoutId = null;

self.onmessage = function (event) {
    const { activeTask, secondsRemaining } = event.data;

    if (!activeTask) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        return;
    }

    const endDate = activeTask.startDate + secondsRemaining * 1000;

    function tick() {
        const countDownSeconds = Math.max(
            0,
            Math.ceil((endDate - Date.now()) / 1000),
        );

        self.postMessage(countDownSeconds);

        if (countDownSeconds > 0) {
            timeoutId = setTimeout(tick, 1000);
        } else {
            timeoutId = null;
        }
    }

    if (timeoutId !== null) {
        clearTimeout(timeoutId);
    }

    tick();
};