import re


# checking with regex, valid format is Anton, Antonov, etc.
def check_name(name):
    try:
        if re.match(r'^[A-Z][a-z]+', name):
            return str(name)
        else:
            raise ValueError('Invalid format!')
    except ValueError as e:
        print(f'Error: {e}')
        exit(-1)


# checking with regex, valid format is 9, 100 (0-120)
def check_age(age):
    try:
        if re.match(r'^[0-9]+', age) and 0 <= int(age) <= 120:
            return int(age)
        else:
            raise ValueError('Invalid format!')
    except ValueError as e:
        print(f'Error: {e}')
        exit(-1)

