import os
from shutil import copyfile, copytree, rmtree

from builder.game import game as build_game
from builder.table import table as build_table
from builder.utility.export import game as export_game_page, table as export_table_page


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
            'name': elements[-1].split('.')[0],
            'year': elements[-3][-1],
            'level': elements[-3][0:-1],
            'direction': elements[-2],
            'method': elements[-4],
            'language': elements[-5],
            'path': path.replace('\\', '/'),
            'full_name': elements[-4] + ' ' + elements[-3] + ' ' + elements[-2] + ' ' + elements[-1].split('.')[0]
        }
        files.append(file)

    for file in files:
        game_html = build_game(file)
        export_game_page(file, game_html)
        table_html = build_table(file)
        export_table_page(file, table_html)

    

    # Copy static files
    print('[*] Copying static files')
    copytree('app/js', 'build/static/js')
    copyfile('app/config.js', 'build/static/config.js')