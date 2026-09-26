export interface CampusZone {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  architecturalNote: string;
  teacherLead: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  videoTitle: string;
  videoDuration: string;
  poster: string;
  quote: string;
  features: string[];
}

export interface DayTimelineItem {
  time: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  poster: string;
  videoTitle: string;
  reflection: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  expandedQuote: string;
  quoteAuthor: string;
  poster: string;
  curriculumFocus: string;
  duration: string;
}

export interface ChildArtwork {
  id: string;
  title: string;
  artist: string;
  age: number;
  grade: string;
  medium: string;
  quote: string;
  curatorNote: string;
  image: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  education: string;
  photo: string;
  philosophy: string;
  message: string;
  favoriteQuestion: string;
}

export interface ParentStory {
  id: string;
  parentNames: string;
  childInfo: string;
  headline: string;
  quote: string;
  poster: string;
  duration: string;
  location: string;
}

export interface VideoStory {
  id: string;
  title: string;
  category: 'CLASSROOM' | 'PLAY' | 'ART' | 'SPORTS' | 'MUSIC' | 'EVENTS' | 'NATURE';
  duration: string;
  poster: string;
  quote: string;
  description: string;
}

export const CAMPUS_ZONES: CampusZone[] = [
  {
    id: 'art-studio',
    name: 'The Light Atelier & Art Studio',
    category: 'Creativity & Fine Arts',
    tagline: 'Creativity begins when children are given freedom to explore.',
    description: 'A north-facing studio with double-height vaulted glass ceilings, natural clay washbasins, and floor-to-ceiling wooden storage for raw pigments, handmade paper, and clay.',
    architecturalNote: 'Passive solar design angled at 14° North for glare-free natural painting daylight all year round.',
    teacherLead: 'Ms. Ananya Sen, Atelierista',
    position: [-4, 0.8, -2],
    cameraPosition: [-3.5, 2.2, 1.5],
    videoTitle: 'Inside Our Art Studio: Hands in Wet Clay',
    videoDuration: '02:45',
    poster: '/src/assets/images/art_studio_creativity_1790399947468.jpg',
    quote: 'We do not ask children to color inside someone else’s lines. We ask what color their morning felt like.',
    features: ['Stone clay throwing wheels', 'Natural botanical dye garden', 'Drying racks for botanical prints', 'Recycled woodworking bench']
  },
  {
    id: 'playground',
    name: 'The Woodland Sensory Playground',
    category: 'Outdoor Physical Exploration',
    tagline: 'Risk-attuned natural play under century-old oak canopies.',
    description: 'An open-air landscape designed without pre-fabricated plastic equipment. Children balance on fallen cedar trunks, build dens with hazel branches, and navigate stone water sluices.',
    architecturalNote: 'Graded topography with safe natural mulch fall zones, living willow tunnels, and natural water pumps.',
    teacherLead: 'Mr. David Vance, Outdoor Specialist',
    position: [4.5, 0.5, -3],
    cameraPosition: [3.8, 2.4, 0.5],
    videoTitle: 'Morning in the Woods: Balance, Mud & Laughter',
    videoDuration: '03:10',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    quote: 'A scraped knee teaches balance far better than a warning ever could.',
    features: ['Living willow labyrinths', 'Sensory barefoot pebble paths', 'Timber ropes and climbing trees', 'Rainwater pump & creek bed']
  },
  {
    id: 'library',
    name: 'The Cedar Tree Reading Tower',
    category: 'Literature & Quiet Inquiry',
    tagline: 'Where stories live in cozy nooks and quiet corners.',
    description: 'A circular library built around a preserved courtyard cedar tree. Low cushioned bay window alcoves allow children to curl up with illustrated books in soft ambient sunlight.',
    architecturalNote: 'Acoustically damped with natural wool felt panels and Douglas fir slats to maintain quiet contemplation.',
    teacherLead: 'Sarah Lindqvist, Youth Librarian',
    position: [0, 1.4, -4.5],
    cameraPosition: [0.5, 2.8, -1],
    videoTitle: 'The Quiet Hours: Listening to Whispering Pages',
    videoDuration: '02:15',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    quote: 'Reading here is not a quiet penalty; it is an expedition into someone else’s wondrous mind.',
    features: ['Over 6,500 curated international picture books', 'Spiral reading amphitheater', 'Audio story listening pods', 'Student bookbinding station']
  },
  {
    id: 'music-room',
    name: 'The Rhythm & Acoustic Pavilion',
    category: 'Sound, Expression & Music',
    tagline: 'Finding their rhythm before they even know the notes.',
    description: 'A dedicated musical sanctuary equipped with acoustic percussion, xylophones, cellos sized for small hands, and wooden resonators that translate vibrations into touch.',
    architecturalNote: 'Asymmetrical angled timber walls to prevent standing sound waves and produce warm natural resonance.',
    teacherLead: 'Elena Rostova, Musical Director',
    position: [-4.8, 0.7, 3],
    cameraPosition: [-3.8, 2.1, 5.5],
    videoTitle: 'First Harmony: Small Hands on Big Drums',
    videoDuration: '02:50',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    quote: 'Music gives children another way to express what words cannot.',
    features: ['Orff percussion instrumentarium', 'Micro-sized violins & harps', 'Sound recording booth for original songs', 'Outdoor chime garden']
  },
  {
    id: 'kindergarten',
    name: 'The Early Years Sunlit Haven',
    category: 'Ages 3 to 5 Sanctuary',
    tagline: 'Safe, tactile discovery for our youngest thinkers.',
    description: 'A gently curved wing designed at child-scale: doors with child-height handles, low observation windows into the herb garden, and soft organic cotton lounging rugs.',
    architecturalNote: 'Floor heating with reclaimed ash wood, chemical-free beeswax wall finishes, and direct garden access from every room.',
    teacherLead: 'Mariam Al-Mansoor, Early Childhood Lead',
    position: [-1.5, 0.6, 2],
    cameraPosition: [-1, 2.0, 4.5],
    videoTitle: 'First Steps Away from Home: Safe & Curious',
    videoDuration: '03:30',
    poster: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    quote: 'When young children feel entirely safe, their natural curiosity becomes an unstoppable force.',
    features: ['Child-height culinary prep sinks', 'Indoor sensory sandbox', 'Quiet sleeping lofts with natural wool', 'Dedicated garden exit to rabbit meadow']
  },
  {
    id: 'nature-lab',
    name: 'The Living Greenhouse & Garden Lab',
    category: 'Ecology & Botany',
    tagline: 'Learning biology from seed to dining table.',
    description: 'A working glasshouse where students cultivate heirloom tomatoes, observe bee pollination, study worm composters, and understand the cyclical rhythms of nature.',
    architecturalNote: 'Integrated rainwater harvesting cistern and automated solar louvers managed by student weather observers.',
    teacherLead: 'Julian Vance, Naturalist',
    position: [3.5, 0.6, 2.8],
    cameraPosition: [3, 2.2, 5],
    videoTitle: 'Seeds and Soil: Harvesting Our First Carrots',
    videoDuration: '02:20',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    quote: 'You cannot teach stewardship from a blackboard. You have to get dirt beneath their fingernails.',
    features: ['Heirloom seed bank kept by children', 'Observation bee apiary behind safety glass', 'Hydroponic herbs and micro-greens', 'Soil testing science bench']
  }
];

