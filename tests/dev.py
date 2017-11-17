def main():
    elem = document.querySelector('#div1')
    def func():
        console.log('timer do!')
        raise __new__(Error('asdf'))
        
    def then():
        console.log('then!')
        
    def err(timer, error):
        console.log('error')
        console.log(error)
        
    Timers.SleepTimer(elem, {
        'millis': 1000,
        'maxRuns': 2,
    }).do(func).then(then).catch(err)


document.addEventListener('DOMContentLoaded', main)
