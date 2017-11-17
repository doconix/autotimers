#!/usr/bin/env python3
import os, shutil, glob, sys, subprocess, re
from os.path import join as j

VERSION = "2.0.12"
SROOT = 'src'
DROOT = 'dist'
DEMOROOT = 'demo'
TROOT = 'tests'

def main():
    # update the version number
    log('Set version to {}'.format(VERSION))
    with open('package.json', 'r') as fin:
        content = fin.readlines()
    with open('package.json', 'w') as fout:
        for line in content:
            line = re.sub('"version": "\d+\.\d+\.\d+"', '"version": "{}"'.format(VERSION), line)
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
        run('transcrypt --build --esv=6 --parent=.none {}'.format(src))
    shutil.copy(j(SROOT, '__javascript__', 'main.min.js'), j(DROOT, 'autotimers.min.js'))
    shutil.copy(j(SROOT, '__javascript__', 'main.js'), j(DROOT, 'autotimers.js'))
    shutil.copy(j(SROOT, '__javascript__', 'main.min.js'), j(DEMOROOT, 'autotimers.min.js'))
    shutil.copy(j(SROOT, '__javascript__', 'main.js'), j(DEMOROOT, 'autotimers.js'))

    # transpile tests/
    log('Transpile tests/ scripts')
    if os.path.exists(j(TROOT, '__javascript__')):
        shutil.rmtree(j(TROOT, '__javascript__'))
    for src in glob.glob(j(TROOT, '*.py')):
        run('transcrypt --build --map --nomin --esv=6 --parent=.none {}'.format(src))
    
    # publish to npm
    log()
    if input('Upload to npm?  (y/n)  ').lower()[0:1] == 'y':
        run('npm publish'.format(src))
        


#########################
###  Helper functions

def log(msg=''):
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