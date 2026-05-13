import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Inter:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }

  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .login-card {
    background: white;
    border-radius: 16px;
    padding: 48px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 10px 40px rgba(0, 102, 204, 0.15);
  }

  .login-header {
    margin-bottom: 32px;
    text-align: center;
  }

  .login-header h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    color: #0066cc;
    line-height: 1.1;
    margin-bottom: 8px;
    font-weight: 700;
  }

  .login-header p {
    color: #777;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #0066cc;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .form-input {
    width: 100%;
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    color: #1a1a1a;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 400;
    padding: 12px 16px;
    outline: none;
    transition: all 0.3s;
  }

  .form-input:focus {
    border-color: #0066cc;
    background: white;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  .form-input::placeholder { color: #aaa; }

  .btn-primary {
    width: 100%;
    background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0, 102, 204, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 102, 204, 0.4);
  }

  .btn-primary:active { transform: translateY(0); }

  .btn-primary:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }

  .error-message {
    background: #fff5f5;
    border-left: 4px solid #ff6b6b;
    border-radius: 8px;
    color: #d63031;
    padding: 14px 16px;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }

  .success-message {
    background: #f1f9ff;
    border-left: 4px solid #0066cc;
    border-radius: 8px;
    color: #0052a3;
    padding: 14px 16px;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }

  .toggle-auth {
    text-align: center;
    margin-top: 24px;
    font-size: 0.9rem;
    color: #666;
  }

  .toggle-auth button {
    background: none;
    border: none;
    color: #0066cc;
    cursor: pointer;
    text-decoration: underline;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .toggle-auth button:hover { color: #0052a3; }

  .back-link {
    display: inline-block;
    margin-bottom: 24px;
    color: #0066cc;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .back-link:hover { color: #0052a3; }
`;

function Login() {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let result;
      if (isRegister) {
        if (!name || !email || !password || !confirmPassword) {
          setError("Please fill all fields");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        result = await register(name, email, password, confirmPassword);
      } else {
        if (!email || !password) {
          setError("Please fill all fields");
          setLoading(false);
          return;
        }
        result = await login(email, password);
      }

      if (result.success) {
        setSuccess(result.message);
        setEmail("");
        setPassword("");
        setName("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/blog");
        }, 1000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-container">
        <div className="login-card">
          <Link to="/" className="back-link">← Back to Home</Link>
          
          <div className="login-header">
            <h1>{isRegister ? "Create Account" : "Welcome Back"}</h1>
            <p>{isRegister ? "Join The Journal community" : "Sign in to your account"}</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isRegister && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Loading..." : isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="toggle-auth">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => { setIsRegister(!isRegister); setError(""); setSuccess(""); }}>
              {isRegister ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
