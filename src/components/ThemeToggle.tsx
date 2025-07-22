// Si no puede visualizar los cambio en la rama exfi es porque me confundi y lo hice en la rama main mis disculpas
interface ThemeToggleProps {
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
  
}

function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <button onClick={handleToggle} className="theme-toggle">
      {theme === 'light' ? '🌞 Claro' : '🌙 Oscuro'}
    </button>
  )
}

export default ThemeToggle