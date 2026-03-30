// SignUpPage 
// Registreringsformulär för nya användare med validering
// SignUpPage 
// Registreringsformulär för nya användare med validering
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { SignUpFormData } from '../types/types';

function SignUpPage() {
  const navigate = useNavigate();

  // React Hook Form setup
  const { 
    register,           // Registrera inputs
    handleSubmit,       // Hantera submit
    formState: { errors } // Valideringsfel
  } = useForm<SignUpFormData>();
  
  // detta körs när formuläret skickas och skickar data till backend
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || 'Något gick fel');
        return;
      }

      alert(`Välkommen ${data.name}! Ditt konto har skapats.`);
      navigate('/signin'); // navigera till signin efter registrering
    } catch (error) {
      console.error('Signup error:', error);
      alert('Kunde inte ansluta till servern');
    }
  };
  
  return (
    <div className="app-container">
      <h1>Skapa konto</h1>
      
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* namn */}
        <div className="form-group">
          <label htmlFor="name">Namn</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Ditt namn"
            {...register('name', { 
              required: 'Namn är obligatoriskt',
              minLength: {
                value: 2,
                message: 'Namn måste vara minst 2 tecken'
              }
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        
        {/* E-post */}
        <div className="form-group">
          <label htmlFor="email">E-post</label>
          <input 
            type="email" 
            id="email" 
            placeholder="din@email.com"
            {...register('email', { 
              required: 'E-post är obligatoriskt',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ogiltig e-postadress'
              }
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        
        {/* Lösenord */}
        <div className="form-group">
          <label htmlFor="password">Lösenord</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Minst 8 tecken"
            {...register('password', { 
              required: 'Lösenord är obligatoriskt',
              minLength: {
                value: 8,
                message: 'Lösenord måste vara minst 8 tecken'
              }
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
        
        <button type="submit">Registrera</button>
        <br />
        <br />
        {/* Länk till inloggningssidan */}
        <p>
          Har du redan ett konto? <a href="/signin">Logga in här</a>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;