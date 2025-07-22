import { useEffect, useState } from "react"

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme) {
      setIsDarkMode(currentTheme === 'dark')
    }
  }, [])
  const handleToggle = () => {
    console.log('Cambiar tema');
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    if (newMode) {
      document.body.classList.add('dark')
       localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }



  }

  return (
    <button onClick={handleToggle} className="theme-toggle">
      Tema
    </button>
  )
}

export default ThemeToggle