__pragma__('alias', 'S', '$')

def main():
    def func():
        console.log('hey world')
        
    S('#div1').timers().Timer(5000).do(func)
    
S(main)