import os
import sys
import requests
import validators
import subprocess


# main function which downloads file by url to local directory
def download(url, directory):
    try:
        # send get-request by url
        response = requests.get(url)

        if response.status_code == 200:
            file_name = os.path.basename(url)
            file_path = os.path.join(directory, file_name)

            # writing in binary mode
            with open(file_path, 'wb') as file:
                file.write(response.content)

            subprocess.Popen(["start", file_path], shell=True)
        else:
            print(f'Error, status code = {response.status_code}')
    except Exception as e:
        print(f'Error: {str(e)}')


# get arguments with checking if they are valid
def get_arguments():
    if len(sys.argv) != 3:
        print('You need write like this:\n'
              'py main.py "<url>" <directory>')
        exit(-1)

    check_url(sys.argv[1])
    check_directory(sys.argv[2])

    return sys.argv[1], sys.argv[2]


# check if url is valid
def check_url(url):
    try:
        if not validators.url(url):
            raise ValueError('Invalid format!')
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
