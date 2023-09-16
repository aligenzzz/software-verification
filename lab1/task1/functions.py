from random import randint


def get_string():
    # random number of exclamation marks
    n = randint(5, 50)

    return 'Hello, world!\n' \
           'Andhiagain!\n' \
        + '!' * n
