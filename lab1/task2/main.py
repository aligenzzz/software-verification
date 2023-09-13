from functions import check_name, check_age

class Person:
    def __init__(self, last_name, first_name, age):
        self.last_name = last_name
        self.first_name = first_name
        self.age = age


people = []


if __name__ == '__main__':
    while True:
        first_name = check_name(input('Enter the first name: '))
        last_name = check_name(input('Enter the last name: '))
        age = check_age(input('Enter the age: '))

        people.append(Person(last_name, first_name, age))

        choice = input('q(quit)? ')
        if choice == 'q':
            break



