import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { API_BASE_URL } from './config';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Inter:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }

  .blog-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 24px 100px;
  }

  .blog-header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(0, 102, 204, 0.1);
  }

  .blog-logo {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #0066cc;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .user-info {
    color: #666;
    font-size: 0.95rem;
  }

  .user-info strong {
    color: #0066cc;
    font-weight: 600;
  }

  .logout-btn {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.3s;
  }

  .logout-btn:hover {
    background: #ff5252;
    transform: translateY(-2px);
  }

  .blog-header {
    margin-bottom: 40px;
  }

  .blog-header h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 2.8rem;
    color: #0066cc;
    line-height: 1.1;
    margin-bottom: 8px;
    font-weight: 700;
  }

  .blog-header p {
    color: #777;
    font-size: 1rem;
    font-weight: 300;
  }

  /* Form */
  .form-card {
    background: white;
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 40px;
    box-shadow: 0 4px 15px rgba(0, 102, 204, 0.1);
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
    margin-bottom: 20px;
  }

  .form-input:focus {
    border-color: #0066cc;
    background: white;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  .form-input::placeholder { color: #aaa; }

  textarea.form-input {
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px 20px;
    transition: all 0.3s;
  }

  .btn-primary {
    background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 102, 204, 0.4);
  }

  .btn-ghost {
    background: transparent;
    color: #0066cc;
    border: 2px solid #0066cc;
  }

  .btn-ghost:hover { background: #f0f5ff; }

  .btn-danger {
    background: #ff6b6b;
    color: white;
    font-size: 0.8rem;
  }

  .btn-danger:hover { background: #ff5252; }

  .btn-edit {
    background: #4dabf7;
    color: white;
    font-size: 0.8rem;
  }

  .btn-edit:hover { background: #339af0; }

  .form-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 4px;
  }

  .editing-badge {
    font-size: 0.75rem;
    color: #ff922b;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
  }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 40px 0;
  }

  .divider-line { flex: 1; height: 2px; background: rgba(0, 102, 204, 0.1); }

  .divider-text {
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #0066cc;
    font-weight: 600;
  }

  /* Blog list */
  .blog-list { display: flex; flex-direction: column; gap: 16px; }

  .blog-card {
    background: white;
    border-radius: 12px;
    padding: 28px;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 102, 204, 0.08);
  }

  .blog-card:hover {
    box-shadow: 0 8px 24px rgba(0, 102, 204, 0.15);
    transform: translateY(-2px);
  }

  .blog-card.editing-card {
    border: 2px solid #0066cc;
  }

  .blog-card-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
  }

  .blog-content { flex: 1; min-width: 0; }

  .blog-index {
    font-family: 'Poppins', sans-serif;
    font-style: italic;
    font-size: 0.8rem;
    color: #4dabf7;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .blog-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem;
    color: #0066cc;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 12px;
  }

  .blog-body {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.7;
    font-weight: 400;
    white-space: pre-wrap;
  }

  .blog-body.preview {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    z-index: 1000;
  }

  .modal-card {
    background: white;
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    padding: 28px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    animation: fadeIn 180ms ease;
  }

  .modal-card h2 {
    margin-bottom: 16px;
    color: #0066cc;
    font-size: 1.5rem;
  }

  .modal-card p {
    color: #444;
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .modal-close {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    border-radius: 10px;
    border: none;
    background: #0066cc;
    color: white;
    cursor: pointer;
    font-weight: 600;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .empty-state {
    text-align: center;
    padding: 80px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .empty-state p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem;
    color: #0066cc;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .empty-state span {
    display: block;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #999;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .blog-wrapper { padding: 24px 16px; }
    .blog-header h1 { font-size: 2rem; }
    .blog-card-inner { flex-direction: column; }
    .blog-actions { flex-direction: row; }
  }
`;

function Blog() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const getUserId = (entity) => {
    if (!entity) return null;
    return String(entity._id || entity.id || entity);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const loadBlogs = () => {
    axios.get(`${API_BASE_URL}/api/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Failed to load blogs:", err));
  };

  useEffect(() => { loadBlogs(); }, []);

  const clearForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    if (editingId) {
      axios.put(`${API_BASE_URL}/api/blogs/${editingId}`, { title, content }, config)
        .then(() => { loadBlogs(); clearForm(); })
        .catch(err => console.error("Update failed:", err));
    } else {
      axios.post(`${API_BASE_URL}/api/blogs`, { title, content }, config)
        .then(() => { loadBlogs(); clearForm(); })
        .catch(err => console.error("Create failed:", err));
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlog = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.delete(`${API_BASE_URL}/api/blogs/${id}`, config)
      .then(() => { loadBlogs(); if (editingId === id) clearForm(); })
      .catch(err => console.error("Delete failed:", err));
  };

  const viewFullBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const closeFullBlog = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="blog-wrapper">

        <div className="blog-header-nav">
          <div className="blog-logo">✍️ The Journal</div>
          {user && (
            <div className="user-section">
              <div className="user-info">
                Welcome, <strong>{user.name}</strong>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="blog-header">
          <h1>Your Entries</h1>
          <p>Write your thoughts, edit anytime</p>
        </div>

        {/* Form */}
        <div className="form-card">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            placeholder="What's on your mind?"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <label className="form-label">Content</label>
          <textarea
            className="form-input"
            placeholder="Write something worth remembering..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editingId ? "Update Entry" : "Publish Entry"}
            </button>

            {editingId && (
              <>
                <button className="btn btn-ghost" onClick={clearForm}>
                  Cancel
                </button>
                <span className="editing-badge">● Editing</span>
              </>
            )}
          </div>
        </div>

        {/* List */}
        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">
            {blogs.length} {blogs.length === 1 ? "Entry" : "Entries"}
          </span>
          <div className="divider-line" />
        </div>

        {blogs.length === 0 ? (
          <div className="empty-state">
            <p>No entries yet.</p>
            <span>Begin writing above</span>
          </div>
        ) : (
          <div className="blog-list">
            {blogs.map((b, i) => (
              <div
                key={b._id}
                className={`blog-card${editingId === b._id ? " editing-card" : ""}`}
              >
                <div className="blog-card-inner">
                  <div className="blog-content">
                    <div className="blog-index">No. {String(i + 1).padStart(2, "0")}</div>
                    <div className="blog-title">{b.title}</div>
                    <div className={`blog-body ${getUserId(b.author) === getUserId(user) ? "" : "preview"}`}>
                      {b.content}
                    </div>
                  </div>
                  <div className="blog-actions">
                    {getUserId(b.author) === getUserId(user) ? (
                      <>
                        <button className="btn btn-edit" onClick={() => startEdit(b)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteBlog(b._id)}>
                          Delete
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-ghost" onClick={() => viewFullBlog(b)}>
                        View Full Entry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedBlog && (
          <div className="modal-backdrop" onClick={closeFullBlog}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedBlog.title}</h2>
              <p>{selectedBlog.content}</p>
              <button className="modal-close" onClick={closeFullBlog}>Close</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Blog;