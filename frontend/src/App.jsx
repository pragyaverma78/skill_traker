import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

const initialForm = {
  name: "",
  category: "Frontend",
  progress: 0,
  status: "Learning",
};

function App() {
  const [skills, setSkills] = useState([]);
  const [stats, setStats] = useState({
    total_skills: 0,
    average_progress: 0,
    completed: 0,
  });
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setError("");
      const [skillsRes, statsRes] = await Promise.all([
        fetch(`${API}/skills`),
        fetch(`${API}/stats`),
      ]);

      if (!skillsRes.ok || !statsRes.ok) {
        throw new Error("Could not connect to backend");
      }

      setSkills(await skillsRes.json());
      setStats(await statsRes.json());
    } catch {
      setError("Backend is not running. Start FastAPI first.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "progress" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Could not add skill");
      }

      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteSkill(id) {
    try {
      const response = await fetch(`${API}/skills/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Could not delete skill");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page">
      <section className="container">
        <header className="hero">
          <div>
            <p className="eyebrow">FULL-STACK MINI PROJECT</p>
            <h1>SkillTrack</h1>
            <p className="subtitle">
              Track what you are learning, your progress, and what you have completed.
            </p>
          </div>
          <div className="hero-badge">React + FastAPI</div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <span>Total Skills</span>
            <strong>{stats.total_skills}</strong>
          </div>
          <div className="stat-card">
            <span>Average Progress</span>
            <strong>{stats.average_progress}%</strong>
          </div>
          <div className="stat-card">
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
        </section>

        {error && <div className="error">{error}</div>}

        <section className="grid">
          <form className="card form-card" onSubmit={handleSubmit}>
            <h2>Add a Skill</h2>
            <p className="muted">Record something you are currently learning.</p>

            <label>
              Skill name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Python"
                required
              />
            </label>

            <label>
              Category
              <select name="category" value={form.category} onChange={handleChange}>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Database</option>
                <option>Programming</option>
                <option>Tools</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Progress: {form.progress}%
              <input
                type="range"
                name="progress"
                min="0"
                max="100"
                value={form.progress}
                onChange={handleChange}
              />
            </label>

            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Learning</option>
                <option>Practicing</option>
                <option>Completed</option>
              </select>
            </label>

            <button disabled={loading}>
              {loading ? "Adding..." : "Add Skill"}
            </button>
          </form>

          <section className="card list-card">
            <div className="section-heading">
              <div>
                <h2>My Skills</h2>
                <p className="muted">Your current learning dashboard.</p>
              </div>
              <button className="refresh" onClick={loadData}>Refresh</button>
            </div>

            <div className="skills">
              {skills.map((skill) => (
                <article className="skill" key={skill.id}>
                  <div className="skill-top">
                    <div>
                      <h3>{skill.name}</h3>
                      <p>{skill.category} · {skill.status}</p>
                    </div>
                    <button
                      className="delete"
                      onClick={() => deleteSkill(skill.id)}
                      aria-label={`Delete ${skill.name}`}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="progress-row">
                    <div className="progress">
                      <span style={{ width: `${skill.progress}%` }} />
                    </div>
                    <strong>{skill.progress}%</strong>
                  </div>
                </article>
              ))}

              {!skills.length && (
                <p className="empty">No skills yet. Add your first skill.</p>
              )}
            </div>
          </section>
        </section>

        <footer>
          Built as a React + FastAPI learning project.
        </footer>
      </section>
    </main>
  );
}

export default App;
