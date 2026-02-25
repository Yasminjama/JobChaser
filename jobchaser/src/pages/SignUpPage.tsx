// SignUpPage - Registreringsformulär för nya användare
function SignUpPage() {
  return (
    <div className="app-container">
      <h1>Skapa konto</h1>
      <p>Registreringsformulär kommer här (React Hook Form senare)</p>
      
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Namn</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Ditt namn" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">E-post</label>
          <input 
            type="email" 
            id="email" 
            placeholder="din@email.com" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Lösenord</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Minst 8 tecken" 
          />
        </div>
        
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
}

export default SignUpPage;
