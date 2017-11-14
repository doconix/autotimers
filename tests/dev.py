__pragma__('alias', 'S', '$')

def main():
    index = 1
    def func(timer):
        console.log(this)
        if index % 5 == 0:
            S(this).html('')
        S(this).append('<div>Run #' + index)
        index += 1
        
    S('#div1').autotimer().IntervalTimer(800).do(func)
    
S(main)

                  