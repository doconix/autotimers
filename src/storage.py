# using a weak map so the references go away when the element is removed from dom
TIMERS = __new__(WeakMap())


def _tstore(elem):
    '''Gets the timer storage Map for the given element'''
    if not TIMERS.has(elem):
        TIMERS.set(elem, __new__(Map()))
    return TIMERS.js_get(elem)
    

def remove_timer(elem, tname):
    '''Removes the timer under the given tname for the given element'''
    tmap = _tstore(elem)
    tmap.delete(tname)
    if tmap.length == 0:
        TIMERS.delete(elem)


def store_timer(elem, tname, timer):
    '''Stores tname=timer in the storage for the given element'''
    _tstore(elem).set(tname, timer)


def get_timers(elem, tname):
    '''Retrieves an array of timers on the given element, optionally filtered by name'''
    tlist= []
    tmap = _tstore(elem)
    for key in tmap.js_keys():
        if tname is None or tname is js_undefined or tname == key:
            tlist.append(tmap.js_get(key))
    return tlist
    
    
def get_timer(elem, tname):
    '''Retrieves the timer keyed with tname on the given element, or None if not present'''
    timer = _tstore(elem).js_get(tname)
    return timer if timer is not js_undefined else None
    
    

