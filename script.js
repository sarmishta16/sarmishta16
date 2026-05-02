const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const topbar = document.querySelector(".topbar");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const updateTopbar = () => {
  topbar.classList.toggle("scrolled", window.scrollY > 8);
};

updateTopbar();
window.addEventListener("scroll", updateTopbar, { passive: true });

const revealTargets = document.querySelectorAll(
  ".timeline-card, .case-card, .toolkit-panel, .glass-card, .contact-card"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("revealed"));
}

const aiPanel = document.querySelector(".ai-panel");
const aiOpenButtons = document.querySelectorAll("[data-ai-open]");
const aiCloseButton = document.querySelector("[data-ai-close]");
const aiMessages = document.querySelector("[data-ai-messages]");
const aiForm = document.querySelector("[data-ai-form]");
const aiInput = document.querySelector("#ai-question");
const suggestionButtons = document.querySelectorAll("[data-question]");

const resumeAnswers = [
  {
    keywords: ["role", "roles", "target", "job", "jobs", "position", "positions", "career", "looking for", "interested in"],
    answer:
      "Sarmishta is targeting early-career cybersecurity roles such as Security Analyst, Cybersecurity Analyst, GRC Analyst, Risk/Compliance/Governance Analyst, and Threat Intelligence Analyst. She is also open to adjacent roles such as SOC Analyst, Security Risk Management Intern, Cybersecurity Consulting Analyst, and FinTech security roles. Long term, she is interested in security strategy, risk leadership, BISO-style work, and cybersecurity at the intersection of finance and technology.",
  },
  {
    keywords: ["strength", "strengths", "why hire", "stand out", "different", "best at", "value"],
    answer:
      "Three strengths stand out: first, she connects cybersecurity decisions to business risk and real-world impact, especially in fintech and enterprise settings. Second, she has hands-on technical and analytical ability across tools like Splunk, Wireshark, Nmap, and Nessus, plus project work involving threat intelligence, APIs, file integrity monitoring, and data-driven analysis. Third, she shows ownership and initiative through internships, startup-style experience, Cybersecurity Club leadership, and proactive outreach to professors, recruiters, and industry professionals.",
  },
  {
    keywords: ["interest", "interests", "excited", "learning", "learn", "curious", "specialize", "specialization"],
    answer:
      "Her highest-interest areas are threat intelligence, real-time risk detection, security risk management, GRC frameworks such as NIST and ISO 27001, AI security, adversarial attacks, model manipulation, fintech security, and fraud prevention. She is also curious about autonomous AI agent security, predictive risk intelligence platforms, cloud security architecture across AWS and Azure, detection engineering, and SIEM optimization.",
  },
  {
    keywords: ["environment", "team", "culture", "workplace", "manager", "mentor", "mentorship"],
    answer:
      "She is looking for a fast-paced, high-impact environment with collaborative teams, strong communication, and mentorship. Early in her career, she values teams that let her combine technical execution with strategic thinking, take ownership, build independently, and learn from exposure to real-world security incidents and decisions.",
  },
  {
    keywords: ["motivation", "story", "why cybersecurity", "why security", "passion", "purpose", "mission"],
    answer:
      "Sarmishta is motivated by understanding how systems break and how they can be secured at scale. Her fintech exposure strengthened her interest in risk, compliance, fraud prevention, and protecting real users' data, money, and digital identity. She sees cybersecurity not only as defense, but as intelligence and prediction: building systems that anticipate threats instead of only reacting to them.",
  },
  {
    keywords: ["fintech", "finance", "financial", "banking", "fraud", "money", "biso", "business information security officer"],
    answer:
      "FinTech security is a strong fit for Sarmishta because it combines cybersecurity, business risk, fraud prevention, compliance, and user trust. Her banking internship at Mashreq Bank and her interest in risk intelligence make finance-and-technology security roles especially aligned with her long-term direction.",
  },
  {
    keywords: ["leadership", "club", "president", "initiative", "ownership", "lead"],
    answer:
      "Sarmishta shows leadership and initiative through her role as President of the Cybersecurity Club, her proactive approach to internships and technical opportunities, and her habit of reaching out to professors, recruiters, and industry professionals. She is someone who actively looks for ways to contribute, learn, and build.",
  },
  {
    keywords: ["education", "study", "studying", "degree", "master", "masters", "university", "school", "college", "gpa"],
    answer:
      "Sarmishta is pursuing a Master of Science in Cybersecurity at New York Institute of Technology in Manhattan, New York, with a 3.8 GPA. She also completed a Bachelor of Science in Computer Science Hons. Cybersecurity at Heriot-Watt University in Dubai with a 3.7 GPA.",
  },
  {
    keywords: ["experience", "work", "internship", "intern", "company", "techno", "mashreq", "bank"],
    answer:
      "Her experience includes a Technology Associate role at Techno Horizon in Dubai, where she supported AI, IoT, and cybersecurity-enabled hospitality technology projects, and a Cybersecurity and Engineering Internship at Mashreq Bank, where she worked on SIEM monitoring, authentication systems, access control, and risk assessments.",
  },
  {
    keywords: ["skills", "tools", "technology", "technologies", "siem", "splunk", "wireshark", "nmap", "nessus", "burp", "snort", "kali"],
    answer:
      "Her security toolkit includes Splunk SIEM, Wireshark, Nmap, Nessus, Burp Suite, Snort IDS, and Kali Linux. She also works with Python, JavaScript, SQL, Solidity, Bash, PowerShell, REST API integration, AWS, Microsoft Azure, network security, cloud security, access control, and traffic analysis.",
  },
  {
    keywords: ["project", "projects", "github", "smart contract", "ethereum", "blockchain", "threat intelligence", "harvester", "ai api", "api builder", "file integrity", "fim", "monitoring"],
    answer:
      "Her listed projects include an Ethereum Solidity Smart Contract, a Mini Threat Intelligence Harvester for open-source security data, an AI API Builder project focused on API-driven development, and a File Integrity Monitoring Tool for defensive security monitoring. The project cards link directly to her GitHub repositories.",
  },
  {
    keywords: ["certification", "certifications", "certificate", "forage", "linkedin learning", "mastercard", "deloitte"],
    answer:
      "Her certifications and simulations include Blockchain: Beyond the Basics from LinkedIn Learning, IT Security Foundations: Network Security from LinkedIn Learning, the Mastercard Cybersecurity Job Simulation on Forage, and the Deloitte Cybersecurity Job Simulation on Forage.",
  },
  {
    keywords: ["framework", "frameworks", "nist", "iso", "owasp", "mitre", "att&ck", "methodology", "methodologies"],
    answer:
      "She has resume-backed exposure to NIST, ISO 27001, OWASP Top 10, and MITRE ATT&CK, with practical interest in risk assessment, threat modeling, SIEM analytics, incident response, digital forensics, penetration testing, and blockchain security.",
  },
  {
    keywords: ["contact", "email", "phone", "linkedin", "reach", "connect", "hire"],
    answer:
      "You can contact Sarmishta at sarmishtaaratikatla@gmail.com, call her at +1 (917) 499-2185, or connect through her LinkedIn profile linked in the Contact section.",
  },
  {
    keywords: ["location", "where", "based", "new york", "dubai"],
    answer:
      "Sarmishta is currently based in New York. Her resume also includes education and experience in Dubai, United Arab Emirates.",
  },
  {
    keywords: ["language", "languages", "english", "hindi", "telugu", "arabic"],
    answer:
      "She speaks English and Hindi fluently, Telugu natively, and Arabic at an intermediate level.",
  },
  {
    keywords: ["summary", "about", "profile", "who", "tell me about"],
    answer:
      "Sarmishta is a cybersecurity master's student with a computer science foundation, hands-on security tooling experience, and a strong business-plus-security mindset. She is especially interested in security analysis, GRC, threat intelligence, fintech security, AI security, and risk intelligence. Her long-term direction is to work where cybersecurity, business strategy, and global risk intelligence meet.",
  },
];

