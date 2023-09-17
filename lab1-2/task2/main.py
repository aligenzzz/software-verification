from functions import check_name, check_age, get_ages
from person import Person


if __name__ == '__main__':
    people = []

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

    # getting age characteristics
    ages = get_ages(people)
    print(f'\n'
          f'minimum age = {ages[0]}\n'
          f'maximum age = {ages[1]}\n'
          f'average age = {ages[2]}')
