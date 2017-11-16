__pragma__('kwargs')
__pragma__('alias', 'js_finally', 'finally')


class TimerPromise(object):
    '''A wrapper around Promise, with added progress (do) capability'''
    # I'm wrapping Promise instead of extending it because Promise is 
    # a little weird to subclass.  It requires new to be called, and 
    # then() and catch() return new Promise objects.  Using composition
    # instead.
    
    def __init__(self, executor):
        self.resolve
        self.reject
        self.executor = executor
        self.do_handlers = []
        self.promise = __new__(Promise(self._executor)).then(self._cleanup, self._cleanup)
    

    def _cleanup(self):
        '''Called when resolved or rejected'''
        self.resolve = None
        self.reject = None
        self.do_handlers = None
        self.promise = None
        

    def do(self, onAlarm):
        '''Registers an observer to be called when the timer reaches zero'''
        if self.do_handlers is not None:
            self.do_handlers.append(onAlarm)
        return self
        

    def alarm(self, context, args):
        '''Triggers the do() handlers (called when the timer reaches zero)'''
        console.log('alarm called!')
        if self._pending:
            for f in self.do_handlers:
                f.apply(context, args)

        
    def _executor(self, resolve, reject):
        '''Adds the alarm function to resolve and reject'''
        console.log('saving resolve and reject')
        self.resolve = resolve
        self.reject = reject
        self.executor()
        self.executor = None
        
        
    def _pending(self):
        return bool(self.do_handlers)
    pending = property(pending)

    
    ###  Promise Passthroughs  ##
    
    def catch(self, *args, **kwargs):
        self.promise = self.promise.catch(*args, **kwargs)
        return self
        
    def then(self, *args, **kwargs):
        self.promise = self.promise.then(*args, **kwargs)
        return self
        
    def js_finally(self, *args, **kwargs):
        self.promise = self.promise.js_finally(*args, **kwargs)
        return self
        
    ###  End Promise Passthroughs  ##        
        