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
      "Sarmishta is a cybersecurity master's student with a computer science foundation and hands-on exposure to SIEM analytics, access control, secure AI-driven workflows, blockchain security, risk assessment, and threat intelligence tooling.",
  },
];

const fallbackAnswer =
  "That detail is not listed in Sarmishta's resume yet. She is actively learning and expanding her cybersecurity skill set, and would be happy to discuss it directly if it is relevant to your role or team.";

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
