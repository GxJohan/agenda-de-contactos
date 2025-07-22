// Si no puede visualizar los cambio en la rama exfi es porque me confundi y lo hice en la rama main mis disculpas
import React, { useState } from 'react'
import { Contact } from './types/Contact.tsx'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import './App.css'


function getInitialTheme() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  }
  return 'light'
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme())

  React.useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString()
    }
    setContacts([...contacts, newContact])
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact: Contact) => contact.id !== id))
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setSearchTerm('') 
  }

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(contacts.map((c) => c.id === updatedContact.id ? updatedContact : c))
    setEditingContact(null)
  }

  const filteredContacts = contacts.filter(contact => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.lastName.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term)
    );
    
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Agenda de Contactos</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <h2>Agregar Contacto</h2>
          <ContactForm 
            onSubmit={handleAddContact}
            editingContact={editingContact}
            onUpdate={handleUpdateContact}
            onCancelEdit={() => setEditingContact(null)}
          />
        </section>

        <section className="contacts-section">
          <h2>Lista de Contactos</h2>
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <ContactList 
            contacts={filteredContacts}
            onDelete={handleDeleteContact}
            onEdit={handleEditContact}
          />
        </section>
      </main>
    </div>
  )
}

export default App
