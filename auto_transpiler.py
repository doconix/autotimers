#!/usr/bin/env python3
import glob, os, sys, subprocess, time, shutil


WATCHERS = [
    ( 'src/*.py', 'transcrypt --map --build --nomin --esv=6 --parent=.none src/main.py' ),
    ( 'tests/*.py', 'transcrypt --map --build --nomin --esv=6 --parent=.none tests/run_tests.py' ),
    ( 'tests/*.py', 'transcrypt --map --build --nomin --esv=6 --parent=.none tests/dev.py' ),
]

if os.path.exists('src/__javascript__'):
    shutil.rmtree('src/__javascript__')
if os.path.exists('tests/__javascript__'):
    shutil.rmtree('tests/__javascript__')


class GlobWatcher(object):
    def __init__(self, pattern, cmd):
        self.pattern = pattern
        self.cmd = cmd
        self.files ={}
        print('Watching {}'.format(self.pattern))
        
    def check(self):
        for fn in glob.glob(self.pattern):
            last_mtime = self.files.get(fn, 0)
            cur_mtime = os.stat(fn).st_mtime
            if last_mtime < cur_mtime:
                cmd = self.cmd.format(filename=fn)
                print(cmd)
                ret = subprocess.run(cmd, shell=True)
                self.files[fn] = cur_mtime


if __name__ == '__main__':
    watchers = [ GlobWatcher(p, c) for p, c in WATCHERS ]
    while True:
        for watcher in watchers:
            watcher.check()
        time.sleep(2)
            