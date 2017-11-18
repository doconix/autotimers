
def main():
    def func():
        console.log('timer do!')
    t = Timers.SleepTimer(document.getElementById('#div1'), {
        'millis': 1000,
        'maxRuns': 2,
    }).do(func)
    console.log(t)


document.addEventListener('DOMContentLoaded', main)
