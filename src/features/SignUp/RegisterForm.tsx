'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui'
import RegisterFormFields from './RegisterFormFields'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      name: formData.name ? '' : 'Введите имя',
      email: formData.email.includes('@') ? '' : 'Некорректный email',
      password: formData.password.length >= 6 ? '' : 'Минимум 6 символов',
      confirmPassword: formData.password === formData.confirmPassword ? '' : 'Пароли не совпадают'
    }
    
    setErrors(newErrors)
    
    if (Object.values(newErrors).some(error => error)) {
      return
    }
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        alert('Успешная регистрация!')
      }
    } catch {
      alert('Ошибка при регистрации')
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RegisterFormFields
        formData={formData}
        errors={errors}
        onChange={updateField}
      />
      
      <Button 
        type="submit" 
        className="w-full mt-6"
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}