export const DAY_JOURNEY: DayTimelineItem[] = [
  {
    time: '08:30',
    period: 'Morning Greeting',
    title: 'Arrival & The Morning Threshold',
    subtitle: 'Every child is greeted by name at our timber gateway.',
    description: 'No loud bells or rushed corridors. Children stroll along the cedar boardwalk, drop their coats on hand-carved wooden pegs, and transition peacefully into their morning circle with herbal tea or warm water.',
    location: 'The Welcome Atrium',
    poster: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    videoTitle: '08:30 Arrival: The Gentle Welcome',
    reflection: 'A calm beginning sets the psychological anchor for the entire day.'
  },
  {
    time: '09:00',
    period: 'Inquiry Circle',
    title: 'The Big Question & Core Discovery',
    subtitle: 'Unpacking mathematical patterns, language, and natural questions.',
    description: 'Educators initiate collaborative inquiry circles. Rather than reciting answers, groups investigate questions: "Why do pinecones close when it rains?" or "How do birds know which way is south?"',
    location: 'Classroom Ateliers',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    videoTitle: '09:00 Discovery: Why Do Shadows Move?',
    reflection: 'Curiosity is not a phase to hurry through; it is the engine of intellect.'
  },
  {
    time: '10:30',
    period: 'Creative Studio',
    title: 'Hands in Clay, Pigments & Design',
    subtitle: 'Expressive fine arts, woodworking, and tactile creation.',
    description: 'Students put on linen aprons in the sunlit art pavilion. Some mix egg tempera paints with ground minerals, others sculpt architectural bridges using terracotta clay, while older groups sketch living plants.',
    location: 'The Light Atelier',
    poster: '/src/assets/images/art_studio_creativity_1790399947468.jpg',
    videoTitle: '10:30 Create: Mineral Colors on Canvas',
    reflection: 'When fingers touch texture, neurological pathways light up.'
  },
  {
    time: '12:00',
    period: 'Garden & Nourishment',
    title: 'Farm-to-Table Lunch & Sensory Woods',
    subtitle: 'Wholesome organic meals followed by unrestrained tree-canopy play.',
    description: 'Children sit family-style at long oak refectory tables, passing ceramic bowls of seasonal vegetable soup and freshly baked sourdough. Afterwards, outdoor boots are laced for exploration in the woods.',
    location: 'Courtyard & Woodland Playground',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    videoTitle: '12:00 Explore: Lunchtime in the Garden',
    reflection: 'Sharing meals together builds lifelong social empathy and table grace.'
  },
  {
    time: '14:00',
    period: 'Tinkering & Story',
    title: 'Robotics, Literature & Creative Writing',
    subtitle: 'From simple coding logic to reading under the cedar branches.',
    description: 'The afternoon bridges analytical problem solving with storytelling. Teams build wooden gears and sensor mechanisms, while another group writes poems and binds original illustrated books in the library.',
    location: 'Cedar Tree Reading Tower & Lab',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    videoTitle: '14:00 Imagine: Building Walking Wooden Contraptions',
    reflection: 'Logic without imagination is sterile; imagination without logic is unfocused.'
  },
  {
    time: '15:30',
    period: 'Reflection & Return',
    title: 'The Closing Circle & Shared Stories',
    subtitle: 'Reuniting with parents with muddy shoes and shining eyes.',
    description: 'The day concludes in community reflection. Each student shares one discovery or appreciation. When parents arrive, children lead them by the hand to show what their minds and hands made today.',
    location: 'Central Lawn & Amphitheater',
    poster: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    videoTitle: '15:30 Return: Muddy Boots and Big Stories',
    reflection: 'The measure of a school day is not what was memorized, but what was felt.'
  }
];

