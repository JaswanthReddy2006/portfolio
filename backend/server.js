require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS'];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);
if (missingEnvVars.length > 0) {
  console.warn(`Missing email environment variables: ${missingEnvVars.join(', ')}`);
}

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const PORTFOLIO_CONTEXT = `(NOTE: This context is fixed and should be used to answer all questions about Jaswanth Reddy Nukalapati. Do not deviate from this information. If a question cannot be answered with the provided context, refer them to contact Jaswanth directly at . if you get any questions from out side of this context, respond with "I am focused on Jaswanth's professional journey. I can tell you about his AWS security projects or his experience at LPU instead." If a question is too technical or specific for the provided context, say "That's a great deep-dive question! You should reach out to Jaswanth directly at, answer only in bullet points)
You are the official AI Assistant for Jaswanth Reddy Nukalapati's Professional Portfolio.
Your goal is to provide high-fidelity, accurate information about Jaswanth's career, projects, and technical mindset.

**Identity & Background:**
- **Name:** Jaswanth Reddy Nukalapati[cite: 1].
- **Role:**  Cloud Developer, Full-Stack .
- **Hometown:** Andhra Pradesh, India[cite: 17].
- **Current Location:** Punjab, India (Student at Lovely Professional University).
- **Languages:** Fluent in English and Telugu; understands basic Hindi.

**Professional Summary:**
Jaswanth is a cloud-native developer and problem solver who prioritizes "Automation over manual effort." He specializes in building scalable, serverless architectures on AWS and high-performance web applications. He is highly adaptable, having relocated from Andhra Pradesh to Punjab for his studies, and maintains a "Learn by Doing" philosophy.

**Contact Information:**
- Email: jaswanthr57@gmail.com[cite: 10].
- Phone: +91 8309234766[cite: 11].
- LinkedIn: linkedin.com/in/jaswanth2006[cite: 1].
- GitHub: github.com/JaswanthReddy2006[cite: 1].

**Technical Skill Set:**
- **Languages:** C, C++, Java, Bash, JavaScript[cite: 4].
- **Frameworks:** React.js, Express.js, Node.js, Vite[cite: 6, 12].
- **Cloud & DevOps:** AWS (Lambda, API Gateway, S3, Rekognition, DynamoDB, SNS, CloudWatch), Azure, Docker, Git Actions.
- **Databases:** MySQL, MongoDB, DynamoDB.
- **Soft Skills:** Self-Motivated, Team Player, Adaptability[cite: 8].

**Key Projects:**
1. **WorkSync (Project Management Dashboard):**
   - **Performance:** Reduced component rendering times by 75% (from 1200ms to 300ms) through optimized data routing.
   - **Innovation:** Integrated a custom AI chatbot that autonomously generates project analytics and charts.
   - **Stack:** React.js, Node.js, Express, MongoDB, Recharts.
2. **Secure Campus AI (Automated Attendance):**
   - **Security:** Uses Amazon Rekognition for real-time facial identification against an S3 database.
   - **Infrastructure:** Fully serverless backend using AWS Lambda, eliminating server management overhead.
   - **Alerts:** Integrated Amazon SNS for instant email alerts on failed security matches.

**Education & Achievements:**
- **B.Tech (CSE):** Lovely Professional University (2023–Present). CGPA: 7.87.
- **Intermediate:** Narayana Jr College. 88.2%[cite: 13, 14].
- **Matriculation:** Narayana CBSE High School. 82%[cite: 15, 16].
- **Hackathon:** Ranked 5th out of 50 teams in "Code of Duty" (Jan 2024).
- **Competitive Programming:** Mastered DSA in C++ with 150+ solved problems.

**Mindset & FAQ:**
- **Philosophy:** "Cloud-First." He builds with global scalability and security in mind from day one.
- **Why Hire Him?** He combines deep theoretical knowledge (7.87 CGPA, NPTEL Cloud Cert) with proven results (75% performance gains in projects).
- **Off-Topic Questions:** If asked about non-professional topics, respond: "I am focused on Jaswanth's professional journey. I can tell you about his AWS security projects or his experience at LPU instead."
- **Deep Technical Questions:** If a question is too complex or specific for the provided context, say: "That's a great deep-dive question! You should reach out to Jaswanth directly at jaswanthr57@gmail.com to discuss his technical architecture in detail."
**Mindset & Professional Philosophy:**
- **Core Value:** "Automation over manual effort." Jaswanth believes in building systems that reduce human error and increase efficiency.
- **Problem-Solving Approach:** He approaches challenges with a "Cloud-First" mentality, always considering scalability and security from the start.
- **Continuous Learning:** Jaswanth is a firm believer in the "Learn by Doing" philosophy—proven by his transition from theoretical DSA to building functional cloud-native security systems.
- **Work Ethic:** Resilient and competitive, as demonstrated by ranking in the top 10% of teams during the Code of Duty Hackathon.

**Miscellaneous & FAQ:**
- **Why Cloud Computing?** Jaswanth is fascinated by the ability to deploy global-scale infrastructure with just a few lines of code.
- **Coding Preference:** He prefers writing clean, modular code and spends significant time optimizing backend logic for performance.
- **Languages:** While he understands Hindi, he is most fluent and comfortable working in English and Telugu.
- **What motivates him?** The intersection of AI and Infrastructure—using machine learning (like AWS Rekognition) to solve physical-world security problems.
- **Personal Background:** Proudly hails from Andhra Pradesh and is currently expanding his horizons as a student at LPU in Punjab, showing high adaptability to new environments.

**Handling Arbitrary/Miscellaneous Questions:**
- If asked about hobbies: "Jaswanth spends his time exploring new AWS services, solving complex DSA problems, and staying updated with the latest in Full-Stack development."
- If asked about his 'Dream Role': "He aims to become a Cloud Architect or a Lead Full-Stack Developer, designing systems that serve millions of users."
- If asked "Why should I hire Jaswanth?": "Because he combines a strong academic foundation (7.87 CGPA) with proven hands-on experience in AWS and React, plus a competitive 'hackathon-winner' mindset."
**Bot Guidelines:**
- **Greeting:** "I am Jaswanth's AI Portfolio Assistant. How can I help you explore his work today?"
- **Format:** Use bullet points. Keep answers direct and professional.
- **Accuracy:** Never hallucinate facts. If the info isn't here, refer them to his contact details.
`;
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: PORTFOLIO_CONTEXT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will answer questions about Jaswanth Reddy Nukalapati based on the provided context." }],
        },
        ...history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.message }]
        }))
      ],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Error generating chat response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});


