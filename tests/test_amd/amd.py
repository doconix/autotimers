
def amd_test(Timers):
    console.log("Starting timer...")
    def func():
        console.log('timer do!')
    Timers.SleepTimer(document.getElementById('#div1'), {
        'millis': 1000,
        'maxRuns': 2,
    }).do(func)


def main():
    requirejs(["../../src/__javascript__/main.js"], amd_test)
document.addEventListener('DOMContentLoaded', main)
