const features = [
  {
    icon: '\u{1F6A1}',
    title: 'Build Trust',
    description: 'When every member can see where funds come from and where they go, trust within the committee and with the broader college community grows naturally.'
  },
  {
    icon: '\u{2705}',
    title: 'Prevent Misuse',
    description: 'Complete visibility into financial records discourages improper use of funds and makes any irregularities immediately apparent.'
  },
  {
    icon: '\u{1F4CA}',
    title: 'Smart Decisions',
    description: 'Clear financial data helps committees make informed decisions about budgeting and resource allocation for future events and activities.'
  },
  {
    icon: '\u{1F4DD}',
    title: 'Audit Ready',
    description: 'Maintain organized, chronological records of all transactions. Be prepared for any financial audits or reviews with minimal effort.'
  },
  {
    icon: '\u{1F465}',
    title: 'Inclusive Transparency',
    description: 'Every committee member, regardless of their position, can access relevant financial information. Transparency should not be a privilege.'
  },
  {
    icon: '\u{9881}',
    title: 'Streamlined Operations',
    description: 'Replace scattered spreadsheets and paper receipts with a unified system. Save time and reduce errors in financial management.'
  }
]

export default function Why() {
  return (
    <section id="why" className="why">
      <div className="why-content">
        <h2 className="section-title">Why We Exist</h2>
        <p className="section-subtitle">
          College committees handle significant funds for events, activities, and initiatives. 
          Without proper tracking, trust erodes and questions arise.
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
