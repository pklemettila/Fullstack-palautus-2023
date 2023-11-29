import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import { useState, useEffect } from 'react'
import Notification from "./components/Notification.jsx";
import personService from "./services/personService.js";

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [isErrorMessage, setIsErrorMessage] = useState(false)


    useEffect(() => {
        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])


    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }
        if (persons.some((person) => person.name === nameObject.name)) {
            if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
                personService.update(persons.find(person => person.name === nameObject.name).id, nameObject)
                    .then(() => {
                        personService.getAll()
                            .then(updatedPersons => {
                                setPersons(updatedPersons)
                                setNotificationMessage(` Edited the number of ${nameObject.name}`)
                                setIsErrorMessage(false)
                                setTimeout(() => {
                                    setNotificationMessage(null)
                                }, 4000)
                            })
                    }).catch(error => {
                    setNotificationMessage(`The information of '${nameObject.name}' was already deleted from server`)
                    setIsErrorMessage(true)
                    setPersons(persons.filter(person => person.name !== nameObject.name))
                })
            }
        } else {
            personService.create(nameObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage(` Added ${nameObject.name}`)
                    setIsErrorMessage(false)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 4000)
                })
        }
    }

    const deletePerson = (id) => {
        const nameToDelete = persons.find(person => person.id === id).name
        if(window.confirm(`Delete ${nameToDelete}?`)) {
            personService.deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    setNotificationMessage(` Deleted ${nameToDelete}`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 4000)
                }).catch(error => {
                setNotificationMessage(`The information of '${nameToDelete}' was already deleted from server`)
                setIsErrorMessage(true)
                setPersons(persons.filter(person => person.id !== id))
            })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)

    }

    const filteredPersons = persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
    )


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} isError={isErrorMessage}/>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <h2>add a new</h2>
            <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} deletePerson={deletePerson}/>
        </div>
    );

}

export default App