export const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: 'art-atelier',
    title: 'Fine Arts & Atelier',
    category: 'Visual Expression',
    shortDesc: 'Natural mineral pigments, stoneware clay, botanical printmaking, and spatial sculpture.',
    expandedQuote: 'Creativity begins when children are given the freedom to explore without fear of making a mistake.',
    quoteAuthor: 'Ms. Ananya Sen, Master Atelierista',
    poster: '/src/assets/images/art_studio_creativity_1790399947468.jpg',
    curriculumFocus: 'Color theory, spatial thinking, material empathy',
    duration: '4 Studio Sessions Weekly'
  },
  {
    id: 'music-orchestra',
    title: 'Music & Acoustic Rhythm',
    category: 'Performing Arts',
    shortDesc: 'Orff percussion, early violin, choir vocalization, and rhythmic movement.',
    expandedQuote: 'Music gives children another way to express what words cannot.',
    quoteAuthor: 'Elena Rostova, Musical Director',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    curriculumFocus: 'Auditory discrimination, collaborative timing, melody',
    duration: 'Daily Music Immersion'
  },
  {
    id: 'nature-forestry',
    title: 'Forest Craft & Ecology',
    category: 'Natural Sciences',
    shortDesc: 'Tree species identification, weather monitoring, campfire cooking, and biodiversity tracking.',
    expandedQuote: 'In nature, mistakes are called discoveries, and curiosity is the compass.',
    quoteAuthor: 'Mr. David Vance, Forest Educator',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    curriculumFocus: 'Field ecology, seasonal cycles, environmental stewardship',
    duration: '8 Hours Outdoor Weekly'
  },
  {
    id: 'tinkering-robotics',
    title: 'Makerspace & Simple Robotics',
    category: 'Engineering & Logic',
    shortDesc: 'Wooden gear trains, analog circuitry, child-safe hand tools, and visual block logic.',
    expandedQuote: 'When children build physical mechanisms, abstract mathematical equations become tangible.',
    quoteAuthor: 'Priya Nair, Head of Primary',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    curriculumFocus: 'Kinematics, algorithmic problem-solving, structural balance',
    duration: '3 Lab Sessions Weekly'
  },
  {
    id: 'drama-storytelling',
    title: 'Oral Storytelling & Theatre',
    category: 'Language Arts',
    shortDesc: 'Puppetry, unscripted improvisational role-play, dramatic voice, and poetic recitation.',
    expandedQuote: 'Stepping into someone else’s costume is the earliest training ground for human empathy.',
    quoteAuthor: 'Maya Jensen, Drama Specialist',
    poster: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    curriculumFocus: 'Verbal confidence, emotional articulation, narrative structure',
    duration: '2 Creative Circles Weekly'
  },
  {
    id: 'movement-athletics',
    title: 'Natural Movement & Athletics',
    category: 'Physical Well-being',
    shortDesc: 'Barefoot sensory agility, gymnastics balance beams, cross-country trail runs, and team play.',
    expandedQuote: 'Physical confidence precedes intellectual resilience in every developing child.',
    quoteAuthor: 'Coach Thomas Reed',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    curriculumFocus: 'Proprioception, cardiovascular health, sportsmanship',
    duration: 'Daily Active Play'
  }
];

