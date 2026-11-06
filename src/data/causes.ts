import classImage from "../assets/class.jpeg";
import bloodDonationImage from "../assets/blood-donation.jpeg";
import blanketImage from "../assets/blanket.jpeg";
import plantImage from "../assets/plant.jpeg";

export type Activity = {
  title: string;
  date: string;
  location?: string;
  summary: string;
  href?: string;
};

export type Cause = {
  slug: string;
  icon: string;
  eyebrow: string;
  name: string;
  hindi: string;
  title: string;
  titleHindi: string;
  intro: string;
  heroImage: string;
  accent: "saffron" | "green" | "navy";
  focus: { label: string; hindi: string; copy: string }[];
  completed: Activity[];
  upcoming: Activity[];
  ways: { title: string; copy: string; href: string }[];
  ctaTitle: string;
  ctaCopy: string;
};

export const causes: Cause[] = [
  {
    slug: "education",
    icon: "school",
    eyebrow: "EDUCATION / शिक्षा",
    name: "Education",
    hindi: "शिक्षा",
    title: "Help children keep learning.",
    titleHindi: "बच्चों की पढ़ाई जारी रखने में मदद करें।",
    intro:
      "We support children with practical learning resources, guidance, and opportunities to stay engaged with education.",
    heroImage: classImage.src,
    accent: "saffron",
    focus: [
      {
        label: "Learning support",
        hindi: "शैक्षणिक सहयोग",
        copy: "Books, stationery, tutoring, and other useful support for children who need it.",
      },
      {
        label: "Mentorship",
        hindi: "मार्गदर्शन",
        copy: "Time and encouragement from volunteers who can help children learn with confidence.",
      },
      {
        label: "Continuity",
        hindi: "निरंतरता",
        copy: "Support that helps learning continue beyond a single distribution or event.",
      },
    ],
    completed: [],
    upcoming: [],
    ways: [
      {
        title: "Support a child",
        copy: "Contribute toward practical education support.",
        href: "/donate/",
      },
      {
        title: "Volunteer",
        copy: "Help with teaching, mentoring, or activity support.",
        href: "/join/",
      },
      {
        title: "Provide supplies",
        copy: "Help collect useful books, stationery, and learning materials.",
        href: "/join/",
      },
    ],
    ctaTitle: "Want to help with education?",
    ctaCopy:
      "Donate toward learning support or join us as a volunteer. Activity dates will be published here as they are confirmed.",
  },
  {
    slug: "health",
    icon: "medical_services",
    eyebrow: "HEALTH / स्वास्थ्य",
    name: "Health",
    hindi: "स्वास्थ्य",
    title: "Make community health action easier.",
    titleHindi: "सामुदायिक स्वास्थ्य सेवा को आसान बनाएं।",
    intro:
      "Our health work focuses on community participation, including blood donation activities and practical volunteer support.",
    heroImage: bloodDonationImage.src,
    accent: "green",
    focus: [
      {
        label: "Blood donation",
        hindi: "रक्तदान",
        copy: "Community blood donation activities organised around safety, hygiene, and local need.",
      },
      {
        label: "Volunteer support",
        hindi: "स्वयंसेवी सहयोग",
        copy: "People are needed for registrations, coordination, outreach, and participant support.",
      },
      {
        label: "Local participation",
        hindi: "स्थानीय भागीदारी",
        copy: "Health initiatives work best when residents and volunteers can take part easily.",
      },
    ],
    completed: [],
    upcoming: [],
    ways: [
      {
        title: "Donate blood",
        copy: "Take part when the next eligible blood donation activity is announced.",
        href: "/join/",
      },
      {
        title: "Volunteer",
        copy: "Help with registration, coordination, and participant support.",
        href: "/join/",
      },
      {
        title: "Share the drive",
        copy: "Help upcoming health activities reach more people.",
        href: "/join/",
      },
    ],
    ctaTitle: "Ready to support a health activity?",
    ctaCopy:
      "Join the volunteer list and we will publish confirmed activities here with dates and locations.",
  },
  {
    slug: "community-welfare",
    icon: "groups",
    eyebrow: "COMMUNITY WELFARE / जन कल्याण",
    name: "Community Welfare",
    hindi: "जन कल्याण",
    title: "Support practical needs, locally.",
    titleHindi: "स्थानीय स्तर पर ज़रूरतों का सहयोग करें।",
    intro:
      "Our welfare work centres on practical community support, from essential supplies and warmth to local distribution activities.",
    heroImage: blanketImage.src,
    accent: "navy",
    focus: [
      {
        label: "Essential supplies",
        hindi: "आवश्यक वस्तुएँ",
        copy: "Useful items such as food, blankets, lights, and other everyday essentials.",
      },
      {
        label: "Local distribution",
        hindi: "स्थानीय वितरण",
        copy: "Community-led collection, packing, and distribution close to where support is needed.",
      },
      {
        label: "Dignity",
        hindi: "गरिमा",
        copy: "Support should be direct, respectful, and focused on real needs.",
      },
    ],
    completed: [],
    upcoming: [],
    ways: [
      {
        title: "Fund essentials",
        copy: "Help cover practical items for future distributions.",
        href: "/donate/",
      },
      {
        title: "Donate goods",
        copy: "Contribute suitable supplies when a collection is announced.",
        href: "/join/",
      },
      {
        title: "Volunteer locally",
        copy: "Help sort, pack, coordinate, and distribute.",
        href: "/join/",
      },
    ],
    ctaTitle: "Help with the next local activity.",
    ctaCopy:
      "Join the volunteer list or support essential supplies. Confirmed activities will appear above.",
  },
  {
    slug: "environment",
    icon: "eco",
    eyebrow: "ENVIRONMENT / पर्यावरण",
    name: "Environment",
    hindi: "पर्यावरण",
    title: "Take care of the places we share.",
    titleHindi: "उन जगहों की देखभाल करें जिन्हें हम साझा करते हैं।",
    intro:
      "We bring people together around plantation, water conservation, and everyday environmental action.",
    heroImage: plantImage.src,
    accent: "green",
    focus: [
      {
        label: "Plantation",
        hindi: "वृक्षारोपण",
        copy: "Planting is only the start: local care and follow-up matter too.",
      },
      {
        label: "Water conservation",
        hindi: "जल संरक्षण",
        copy: "Practical awareness and action around protecting and conserving water.",
      },
      {
        label: "Everyday action",
        hindi: "दैनिक जिम्मेदारी",
        copy: "Simple habits can make environmental care part of community life.",
      },
    ],
    completed: [],
    upcoming: [],
    ways: [
      {
        title: "Join a plantation",
        copy: "Take part in a plantation activity and help care for new trees.",
        href: "/join/",
      },
      {
        title: "Volunteer",
        copy: "Help organise local environmental activities.",
        href: "/join/",
      },
      {
        title: "Support materials",
        copy: "Contribute toward practical resources for community activities.",
        href: "/donate/",
      },
    ],
    ctaTitle: "Want to get involved?",
    ctaCopy:
      "Join the volunteer list. Once an activity is confirmed, its date, location, and details will be listed here.",
  },
];

export const causeMap = Object.fromEntries(
  causes.map((cause) => [cause.slug, cause]),
);
