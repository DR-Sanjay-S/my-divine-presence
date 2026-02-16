import jsPDF from 'jspdf';

export const generateResumePdf = () => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = 210;
  const margin = 15;
  const contentW = pageW - margin * 2;
  let y = 15;

  const checkPage = (needed: number) => {
    if (y + needed > 280) {
      doc.addPage();
      y = 15;
    }
  };

  const primary: [number, number, number] = [16, 185, 129];
  const dark: [number, number, number] = [30, 30, 30];
  const gray: [number, number, number] = [100, 100, 100];

  // --- Header ---
  doc.setFontSize(22);
  doc.setTextColor(...dark);
  doc.setFont('helvetica', 'bold');
  doc.text('Sanjay S', margin, y);
  y += 7;

  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.setFont('helvetica', 'normal');
  doc.text('Founder · Assistant Professor · CA Intermediate', margin, y);
  y += 6;

  doc.setFontSize(8);
  doc.text('Phone: +91 9740501114  |  Email: educate.sanjays@gmail.com  |  Company: sanjays@nexcubic.com', margin, y);
  y += 4;
  doc.text('LinkedIn: linkedin.com/in/sanjay-s-258781240  |  Website: nexcubic.com  |  Location: Bengaluru, India', margin, y);
  y += 7;

  // Divider
  doc.setDrawColor(...primary);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  // --- Section helper ---
  const sectionTitle = (title: string) => {
    checkPage(12);
    doc.setFontSize(12);
    doc.setTextColor(...primary);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 5;
  };

  // --- About ---
  sectionTitle('About');
  doc.setFontSize(9);
  doc.setTextColor(...dark);
  doc.setFont('helvetica', 'normal');
  const about = 'Educator, entrepreneur, and technologist dedicated to making technology education practical, engaging, and future-ready. Conducts AI and Tech seminars helping students and institutions understand real-world applications of AI, ML, and Automation.';
  const aboutLines = doc.splitTextToSize(about, contentW);
  doc.text(aboutLines, margin, y);
  y += aboutLines.length * 4 + 4;

  // --- Experience ---
  sectionTitle('Experience');
  const experiences = [
    { role: 'Founder', org: 'Nexcubic', period: 'Nov 2025 – Present', location: 'Bengaluru', bullets: ['Leading digital solutions for startups and enterprises', 'Website & app development, AI agents, branding, UI/UX, digital marketing'] },
    { role: 'Assistant Professor – BCA', org: "Charan's Degree College", period: 'Mar 2025 – Present', location: 'Bengaluru', bullets: ['Teaching Programming, DBMS, Web Technologies', 'Mentoring students on projects and career paths'] },
    { role: 'Assistant Professor – BCA', org: 'Siddaganga Institute of Management and Science', period: 'Mar 2025 – Oct 2025', location: 'Bengaluru', bullets: ['Delivered quality CS education', 'Research, curriculum development, emerging technologies'] },
    { role: 'CS Lecturer – PUC', org: "Charan's PU College", period: 'Oct 2024 – Mar 2025', location: 'Bengaluru', bullets: ['Taught CS with practical coding sessions'] },
    { role: 'Insurance Advisor', org: 'Edelweiss Life Insurance', period: 'Jul 2024 – Oct 2025', location: 'Bengaluru', bullets: ['Tailored insurance solutions for clients'] },
    { role: 'Property Advisor', org: 'Metro Homes', period: 'May 2024 – Oct 2025', location: 'Bengaluru', bullets: ['Guided clients through real estate decisions'] },
    { role: 'Assistant Teacher – CS', org: 'Wisdom International Public School', period: 'Oct 2023 – Mar 2024', location: 'Bengaluru', bullets: ['Taught programming and internet safety to school students'] },
    { role: 'Freelance Web Developer', org: 'Self-Employed', period: '2023 – Present', location: 'Remote', bullets: ['React, Node.js, MERN stack, Python full stack projects'] },
  ];

  experiences.forEach((exp) => {
    checkPage(18);
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.role, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.text(`${exp.org}  |  ${exp.period}  |  ${exp.location}`, margin, y + 4);
    y += 9;
    exp.bullets.forEach((b) => {
      checkPage(5);
      doc.setFontSize(8);
      doc.setTextColor(...dark);
      doc.text(`•  ${b}`, margin + 3, y);
      y += 4;
    });
    y += 3;
  });

  // --- Education ---
  sectionTitle('Education');
  const educationData = [
    { degree: 'CA Intermediate', school: 'ICAI', period: 'June 2025' },
    { degree: 'MCA – AI & ML', school: 'Amity University', period: 'Oct 2023 – May 2025' },
    { degree: 'BCA', school: 'Pinnacle Institute of Management & Science', period: 'Sep 2020 – Sep 2023' },
    { degree: 'PUC – Computer Science', school: 'ICS Mahesh PU College', period: '2019 – 2020' },
  ];

  educationData.forEach((edu) => {
    checkPage(10);
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.setFont('helvetica', 'bold');
    doc.text(edu.degree, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.text(`${edu.school}  |  ${edu.period}`, margin, y + 4);
    y += 10;
  });
  y += 2;

  // --- Skills ---
  sectionTitle('Skills & Technologies');
  const skillSections = [
    { title: 'Languages', skills: 'JavaScript, TypeScript, Python, Java, C, C++, PHP' },
    { title: 'Frontend', skills: 'React.js, Next.js, Tailwind CSS, Bootstrap, HTML5, CSS3, Framer Motion' },
    { title: 'Backend', skills: 'Node.js, Express.js, Django, Flask, REST APIs' },
    { title: 'Databases', skills: 'MongoDB, MySQL, PostgreSQL, Firebase' },
    { title: 'Full Stack', skills: 'MERN Stack, Python Full Stack, Vibe Coding' },
    { title: 'AI & Emerging Tech', skills: 'Artificial Intelligence, Machine Learning, Generative AI, Prompt Engineering' },
    { title: 'Tools', skills: 'Git & GitHub, VS Code, Postman, Vercel, Netlify, Figma' },
    { title: 'Other', skills: 'SEO, Digital Marketing, Data Structures, UI/UX Design' },
  ];

  skillSections.forEach((sec) => {
    checkPage(8);
    doc.setFontSize(9);
    doc.setTextColor(...primary);
    doc.setFont('helvetica', 'bold');
    doc.text(`${sec.title}: `, margin, y);
    const titleW = doc.getTextWidth(`${sec.title}: `);
    doc.setTextColor(...dark);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const skillLines = doc.splitTextToSize(sec.skills, contentW - titleW);
    doc.text(skillLines[0], margin + titleW, y);
    if (skillLines.length > 1) {
      for (let i = 1; i < skillLines.length; i++) {
        y += 4;
        doc.text(skillLines[i], margin, y);
      }
    }
    y += 5;
  });

  // --- Certifications ---
  sectionTitle('Certifications');
  const certs = [
    'Leadership And Motivation in Organization',
    'Professional And Life Skills',
    'Strategic Human Resource Management',
    'Google Ads for Beginners',
    'Generative AI Mastermind',
  ];
  certs.forEach((c) => {
    checkPage(5);
    doc.setFontSize(8);
    doc.setTextColor(...dark);
    doc.setFont('helvetica', 'normal');
    doc.text(`•  ${c}`, margin + 3, y);
    y += 4;
  });
  y += 2;

  // --- Languages ---
  sectionTitle('Languages');
  const langs = 'English (Professional), Kannada (Native), Hindi (Professional), Tamil (Limited), Telugu (Limited), Urdu (Limited)';
  doc.setFontSize(9);
  doc.setTextColor(...dark);
  doc.setFont('helvetica', 'normal');
  doc.text(langs, margin, y);

  doc.save('Sanjay_S_Resume.pdf');
};
