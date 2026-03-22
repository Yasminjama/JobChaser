// SignInPage 
// inloggningsformulär för befintliga användare med validering
import { useForm } from 'react-hook-form';

// Interface för formulärdata
interface SignInFormData {
  email: string;
  password: string;
}

function SignInPage() {
  // React Hook Form setup
  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>();
  
  // Körs när formuläret skickas (efter validering)
  const onSubmit = (data: SignInFormData) => {
    console.log('Inloggningsdata:', data);
    alert(`Välkommen tillbaka! (Detta är bara en demo)`);
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
      </form>
    </div>
  );
}

export default SignInPage;