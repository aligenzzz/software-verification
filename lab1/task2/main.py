from functions import check_name, check_age


class Person:
    def __init__(self, lastname, firstname, age_):
        self.last_name = lastname
        self.first_name = firstname
        self.age = age_


people = []


if __name__ == '__main__':
    # input of data with checking it
    while True:
        first_name = check_name(input('Enter the first name: '))
        last_name = check_name(input('Enter the last name: '))
        age = check_age(input('Enter the age: '))

        people.append(Person(last_name, first_name, age))

        choice = input('q(quit)? ')
        if choice == 'q':
            break

    # output the list in the required format
    formatted_people = '\n'.join(f'{person.last_name} {person.first_name} {person.age}'
                                 for person in people)
    print('\n' + formatted_people)

    # counting characteristics
    ages = [person.age for person in people]
    min_age = min(ages)
    max_age = max(ages)
    aver_age = round(sum(ages) / len(ages), 2)
    print(f'\n'
          f'minimum age = {min_age}\n'
          f'maximum age = {max_age}\n'
          f'average age = {aver_age}')



