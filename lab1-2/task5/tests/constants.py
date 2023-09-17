import os

current_directory = os.path.dirname(os.path.abspath(__file__))
project_directory = os.path.abspath(os.path.join(current_directory, '..'))
DIRECTORY = project_directory

EXISTING_EXTENSION = '.py'
NONEXISTING_EXTENSION = '.exe'
