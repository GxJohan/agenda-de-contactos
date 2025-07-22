import { useEffect, useState } from 'react';
import { Contact } from '../types/Contact';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id'>) => void;
  editingContact: Contact | null;
  onUpdate: (contact: Contact) => void;
  onCancelEdit: () => void;
}

function ContactForm({ onSubmit, editingContact, onUpdate, onCancelEdit }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
      setApellido(editingContact.apellido);
      setEmail(editingContact.email);
    } else {
      setName('');
      setPhone('');
      setApellido('');
      setEmail('');
    }
  }, [editingContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }

    const newContact = {
      name: name.trim(),
      phone: phone.trim(),
      apellido: apellido.trim(),
      email: email.trim(),
    };

    if (editingContact) {
      onUpdate({ ...editingContact, ...newContact });
    } else {
      onSubmit(newContact);
    }

    setName('');
    setPhone('');
    setApellido('');
    setEmail('');
  };

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
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Ingrese el apellido"
        /> 
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese el email"
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
  );
}

export default ContactForm;
