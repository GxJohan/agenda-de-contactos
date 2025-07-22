import React, { useState } from 'react'
import { Contact } from '../types/Contact.tsx'

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id'>) => void
  editingContact: Contact | null
  onUpdate: (contact: Contact) => void
  onCancelEdit: () => void
  
}

function ContactForm({ onSubmit, editingContact, onUpdate, onCancelEdit }: ContactFormProps) {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  React.useEffect(() => {
    if (editingContact) {
      setName(editingContact.name)
      setLastName(editingContact.lastName)
      setPhone(editingContact.phone)
    } else {
      setName('')
      setLastName('')
      setPhone('')
    }
  }, [editingContact])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !lastName.trim() || !phone.trim()) {
      alert('Por favor complete todos los campos')
      return
    }
    if (editingContact) {
      onUpdate({ ...editingContact, name: name.trim(), lastName: lastName.trim(), phone: phone.trim() })
    } else {
      onSubmit({ name: name.trim(), lastName: lastName.trim(), phone: phone.trim() })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingrese el nombre"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Ingrese el apellido"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ingrese el teléfono"
        />
      </div>
      <div className="form-actions">
        <button type="submit">
          {editingContact ? 'Actualizar' : 'Agregar'}
        </button>
        {editingContact && (
          <button type="button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default ContactForm