from functions import get_arguments, download

if __name__ == "__main__":
    args = get_arguments()

    url = args[0]
    directory = args[1]

    download(url, directory)