const fallbackAnswer =
  "That detail is not listed in Sarmishta's current profile yet. What I can say is that she is actively learning, curious, and intentional about connecting technical security work to real-world business risk. She would be happy to discuss that area directly if it is relevant to your team.";

const openAiPanel = () => {
  aiPanel.hidden = false;
  window.setTimeout(() => aiInput.focus(), 50);
};

const closeAiPanel = () => {
  aiPanel.hidden = true;
};

closeAiPanel();

const addMessage = (message, sender) => {
  const bubble = document.createElement("div");
  bubble.className = `ai-message ${sender}`;
  bubble.textContent = message;
  aiMessages.appendChild(bubble);
  aiMessages.scrollTop = aiMessages.scrollHeight;
};

const getAiAnswer = (question) => {
  const normalized = question.toLowerCase();
  const match = resumeAnswers.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
  return match ? match.answer : fallbackAnswer;
};

aiOpenButtons.forEach((button) => button.addEventListener("click", openAiPanel));
aiCloseButton.addEventListener("click", closeAiPanel);

suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    aiInput.value = question;
    aiForm.requestSubmit();
  });
});

aiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = aiInput.value.trim();

  if (!question) {
    return;
  }

  addMessage(question, "user");
  aiInput.value = "";
  window.setTimeout(() => addMessage(getAiAnswer(question), "bot"), 220);
});
