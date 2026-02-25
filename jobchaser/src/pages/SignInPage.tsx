// SignInPage - Inloggningsformulär för befintliga användare
function SignInPage() {
  return (
    <div className="app-container">
      <h1>Logga in</h1>
      <p>Inloggningsformulär kommer här (React Hook Form senare)</p>
      
      <form className="auth-form">
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
            placeholder="Ditt lösenord" 
          />
        </div>
        
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}

export default SignInPage;