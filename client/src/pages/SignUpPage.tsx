// SignUpPage - Registreringsformulär för nya användare med validering
import { useForm } from 'react-hook-form';

// Interface för formulärdata
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

function SignUpPage() {
  // React Hook Form setup
  const { 
    register,           // Registrera inputs
    handleSubmit,       // Hantera submit
    formState: { errors } // Valideringsfel
  } = useForm<SignUpFormData>();
  
  // Körs när formuläret skickas (efter validering)
  const onSubmit = (data: SignUpFormData) => {
    console.log('Registreringsdata:', data);
    alert(`Välkommen ${data.name}!`);
  };
  
  return (
    <div className="app-container">
      <h1>Skapa konto</h1>
      
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Namn */}
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
      </form>
    </div>
  );
}

export default SignUpPage;