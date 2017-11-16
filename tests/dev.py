def main():
    elem = document.querySelector('#div1')
    def func():
        console.log('timer!')
    console.log(elem)
    Timers.Timer(elem, 1000).do(func)


document.addEventListener('DOMContentLoaded', main)
