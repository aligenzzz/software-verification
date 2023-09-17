from functions import get_arguments, get_square

if __name__ == '__main__':
    args = get_arguments()

    length = args[0]
    width = args[1]

    S = get_square(length, width)
    print(f'S = {S}')
    