export const CHILDREN_ARTWORKS: ChildArtwork[] = [
  {
    id: 'art-1',
    title: 'Underwater World with Sleeping Turtles',
    artist: 'Meera K.',
    age: 7,
    grade: 'Grade 2',
    medium: 'Mineral watercolor & sea salt on handmade cotton paper',
    quote: 'When I grow up, I want to build a glass house under the sea so sea turtles can take naps on the roof.',
    curatorNote: 'Meera mixed crushed lapis lazuli pigment with ocean sea salt crystals to create genuine watery crystallization textures.',
    image: '/src/assets/images/art_studio_creativity_1790399947468.jpg'
  },
  {
    id: 'art-2',
    title: 'The Listening Cedar Tree',
    artist: 'Leo M.',
    age: 5,
    grade: 'Kindergarten',
    medium: 'Terracotta slip, charcoal, and pressed fallen autumn leaves',
    quote: 'Trees hear everything when everyone else is asleep. That’s why their branches bend towards each other.',
    curatorNote: 'Constructed after a morning listening session in the school forest where students closed eyes for 10 minutes to map sounds.',
    image: '/src/assets/images/playground_nature_garden_1790399960023.jpg'
  },
  {
    id: 'art-3',
    title: 'Solar-Powered Ladybug Haven',
    artist: 'Zara & Kabir',
    age: 8,
    grade: 'Grade 3',
    medium: 'Carved hazel wood, copper foil wire, and pinecones',
    quote: 'We made 14 tiny apartments so ladybugs and bees do not get rained on when October winds blow cold.',
    curatorNote: 'An interdisciplinary woodworking and biology project designed to house pollinator insects during winter dormancy.',
    image: '/src/assets/images/classroom_learning_1790399936353.jpg'
  },
  {
    id: 'art-4',
    title: 'Map of Tomorrow Morning',
    artist: 'Maya R.',
    age: 6,
    grade: 'Grade 1',
    medium: 'Beeswax crayons and crushed walnut ink',
    quote: 'This is where the sun sleeps before it wakes up and shines on our classroom library windows.',
    curatorNote: 'Demonstrates remarkable intuitive understanding of topological cartography and color warmth transitions.',
    image: '/src/assets/images/hero_school_campus_1790399923439.jpg'
  }
];

