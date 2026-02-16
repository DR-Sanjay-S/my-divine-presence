import jsPDF from 'jspdf';

export const generateResumePdf = () => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = 210;
  const m = 15; // margin
  const cW = pageW - m * 2; // content width
  let y = 18;

  const black: [number, number, number] = [0, 0, 0];
  const darkGray: [number, number, number] = [50, 50, 50];
  const midGray: [number, number, number] = [100, 100, 100];
  const accent: [number, number, number] = [16, 185, 129]; // emerald

  const checkPage = (needed: number) => {
    if (y + needed > 282) { doc.addPage(); y = 15; }
  };

  // --- HEADER ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...black);
  doc.text('Sanjay S', m, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(...accent);
  doc.text('Educator  |  Entrepreneur  |  Technologist', m, y + 8);
  y += 14;

  // Contact row
  doc.setFontSize(8.5);
  doc.setTextColor(...midGray);
  doc.text('+91-9740501114    |    educate.sanjays@gmail.com    |    sanjays@nexcubic.com', m, y);
  y += 4;
  doc.text('linkedin.com/in/sanjay-s-258781240    |    nexcubic.com    |    Bengaluru, India', m, y);
  y += 7;

  // Thick accent line
  doc.setDrawColor(...accent);
  doc.setLineWidth(0.8);
  doc.line(m, y, pageW - m, y);
  y += 7;

  // --- SECTION HELPER ---
  const section = (title: string) => {
    checkPage(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...accent);
    doc.text(title, m, y);
    y += 1.5;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(m, y, pageW - m, y);
    y += 5;
  };

  // --- SUMMARY ---
  section('Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  const summary = 'Passionate educator and tech entrepreneur with expertise in full-stack web development, AI/ML, and digital solutions. Founder of Nexcubic, Assistant Professor in Computer Science, and CA Intermediate aspirant. Conducts AI and Tech seminars helping students and institutions understand real-world applications of Artificial Intelligence, Machine Learning, and Automation. Committed to making technology education practical, engaging, and future-ready.';
  const sLines = doc.splitTextToSize(summary, cW);
  doc.text(sLines, m, y);
  y += sLines.length * 4 + 4;

  // --- SKILLS ---
  section('Skills');
  const skills = [
    ['Languages', 'JavaScript, TypeScript, Python, Java, C, C++, PHP'],
    ['Frontend', 'React.js, Next.js, Tailwind CSS, Bootstrap, HTML5, CSS3, Framer Motion'],
    ['Backend', 'Node.js, Express.js, Django, Flask, REST APIs'],
    ['Databases', 'MongoDB, MySQL, PostgreSQL, Firebase'],
    ['Full Stack', 'MERN Stack, Python Full Stack, Vibe Coding'],
    ['AI & Emerging Tech', 'Artificial Intelligence, Machine Learning, Generative AI, Prompt Engineering'],
    ['Tools & Platforms', 'Git & GitHub, VS Code, Postman, Vercel, Netlify, Figma'],
    ['Other', 'SEO, Digital Marketing, Data Structures, UI/UX Design'],
  ];
  skills.forEach(([label, value]) => {
    checkPage(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...black);
    const labelText = `${label}: `;
    doc.text(labelText, m, y);
    const lW = doc.getTextWidth(labelText);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGray);
    const valLines = doc.splitTextToSize(value, cW - lW);
    doc.text(valLines[0], m + lW, y);
    for (let i = 1; i < valLines.length; i++) {
      y += 3.8;
      doc.text(valLines[i], m + 4, y);
    }
    y += 4.5;
  });
  y += 1;

  // --- EXPERIENCE ---
  section('Experience');
  const experiences = [
    {
      role: 'Founder', org: 'Nexcubic', period: 'Nov 2025 – Present', location: 'Bengaluru, India',
      bullets: [
        'Leading a dynamic team building powerful digital solutions for startups, enterprises, and individuals.',
        'Specializing in website & app development, AI agents, branding, UI/UX design, and digital marketing.',
        'Combining technology, creativity, and strategy to transform ideas into impactful digital experiences.',
      ],
    },
    {
      role: 'Assistant Professor – BCA Department', org: "Charan's Degree College", period: 'Mar 2025 – Present', location: 'Bengaluru, India',
      bullets: [
        'Teaching BCA students across core CS subjects including Programming, DBMS, and Web Technologies.',
        'Designing industry-aligned curriculum with hands-on project components.',
        'Mentoring students on academic projects, career paths, and interview preparation.',
      ],
    },
    {
      role: 'Assistant Professor – BCA Department', org: 'Siddaganga Institute of Management and Science', period: 'Mar 2025 – Oct 2025', location: 'Bengaluru, India',
      bullets: [
        'Delivered quality education in computer science and application development.',
        'Mentored students, fostered innovation, integrated practical knowledge with theoretical concepts.',
      ],
    },
    {
      role: 'Computer Science Lecturer – PUC', org: "Charan's PU College", period: 'Oct 2024 – Mar 2025', location: 'Bengaluru, India',
      bullets: [
        'Taught Computer Science to PU students with practical coding sessions.',
        'Prepared students for higher education and careers in the digital age.',
      ],
    },
    {
      role: 'Insurance Advisor', org: 'Edelweiss Life Insurance', period: 'Jul 2024 – Oct 2025', location: 'Bengaluru, India',
      bullets: ['Provided clients with tailored insurance solutions meeting financial goals and protection needs.'],
    },
    {
      role: 'Property Advisor', org: 'Metro Homes', period: 'May 2024 – Oct 2025', location: 'Bengaluru, India',
      bullets: ['Guided buyers, sellers, and investors through real estate decisions with personalized service.'],
    },
    {
      role: 'Assistant Teacher – Computer Science', org: 'Wisdom International Public School', period: 'Oct 2023 – Mar 2024', location: 'Bengaluru, India',
      bullets: ['Taught programming, hardware/software concepts, and internet safety to school students.'],
    },
    {
      role: 'Freelance Web Developer', org: 'Self-Employed', period: '2023 – Present', location: 'Remote',
      bullets: ['Building modern web applications using React, Node.js, MERN stack, and Python full stack for clients.'],
    },
  ];

  experiences.forEach((exp) => {
    checkPage(20);
    // Role title (bold, left) + Period (right-aligned, gray)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...black);
    doc.text(exp.role, m, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...midGray);
    doc.text(exp.period, pageW - m, y, { align: 'right' });
    y += 4;

    // Org + location
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...midGray);
    doc.text(`${exp.org}, ${exp.location}`, m, y);
    y += 4.5;

    // Bullets
    exp.bullets.forEach((b) => {
      checkPage(5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...darkGray);
      const bLines = doc.splitTextToSize(b, cW - 6);
      doc.text('•', m + 2, y);
      doc.text(bLines, m + 6, y);
      y += bLines.length * 3.8;
    });
    y += 4;
  });

  // --- EDUCATION ---
  section('Education');
  const educationData = [
    { degree: 'CA Intermediate', school: 'The Institute of Chartered Accountants of India (ICAI)', period: 'June 2025', detail: 'Pursuing CA with focus on accounting, auditing, and financial management.' },
    { degree: 'Master of Computer Applications (MCA)', school: 'Amity University', period: 'Oct 2023 – May 2025', detail: 'Specialized in Artificial Intelligence (AI) and Machine Learning (ML).' },
    { degree: 'Bachelor of Computer Applications (BCA)', school: 'Pinnacle Institute of Management & Science', period: 'Sep 2020 – Sep 2023', detail: 'Strong fundamentals in computer programming and database management.' },
    { degree: 'Pre-University (PUC) – Computer Science', school: 'ICS Mahesh PU College', period: '2019 – 2020', detail: '' },
  ];

  educationData.forEach((edu) => {
    checkPage(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...black);
    doc.text(edu.degree, m, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...midGray);
    doc.text(edu.period, pageW - m, y, { align: 'right' });
    y += 4;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text(edu.school, m, y);
    y += 4;
    if (edu.detail) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...darkGray);
      doc.text(edu.detail, m, y);
      y += 4;
    }
    y += 3;
  });

  // --- CERTIFICATIONS ---
  section('Awards & Certifications');
  const certs = [
    'Leadership And Motivation in Organization',
    'Professional And Life Skills',
    'Strategic Human Resource Management',
    'Google Ads for Beginners',
    'Generative AI Mastermind',
  ];
  certs.forEach((c) => {
    checkPage(5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...darkGray);
    doc.text(`•   ${c}`, m + 2, y);
    y += 4.5;
  });
  y += 2;

  // --- LANGUAGES ---
  section('Languages');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  doc.text('English (Professional)  |  Kannada (Native)  |  Hindi (Professional)  |  Tamil  |  Telugu  |  Urdu', m, y);

  doc.save('Sanjay_S_Resume.pdf');
};
