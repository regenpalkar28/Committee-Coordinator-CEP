export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <h2 className="section-title">About Us</h2>
        <p className="section-subtitle">
          A platform designed to bring complete financial transparency to college committee operations
        </p>
        <div className="about-grid">
          <div className="about-card">
            <h3>
              <span>&#128200;</span>
              Financial Tracking
            </h3>
            <p>
              Monitor all committee expenses, income, and budget allocations in real-time. 
              Every transaction is logged and visible to authorized members, ensuring complete accountability.
            </p>
          </div>
          <div className="about-card">
            <h3>
              <span>&#128274;</span>
              Secure & Reliable
            </h3>
            <p>
              Your committee&apos;s financial data is protected with enterprise-grade security. 
              Role-based access ensures the right people see the right information.
            </p>
          </div>
          <div className="about-card">
            <h3>
              <span>&#128203;</span>
              Easy Reporting
            </h3>
            <p>
              Generate comprehensive financial reports with a single click. 
              Shareable dashboards make it simple to present findings to faculty and stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
