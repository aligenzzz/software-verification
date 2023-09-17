import os
import sys
import requests
import validators
import subprocess
import re


# main function which downloads file by url to local directory
def download(url, directory, active):
    try:
        # send get-request by url
        response = requests.get(url)

        if response.status_code == 200:
            file_name = os.path.basename(url)

            # delete all parameters
            file_name = re.sub(r'[?&].+', '', file_name)

            file_path = os.path.join(directory, file_name)

            # writing in binary mode
            with open(file_path, 'wb') as file:
                file.write(response.content)

            if active:
                subprocess.Popen(["start", file_path], shell=True)
        else:
            print(f'Error, status code = {response.status_code}')
            exit(-1)
    except Exception as e:
        print(f'Error: {str(e)}')
        exit(-1)


# get arguments with checking if they are valid
def get_arguments():
    # "url" for &, Windows powershell doesn't process it
    if len(sys.argv) != 3:
        print('You need write like this:\n'
              'py main.py "<url>" <directory>')
        exit(-1)

    url = check_url(sys.argv[1])
    check_directory(sys.argv[2])

    return url, sys.argv[2]


# check if url is valid
def check_url(url):
    try:
        if not url.startswith('"') or not url.endswith('"'):
            raise ValueError('Invalid format!')

        # delete ""
        url_ = url[1: len(url) - 1]

        if not validators.url(url_):
            raise ValueError('Invalid format!')

        return url_
    except ValueError as e:
        print(f'Error: {e}')
        exit(-1)


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
