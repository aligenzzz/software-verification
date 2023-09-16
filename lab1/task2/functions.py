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


# counting age characteristics
def get_ages(people):
    ages = [person.age for person in people]

    min_age = min(ages)
    max_age = max(ages)
    aver_age = round(sum(ages) / len(ages), 2)

    return min_age, max_age, aver_age
