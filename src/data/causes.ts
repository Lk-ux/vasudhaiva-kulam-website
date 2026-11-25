import classImage from "../assets/class.jpeg";
import bloodDonationImage from "../assets/blood-donation.jpeg";
import blanketImage from "../assets/blanket.jpeg";
import teamImage from "../assets/us.jpeg";
import plantImage from "../assets/plant.jpeg";

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
  accent: string;
  focus: { label: string; hindi: string; copy: string }[];
  programs: { title: string; hindi: string; copy: string; action: string; url: string }[];
  ways: { title: string; copy: string }[];
  ctaTitle: string;
  ctaCopy: string;
};

export const causes: Cause[] = [
  {
    slug: 'education',
    icon: 'school',
    eyebrow: 'EDUCATION / शिक्षा',
    name: 'Education',
    hindi: 'शिक्षा',
    title: 'Open the door to opportunity.',
    titleHindi: 'अवसरों के द्वार खोलें।',
    intro: 'Quality learning becomes more powerful when a child also has the resources, guidance, and encouragement to keep going. Our education work focuses on practical support and long-term mentorship for underprivileged youth.',
    heroImage: classImage.src,
    accent: 'saffron',
    focus: [
      { label: 'School readiness', hindi: 'विद्यालय तैयारी', copy: 'Books, supplies, and everyday learning essentials that help children participate fully in school.' },
      { label: 'Mentorship', hindi: 'मार्गदर्शन', copy: 'Consistent tutoring and encouragement that give students a trusted person in their corner.' },
      { label: 'Continuity', hindi: 'निरंतरता', copy: 'Support designed to help children stay engaged with learning as their needs change.' },
    ],
    programs: [
      { title: "Sponsor a Child's Education", hindi: 'एक बच्चे की शिक्षा प्रायोजित करें', copy: 'Support school supplies, tutoring, and the everyday costs that can stand between a child and consistent learning.', action: 'Sponsor education', url: '/donate' },
      { title: 'Volunteer as a Mentor', hindi: 'मार्गदर्शक के रूप में जुड़ें', copy: 'Share time, subject knowledge, or encouragement with learners who benefit from an additional caring adult.', action: 'Volunteer', url: '/join' },
    ],
    ways: [
      { title: 'Give toward a child', copy: 'A focused contribution can be directed toward the education support a child needs.' },
      { title: 'Give your time', copy: 'Mentoring, tutoring, and helping with learning activities can make support more personal.' },
      { title: 'Equip learning', copy: 'Help provide useful books, stationery, and other school essentials.' },
    ],
    ctaTitle: 'Help a child keep learning.',
    ctaCopy: 'Support education with a contribution or volunteer your time as a mentor.',
  },
  {
    slug: 'health',
    icon: 'medical_services',
    eyebrow: 'HEALTH / स्वास्थ्य',
    name: 'Health',
    hindi: 'स्वास्थ्य',
    title: 'Make essential care easier to reach.',
    titleHindi: 'ज़रूरी स्वास्थ्य सेवा को सुलभ बनाएं।',
    intro: 'Health support begins with reliable community action. Our health initiative centres on periodic blood donation drives and practical support that can connect local communities with urgent needs.',
    heroImage: bloodDonationImage.src,
    accent: 'green',
    focus: [
      { label: 'Blood donation', hindi: 'रक्तदान', copy: 'Community blood donation drives that help strengthen local blood availability.' },
      { label: 'Participation', hindi: 'भागीदारी', copy: 'Make it simple for people to find, understand, and join a well-organised local drive.' },
      { label: 'Community care', hindi: 'सामुदायिक देखभाल', copy: 'Health action becomes stronger when residents, volunteers, and local institutions work together.' },
    ],
    programs: [
      { title: 'Monthly Blood Donation Camp', hindi: 'मासिक रक्तदान शिविर', copy: 'Help a recurring community blood donation camp organised with a focus on safety, hygiene, and local need.', action: 'Donate', url: '/donate' },
      { title: 'Volunteer at a Health Drive', hindi: 'स्वास्थ्य अभियान में स्वयंसेवक बनें', copy: 'Help welcome participants, coordinate logistics, and make the experience clear and supportive.', action: 'Volunteer', url: '/join' },
    ],
    ways: [
      { title: 'Donate blood', copy: 'A single appointment can contribute to a local community blood drive.' },
      { title: 'Volunteer on-site', copy: 'Help with registrations, participant support, coordination, and outreach.' },
      { title: 'Spread the word', copy: 'Share upcoming drives with friends, family, and community groups.' },
    ],
    ctaTitle: 'Turn care into action.',
    ctaCopy: 'Join the next community health drive or volunteer to help make it happen.',
  },
  {
    slug: 'community-welfare',
    icon: 'groups',
    eyebrow: 'COMMUNITY WELFARE / जन कल्याण',
    name: 'Community Welfare',
    hindi: 'जन कल्याण',
    title: 'Meet everyday needs with dignity.',
    titleHindi: 'सम्मान के साथ रोज़मर्रा की ज़रूरतें पूरी करें।',
    intro: 'Small essentials can make a meaningful difference when they reach people at the right time. Our welfare work provides practical support through community-led distribution of food, blankets, lights, and other basic facilities.',
    heroImage: blanketImage.src,
    accent: 'navy',
    focus: [
      { label: 'Basic essentials', hindi: 'मूलभूत आवश्यकताएँ', copy: 'Support shaped around practical needs such as food, warmth, lighting, and daily essentials.' },
      { label: 'Local action', hindi: 'स्थानीय पहल', copy: 'Work close to communities so volunteers can respond to real, immediate needs.' },
      { label: 'Human dignity', hindi: 'मानवीय गरिमा', copy: 'Make support respectful, direct, and easy for people to receive.' },
    ],
    programs: [
      { title: 'Essential Supplies Drive', hindi: 'आवश्यक वस्तु अभियान', copy: 'Help collect and distribute useful supplies to families and individuals who need them.', action: 'Support the drive', url: '/join' },
      { title: 'Community Distribution', hindi: 'सामुदायिक वितरण', copy: 'Volunteer in local distribution activities, from packing to on-ground coordination.', action: 'Join as a volunteer', url: '/join' },
    ],
    ways: [
      { title: 'Fund essentials', copy: 'Help cover practical items that can be distributed where they are needed.' },
      { title: 'Donate useful goods', copy: 'Contribute suitable supplies for an upcoming local collection or drive.' },
      { title: 'Volunteer locally', copy: 'Pack, sort, coordinate, and distribute support with a community team.' },
    ],
    ctaTitle: 'Be there when a community needs support.',
    ctaCopy: 'Contribute to practical welfare work or join the next local distribution drive.',
  },
  {
    slug: 'environment',
    icon: 'eco',
    eyebrow: 'ENVIRONMENT / पर्यावरण',
    name: 'Environment',
    hindi: 'पर्यावरण',
    title: 'Care for the places we all call home.',
    titleHindi: 'उन स्थानों की रक्षा करें जिन्हें हम सब घर कहते हैं।',
    intro: 'Environmental stewardship is community work. Our focus brings people together around sustainable living, afforestation, and water conservation so local action can strengthen the places we share.',
    heroImage: plantImage.src,
    accent: 'green',
    focus: [
      { label: 'Afforestation', hindi: 'वनीकरण', copy: 'Plant and care for trees through community-driven plantation activities.' },
      { label: 'Water conservation', hindi: 'जल संरक्षण', copy: 'Promote practical ways to understand, protect, and conserve local water resources.' },
      { label: 'Sustainable living', hindi: 'सतत जीवन', copy: 'Encourage everyday choices that reduce waste and strengthen long-term environmental care.' },
    ],
    programs: [
      { title: 'Green Earth Plantation Drive', hindi: 'हरित पृथ्वी वृक्षारोपण अभियान', copy: 'Join a community plantation effort and help care for greener local spaces.', action: 'Join the drive', url: '/join' },
      { title: 'Water Conservation Action', hindi: 'जल संरक्षण पहल', copy: 'Support awareness and practical conservation activities that make water stewardship visible in everyday life.', action: 'Get involved', url: '/join' },
    ],
    ways: [
      { title: 'Plant and care', copy: 'Join a plantation activity and help look after new trees beyond planting day.' },
      { title: 'Conserve water', copy: 'Bring water-saving practices into your home, workplace, and community.' },
      { title: 'Mobilise others', copy: 'Help more people take part in local environmental activities.' },
    ],
    ctaTitle: 'Leave a healthier place for the next generation.',
    ctaCopy: 'Join a plantation or water-conservation activity and turn shared values into local action.',
  },
];

export const causeMap = Object.fromEntries(causes.map((cause) => [cause.slug, cause]));