export const TEACHERS: TeacherProfile[] = [
  {
    id: 'ananya',
    name: 'Ms. Ananya Sen',
    role: 'Lead Atelierista & Early Years Specialist',
    experience: '11 Years in Inquiry-Led Education',
    education: 'M.Ed. Harvard Graduate School of Education, Reggio Children Certified',
    photo: '/src/assets/images/teacher_portrait_ananya_1790399970478.jpg',
    philosophy: 'I believe children learn best when curiosity leads the way. Our role is not to fill an empty jar, but to kindle a fire already crackling with questions.',
    message: 'Every child who steps into the atelier is already an artist, an architect, and a scientist. They do not need artificial encouragement; they need authentic materials, unhurried time, and respectful listeners.',
    favoriteQuestion: '“Ms. Ananya, does water get tired when it runs down the mountain?”'
  },
  {
    id: 'david',
    name: 'Mr. David Vance',
    role: 'Director of Forest & Ecological Studies',
    experience: '9 Years Field Biology & Experiential Learning',
    education: 'B.Sc. Environmental Science, University of British Columbia',
    photo: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    philosophy: 'The greatest textbook on earth is the soil right outside our boots. You cannot care for what you have never touched.',
    message: 'Rain, wind, and autumn fog are not weather events to shelter from—they are invitations to observe how living systems respond, protect themselves, and thrive.',
    favoriteQuestion: '“Can a mushroom communicate with an oak tree through the roots?”'
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Head of Sound, Rhythm & Movement',
    experience: '14 Years Early Childhood Musicology',
    education: 'Royal Academy of Music, Orff Schulwerk Master Certified',
    photo: '/src/assets/images/classroom_learning_1790399936353.jpg',
    philosophy: 'Every child possesses a pulse and a rhythm before they speak their first word. Music is their second mother tongue.',
    message: 'When children play music together, they learn the most important social lesson: you cannot shout down your neighbor if you want to create harmony.',
    favoriteQuestion: '“Why does the cello vibrate in my chest when you play the lowest string?”'
  },
  {
    id: 'priya',
    name: 'Priya Nair',
    role: 'Head of School & Primary Pedagogy',
    experience: '18 Years Academic Leadership',
    education: 'Ph.D. Developmental Psychology, Oxford University',
    photo: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    philosophy: 'We do not prepare children for some distant, abstract future world. We honor that their world right now is entirely real, vibrant, and sacred.',
    message: 'WonderNest was founded to prove that rigor and joy are not opposing forces. When intellectual curiosity is nurtured with love and dignity, excellence is the natural byproduct.',
    favoriteQuestion: '“What makes a promise real if words can disappear in the air?”'
  }
];

