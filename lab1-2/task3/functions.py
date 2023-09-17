import sys


def check_number(number):
    try:
        number = float(number)
        if number > 0:
            return number
        else:
            raise ValueError('Invalid format!')
    except ValueError as e:
        print(f'Error: {e}')
        exit(-1)


# get arguments with checking if they are valid
def get_arguments():
    if len(sys.argv) != 3:
        print('You need write like this:\n'
              'py main.py <length> <width>')
        exit(-1)

    a = check_number(sys.argv[1])
    b = check_number(sys.argv[2])

    return a, b


def get_square(length, width):
    return length * width