// Serve static frontend files (used in production/Docker)
app.use(express.static(path.join(__dirname, 'dist')));

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider here
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('SMTP verification failed:', error.message);
  } else {
    console.log('SMTP server is ready to send emails.');
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ success: false, error: 'Email service is not configured on the server.' });
  }

  // 1. Email to Owner
  const ownerMailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: 'njrp1970@gmail.com',
    replyTo: email,
    subject: `🚀 New Lead: ${name} messaged you!`,
    text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #111827; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #111827; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #1f2937; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 10px;">👋</div>
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">New Connection!</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">Someone just reached out from your portfolio.</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <!-- Sender Details Card -->
                    <div style="background-color: #374151; border-radius: 12px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #ec4899;">
                      <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Sender Details</p>
                      <h3 style="margin: 0 0 5px 0; color: #f3f4f6; font-size: 22px;">${name}</h3>
                      <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                    </div>
                    
                    <!-- Message Card -->
                    <div style="background-color: #111827; border: 1px solid #374151; border-radius: 12px; padding: 25px; margin-bottom: 35px;">
                      <p style="margin: 0 0 15px 0; color: #9ca3af; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Their Message</p>
                      <p style="color: #e5e7eb; font-size: 16px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>

                    <!-- Action Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px; box-shadow: 0 10px 20px -10px rgba(2ec4899, 0.5);">Reply Directly to ${name}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #111827; padding: 25px 30px; text-align: center; border-top: 1px solid #374151;">
                    <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Delivered via Jaswanth's Portfolio API ⚡</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };

  // 2. Confirmation Email to Sender
  const senderMailOptions = {
    from: `"Jaswanth Reddy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `✨ Thanks for reaching out, ${name}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px -5px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 45px 30px; text-align: center;">
                    <div style="font-size: 50px; margin-bottom: 15px; background: rgba(255,255,255,0.2); width: 80px; height: 80px; line-height: 80px; border-radius: 50%; display: inline-block; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">🌟</div>
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">Thank You!</h1>
                    <p style="color: #e0e7ff; margin: 12px 0 0 0; font-size: 18px; font-weight: 500;">Your message made my day.</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 22px; font-weight: 700;">Hi ${name},</h2>
                    <p style="color: #475569; margin: 0 0 30px 0; font-size: 16px; line-height: 1.7;">
                      I just wanted to drop a quick note to say <strong>thank you</strong> for reaching out! I've received your message and will get back to you as soon as I can—usually within a day.
                    </p>
                    
                    <div style="background: linear-gradient(to right, #f8fafc, #f1f5f9); border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 8px; margin-bottom: 35px;">
                      <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Copy of your message:</p>
                      <p style="color: #334155; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${message}"</p>
                    </div>

                    <p style="color: #475569; margin: 0 0 10px 0; font-size: 16px;">Best regards,</p>
                    <p style="color: #0f172a; margin: 0; font-size: 18px; font-weight: 800;">Jaswanth Reddy Nukalapati</p>
                    <p style="color: #8b5cf6; margin: 5px 0 0 0; font-size: 14px; font-weight: 600;">Full-Stack & Cloud Developer</p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #0f172a; padding: 35px 30px; text-align: center;">
                    <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 14px; font-weight: 500;">Let's connect across the web:</p>
                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        <td style="padding: 0 15px;">
                          <a href="https://linkedin.com/in/jaswanth2006" style="display: inline-block; background-color: #1e293b; color: #38bdf8; text-decoration: none; font-size: 14px; font-weight: 600; padding: 10px 20px; border-radius: 8px; border: 1px solid #334155;">LinkedIn</a>
                        </td>
                        <td style="padding: 0 15px;">
                          <a href="https://github.com/JaswanthReddy2006" style="display: inline-block; background-color: #1e293b; color: #38bdf8; text-decoration: none; font-size: 14px; font-weight: 600; padding: 10px 20px; border-radius: 8px; border: 1px solid #334155;">GitHub</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="color: #94a3b8; margin-top: 25px; font-size: 12px; text-align: center; font-weight: 500;">This is an automated confirmation from <a href="https://yourportfolio.com" style="color: #64748b; text-decoration: underline;">Jaswanth's Portfolio</a>.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderMailOptions)
    ]);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
});

// Catch-all to serve the React app
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});