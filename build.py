#!/usr/bin/env python3
import os, shutil, glob, sys, subprocess, re
from os.path import join as j

# git commit -am 'message'
# git push origin master
# git tag 2.0.1
# git push origin --tags

VERSION = "2.0.4"
SROOT = 'src'
DROOT = 'dist'
DEMOROOT = 'demo'
TROOT = 'tests'

def main():
    # update the version number
    log('Set version to {}'.format(VERSION))
    with open(j(SROOT, 'plugin.py'), 'r') as fin:
        content = fin.readlines()
    with open(j(SROOT, 'plugin.py'), 'w') as fout:
        for line in content:
            line = re.sub('Version: \d+\.\d+\.\d+', 'Version: {}'.format(VERSION), line)
            line = re.sub('S.fn.timers.VERSION = "\d+\.\d+\.\d+"', 'S.fn.timers.VERSION = "{}"'.format(VERSION), line)
            fout.write(line)

    # dist folder
    log('Initialize {} folder'.format(DROOT))
    if not os.path.exists(DROOT):
        os.mkdir(DROOT)

    # transpile src/
    log('Transpile src/ scripts')
    if os.path.exists(j(SROOT, '__javascript__')):
        shutil.rmtree(j(SROOT, '__javascript__'))
    for src in glob.glob(j(SROOT, '*.py')):
        run('transcrypt --build --esv 6 {}'.format(src))
    shutil.copy(j(SROOT, '__javascript__', 'plugin.min.js'), j(DROOT, 'jquery.timers.min.js'))
    shutil.copy(j(SROOT, '__javascript__', 'plugin.js'), j(DROOT, 'jquery.timers.js'))
    shutil.copy(j(SROOT, '__javascript__', 'plugin.min.js'), j(DEMOROOT, 'jquery.timers.min.js'))
    shutil.copy(j(SROOT, '__javascript__', 'plugin.js'), j(DEMOROOT, 'jquery.timers.js'))

    # transpile tests/
    log('Transpile tests/ scripts')
    if os.path.exists(j(TROOT, '__javascript__')):
        shutil.rmtree(j(TROOT, '__javascript__'))
    for src in glob.glob(j(TROOT, '*.py')):
        run('transcrypt --build --map --nomin --esv 6 {}'.format(src))
    

#########################
###  Helper functions

def log(msg):
    print()
    print('=== {} ==='.format(msg))

def run(cmd):
    print('\t' + cmd)
    subprocess.run(cmd, shell=True, check=True)
    
def minext(fn):
    filename, ext = os.path.splitext(os.path.split(fn)[1])
    return filename + '.min' + ext



#########################
###  Start the program

if __name__ == '__main__':
    main()