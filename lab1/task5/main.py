from functions import get_files, get_arguments

if __name__ == '__main__':
    args = get_arguments()

    directory = args[0]
    extension = args[1]

    files = get_files(directory, extension)

    if not files:
        print('There are not such files.')
    else:
        for file in files:
            print(file)
