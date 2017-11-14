S = jQuery

DATA_KEY = '_jquery_timers_'


def _tstore(elem):
    '''Gets the timer storage dict on the given element'''
    if not elem.data(DATA_KEY):
        elem.data(DATA_KEY, {})
    return elem.data(DATA_KEY)
    

def get_timers(elem, tname):
    '''Retrieves the timers on the given jQuery array, optionally filtered by name'''
    tlist= []
    for e in elem:
        store = _tstore(S(e))
        for timer_name in store.keys():
            if tname is None or tname is js_undefined or tname == timer_name:
                tlist.push(store[timer_name])
    return tlist
    
    
def set_timer(elem, tname, timer):
    for e in elem:
        _tstore(S(e))[tname] = timer


def remove_timer(elem, tname):
    del _tstore(elem)[tname]