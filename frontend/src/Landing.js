import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Inter:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
  }

  .landing-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Navigation */
  .nav-bar {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #0066cc;
  }

  .nav-links {
    display: flex;
    gap: 32px;
    align-items: center;
  }

  .nav-link {
    color: #333;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s;
  }

  .nav-link:hover { color: #0066cc; }

  .nav-btn {
    background: #0066cc;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s;
  }

  .nav-btn:hover { background: #0052a3; transform: translateY(-2px); }

  /* Hero Section */
  .hero {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    text-align: center;
  }

  .hero-content {
    max-width: 700px;
  }

  .hero h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .hero-blue {
    color: #0066cc;
  }

  .hero p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.8;
    margin-bottom: 40px;
  }

  .hero-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
    color: white;
    border: none;
    padding: 14px 40px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0, 102, 204, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 102, 204, 0.4);
  }

  .btn-secondary {
    background: white;
    color: #0066cc;
    border: 2px solid #0066cc;
    padding: 12px 38px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-secondary:hover {
    background: #f0f5ff;
    transform: translateY(-3px);
  }

  /* Features Section */
  .features {
    background: white;
    padding: 80px 24px;
  }

  .features-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    color: #1a1a1a;
    margin-bottom: 60px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }

  .feature-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 102, 204, 0.15);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .feature-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #0066cc;
    margin-bottom: 12px;
  }

  .feature-card p {
    color: #666;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  /* Footer */
  .footer {
    background: #1a1a1a;
    color: white;
    text-align: center;
    padding: 30px 24px;
    margin-top: auto;
  }

  .footer p {
    color: #aaa;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .hero h1 { font-size: 2.2rem; }
    .hero p { font-size: 1rem; }
    .nav-links { gap: 16px; }
    .section-title { font-size: 2rem; }
  }
`;

function Landing() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const element = document.getElementById("features");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="landing-wrapper">
        {/* Navigation */}
        <div className="nav-bar">
          <div className="nav-container">
            <div className="nav-logo">✍️ The Journal</div>
            <div className="nav-links">
              <a href="#features" className="nav-link" onClick={scrollToFeatures}>
                Features
              </a>
              {user ? (
                <Link to="/blog" className="nav-btn">
                  Go to Blog
                </Link>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Sign In
                  </Link>
                  <Link to="/login" className="nav-btn">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <h1>
              Express Your <span className="hero-blue">Thoughts</span> Beautifully
            </h1>
            <p>
              A modern, elegant platform to write, share, and manage your personal
              blog. Keep your thoughts organized with a clean, intuitive interface.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate("/login")}>
                Start Writing
              </button>
              <button className="btn-secondary" onClick={scrollToFeatures}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features" id="features">
          <div className="features-container">
            <h2 className="section-title">Why Choose The Journal?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔐</div>
                <h3>Secure & Private</h3>
                <p>
                  Your thoughts are yours alone. With JWT authentication and encrypted
                  passwords, your data stays safe.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h3>Beautiful Design</h3>
                <p>
                  Enjoy writing in a clean, distraction-free environment with an
                  elegant white and blue interface.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>
                  Built with React and Node.js for a smooth, responsive experience
                  across all devices.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Fully Responsive</h3>
                <p>
                  Write and read on any device. Perfectly optimized for mobile, tablet,
                  and desktop.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✏️</div>
                <h3>Easy Editing</h3>
                <p>
                  Edit your posts anytime, delete what you don't need, and organize
                  your thoughts effortlessly.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💾</div>
                <h3>Cloud Storage</h3>
                <p>
                  All your entries are safely stored in the cloud. Access them anytime,
                  anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>&copy; 2026 The Journal. Write your story, beautifully.</p>
        </div>
      </div>
    </>
  );
}

export default Landing;
