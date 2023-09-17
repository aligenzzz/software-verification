import os
import sys
import re


# main function which finds all files with extension
def get_files(directory, extension):
    result = []

    # go through all the files and look for the right ones
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(extension):
                result.append(os.path.join(root, file))

    return result


# get arguments with checking if they are valid
def get_arguments():
    if len(sys.argv) != 3:
        print('You need write like this:\n'
              'py main.py <directory> <extension>')
        exit(-1)

    check_directory(sys.argv[1])
    check_extension(sys.argv[2])

    return sys.argv[1], sys.argv[2]


# check if directory is valid
def check_directory(directory):
    try:
        if not os.path.isdir(directory):
            raise ValueError('Invalid format!')
        if not os.path.exists(directory):
            raise ValueError(f'{directory} does not exist')
    except ValueError as e:
        print(f'Error: {e}')
        exit(-1)


# check if extension is valid, valid format is .cpp, .py, .txt etc.
def check_extension(extension):
    try:
        if not re.match(r'^\..+', extension):
            raise ValueError('Invalid format!')
    except ValueError as e:
        print(f'Error: {e}')
        exit(-1)

