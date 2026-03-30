// SignInPage 
// Inloggningsformulär för befintliga användare med validering
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { SignInFormData } from '../types/types';
import { useAuthStore } from '../stores/authStore';


function SignInPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); //Hämtar login action från authStore. 

  // react Hook Form setup
  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>();
  
  // detta körs när formuläret skickas och skickar data till backend
  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
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

      // Spara token och användardata i authStore så att resten av appen vet att vi är inloggade
      login(result.user, result.token); // Bytte ut localStorage mot authStore. 
      navigate('/'); // Navigera till startsidan efter inloggning
    } catch (error) {
      console.error('Signin error:', error);
      alert('Kunde inte ansluta till servern');
    }
  };
  
  return (
    <div className="app-container">
      <h1>Logga in</h1>
      
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        
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
            placeholder="Ditt lösenord"
            {...register('password', { 
              required: 'Lösenord är obligatoriskt'
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
        
        <button type="submit">Logga in</button>
        
        {/* Länk till registreringssidan */}
        <br />
        <br />
        <p>
          Har du inget konto? <a href="/signup">Registrera dig här</a>
        </p>
      </form>
    </div>
  );
}

export default SignInPage;