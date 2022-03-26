import os
from shutil import copyfile, copytree, rmtree

from builder.game import build_game_page
from builder.utility.export import export_game_page


if __name__ == "__main__":
    print("\n")

    print("Starting build script for Vocable")

    # Check for build folder
    if not os.path.exists('build'):
        print('[*] Creating build folder')
        os.mkdir('build')
    else: # Clear build folder
        print('[*] Clearing build folder')
        rmtree('build')
        os.mkdir('build')

    # Index files
    print('[*] Creating wordlist')
    paths = []
    for elements, subdirs, files in os.walk('data\wordlists'):
        for name in files:
            paths.append(os.path.join(elements, name))

    # Get wordlist
    files = []
    for path in paths:
        elements = path.split('\\')
        file = {
            'name': elements[-1],
            'year': elements[-2][-1],
            'level': elements[-2][0:-1],
            'method': elements[-3],
            'language': elements[-4],
            'path': path.replace('\\', '/')
        }
        files.append(file)

    for file in files:
        html = build_game_page(file)
        export_game_page(file, html)

    # Copy static files
    print('[*] Copying static files')
    copytree('app/css', 'build/static/css')
    copytree('app/js', 'build/static/js')
    copyfile('app/config.js', 'build/static/config.js')