export const PARENT_STORIES: ParentStory[] = [
  {
    id: 'story-1',
    parentNames: 'Sarah & Marcus Vance',
    childInfo: 'Parents of Leo, Age 6 (Grade 1)',
    headline: 'He stopped asking for screens and started collecting interesting stones.',
    quote: 'At his previous school, Leo came home stressed and quiet. Within three weeks at WonderNest, he would arrive home with pockets full of pine needles, talking excitedly about how lichen lives on birch bark. He learned to read because he desperately wanted to understand the bird identification manual in the forest lab.',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    duration: '02:40',
    location: 'North Campus Meadow'
  },
  {
    id: 'story-2',
    parentNames: 'Dr. Sophie Chen',
    childInfo: 'Mother of Maya, Age 4 (Kindergarten)',
    headline: 'The educators here don’t just watch children—they study them with genuine reverence.',
    quote: 'As a neuroscientist, I was skeptical of schools that use buzzwords. What convinced me about WonderNest is the unhurried respect. The teachers listen down at eye level. Maya is treated as a complete human being whose ideas matter. The emotional safety here has allowed her quiet shyness to bloom into fearless curiosity.',
    poster: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    duration: '03:15',
    location: 'Sunlit Kindergarten Wing'
  },
  {
    id: 'story-3',
    parentNames: 'Rohan & Ananya Gupta',
    childInfo: 'Parents of Kabir, Age 9 (Grade 4)',
    headline: 'Academic depth without the anxiety factory.',
    quote: 'People told us progressive schools lack mathematical rigor. Kabir just built a functioning water pump using ratios and geometry he calculated himself in the workshop. He doesn’t see math as test drills; he sees it as the hidden architecture of physical reality.',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    duration: '02:55',
    location: 'Makerspace Courtyard'
  }
];

export const VIDEO_STORIES: VideoStory[] = [
  {
    id: 'vid-1',
    title: 'Morning Song in the Sunlit Atrium',
    category: 'MUSIC',
    duration: '02:18',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    quote: 'The acoustic warmth of 40 children singing in harmony.',
    description: 'Every Tuesday, the early years gather on the circular oak steps to sing regional folk songs accompanied by acoustic cello and gentle hand chimes.'
  },
  {
    id: 'vid-2',
    title: 'Hands in the Wet Clay Atelier',
    category: 'ART',
    duration: '03:04',
    poster: '/src/assets/images/art_studio_creativity_1790399947468.jpg',
    quote: 'Stoneware, terracotta, and the freedom of unscripted form.',
    description: 'Grade 2 students study Greek amphora shapes, turning natural clay on hand-powered kick wheels and mixing mineral iron slips.'
  },
  {
    id: 'vid-3',
    title: 'First Rain: Mud Sluices & Cedar Dams',
    category: 'PLAY',
    duration: '02:45',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    quote: 'There is no bad weather, only incredible hydrological experiments.',
    description: 'During autumn rains, children don waterproof suits to channel rainwater through wooden troughs and gravel filtration basins.'
  },
  {
    id: 'vid-4',
    title: 'The Secret Life of Honeybees',
    category: 'NATURE',
    duration: '03:22',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    quote: 'Safe observation behind safety glass in our living apiary.',
    description: 'Students document waggle dances and pollen baskets with botanical sketchbooks under the guidance of our resident beekeeper.'
  },
  {
    id: 'vid-5',
    title: 'The Great Storybook Reading Marathon',
    category: 'CLASSROOM',
    duration: '02:30',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    quote: 'Silence in the cedar tower, broken only by pages turning.',
    description: 'Our annual winter reading gathering where older students read bilingual picture books aloud to younger kindergarten peers.'
  },
  {
    id: 'vid-6',
    title: 'Autumn Harvest Soup & Bread Celebration',
    category: 'EVENTS',
    duration: '04:10',
    poster: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    quote: 'Celebrating the vegetables planted with tiny hands in spring.',
    description: 'Families join for our harvest luncheon where students prepare pumpkin soup and herbal sourdough breads grown on school grounds.'
  },
  {
    id: 'vid-7',
    title: 'Cross-Country Forest Relay',
    category: 'SPORTS',
    duration: '02:15',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    quote: 'Endurance, camaraderie, and running over pine needle trails.',
    description: 'Students navigate gentle forest trails, learning pacing, stamina, and cheering on every runner crossing the timber finish arch.'
  },
  {
    id: 'vid-8',
    title: 'Geometric Wooden Contraptions Lab',
    category: 'CLASSROOM',
    duration: '03:40',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    quote: 'Testing friction, momentum, and marble runs.',
    description: 'A morning in the physics and tinkering laboratory where teams design continuous marble paths with bells and counterweights.'
  }
];

export const VIRTUAL_TOUR_STOPS = [
  {
    id: 'entrance',
    name: 'Timber Gateway & Welcome Atrium',
    tag: 'STOP 01 OF 07',
    coords: 'Main West Access',
    description: 'Built with local Douglas fir and triple-glazed low-iron glass, the entrance pavilion connects the outdoor woodland directly to the interior common hall with zero jarring transition.',
    poster: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    keyStat: '450 m² passive solar atrium',
    highlights: ['Coat cubbies with personal family mailboxes', 'Low-decibel acoustic dampening', 'Central gathering stone fountain']
  },
  {
    id: 'kindergarten',
    name: 'Early Years Meadow Wing',
    tag: 'STOP 02 OF 07',
    coords: 'South Garden Wing',
    description: 'Curved organic walls enclose cozy learning suites for ages 3 to 5. Every room opens directly onto private herb gardens, sand sensory pits, and an open rabbit lawn.',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    keyStat: '1:6 educator-to-child ratio',
    highlights: ['Underfloor hydronic timber heating', 'Direct outdoor transition doors', 'Individual resting lofts']
  },
  {
    id: 'atelier',
    name: 'The Vaulted Light Atelier',
    tag: 'STOP 03 OF 07',
    coords: 'North Light Studios',
    description: 'The creative heartbeat of WonderNest. Soaring skylights cast pure diffuse illumination on workbenches equipped with natural clay, botanical dyes, and easels.',
    poster: '/src/assets/images/art_studio_creativity_1790399947468.jpg',
    keyStat: '100% natural daylit space',
    highlights: ['Natural stone clay sinks', 'Botanical specimen drying racks', 'Integrated woodworking benches']
  },
  {
    id: 'library',
    name: 'The Cedar Tree Reading Tower',
    tag: 'STOP 04 OF 07',
    coords: 'Central Courtyard',
    description: 'A 2-story cylindrical reading pavilion cradling a 110-year-old living cedar tree. Cushioned window seats and circular reading shelves invite unhurried deep reading.',
    poster: '/src/assets/images/classroom_learning_1790399936353.jpg',
    keyStat: '6,500+ curated volumes',
    highlights: ['Multilingual literature collection', 'Whisper-quiet acoustic design', 'Bookbinding and repair station']
  },
  {
    id: 'forest',
    name: 'The Woodland Sensory Forest',
    tag: 'STOP 05 OF 07',
    coords: 'East Boundary',
    description: 'Four acres of protected mixed deciduous woodland where outdoor forest schooling takes place daily in all seasons and weather conditions.',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    keyStat: '4.2 acres preserved forest canopy',
    highlights: ['Living willow labyrinths', 'Rainwater creek and sluice gates', 'Natural log shelter circles']
  },
  {
    id: 'lab',
    name: 'Greenhouse & Ecological Lab',
    tag: 'STOP 06 OF 07',
    coords: 'Southeast Farm Plot',
    description: 'A continuous living laboratory where students grow seasonal organic produce, observe insect pollination, test soil chemistry, and supply the school kitchen.',
    poster: '/src/assets/images/playground_nature_garden_1790399960023.jpg',
    keyStat: '40+ edible crops cultivated',
    highlights: ['Hydroponic and soil beds', 'Safe observation beehive', 'Compost and worm farm stations']
  },
  {
    id: 'amphitheatre',
    name: 'The Timber Amphitheater & Green',
    tag: 'STOP 07 OF 07',
    coords: 'Central Commons',
    description: 'Terraced into the natural hillside, this timber-stepped open-air theater hosts morning community assemblies, student drama performances, and seasonal festivals.',
    poster: '/src/assets/images/hero_school_campus_1790399923439.jpg',
    keyStat: '250 seating capacity',
    highlights: ['Acoustic shell timber backdrop', 'Perennial wildflower border', 'Integrated evening ground lighting']
  }
];
