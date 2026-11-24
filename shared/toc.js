/* MathMastery table of contents: the single source of truth for page order, titles and links.
   - built: true  -> the page exists in the site build (GitHub)
   - url          -> the page's published Claude artifact (used when not in site mode)
   - ext: true    -> an existing standalone explorer linked as-is: always opens its url, in both builds
   Add a page here, rebuild every page, and the Contents menu and Previous/Next update everywhere. */
window.MM_TOC = [
  { ch: 1, title: 'Numbers & Arithmetic', pages: [
    { id: '1.B.1', title: 'Counting and the Number Line',            built: true, url: 'https://claude.ai/artifact/Ms2KnDNrzSW8oPYWgvfwQK' },
    { id: '1.B.2', title: 'Multiplication as Stretching',            built: true, url: 'https://claude.ai/artifact/HXpqpyjnx9cBwEzYFxqd8L' },
    { id: '1.B.3', title: 'Fractions, Decimals, and the Gaps Between Them', url: 'https://claude.ai/artifact/8JgKEEYt4rYFQiWRpaWNmN', built: true },
    { id: '1.B.4', title: 'Equivalent Ratios',                       built: true, url: 'https://claude.ai/artifact/8RtDdq54Mbx1eML3iH4sDF' },
    { id: '1.B.5', title: 'The Constant of Proportionality',         built: true, url: 'https://claude.ai/artifact/6CRFQvbG3Dkin62BeT9PKL' },
    { id: '1.B.6', title: 'Graphing Proportional Relationships',     built: true, url: 'https://claude.ai/artifact/Dk2wz7bzT1rKY3QduyGiKM' },
    { id: '1.B.7', title: 'Converting Customary and Metric Units',   built: true, url: 'https://claude.ai/artifact/FXQApxvApHWy3Y4ao9oF9o' },
    { id: '1.B.8', title: 'Proportional Reasoning: Solving Problems', built: true, url: 'https://claude.ai/artifact/5BczAcmrhUzUdGzmV9sUiN' },
    { id: '1.B.9', title: 'Why We Invented Each New Kind of Number', url: 'https://claude.ai/artifact/8eeikn9pY3hdakM8VL4MhU', built: true },
  ]},
  { ch: 3, title: 'Algebra', pages: [
    { id: '3.B.1', title: 'Variables and Expressions' },
    { id: '3.B.2', title: 'Solving Equations' },
    { id: '3.B.3', title: 'Functions' },
    { id: '3.B.4', title: 'Exponents and Exponential Growth' },
    { id: '3.B.5', title: 'Logarithms (Log Explorer)', ext: true, url: 'https://claude.ai/artifact/GkbAXj1R4V1LharhQ9WgZP' },
  ]},
  { ch: 5, title: 'Trigonometry', pages: [
    { id: '5.B.1', title: 'Angles and Radians', built: true, url: 'https://claude.ai/artifact/FBpVrV9tcTSwwi2UQ4LXH3' },
    { id: '5.B.2', title: 'Sine, Cosine and Tangent on the Unit Circle (Trig Explorer)', ext: true, url: 'https://claude.ai/artifact/4xY54b5XpeoyG9FocJ9ZFZ' },
    { id: '5.B.3', title: 'Laws of Sines and Cosines (Trig Explorer, Any triangle tab)', ext: true, url: 'https://claude.ai/artifact/4xY54b5XpeoyG9FocJ9ZFZ' },
    { id: '5.B.4', title: 'Waves and Periodic Functions', built: true, url: 'https://claude.ai/artifact/Ge7zmxuBizyzBUH5Ub8pz2' },
  ]},
  { ch: 7, title: 'Linear Algebra', pages: [
    { id: '7.B.1', title: 'Vectors: Arrows and Lists', url: 'https://claude.ai/artifact/VTgdf4vZNvotfwDq58B8bx', built: true },
    { id: '7.B.2', title: 'Linear Combinations and Span', url: 'https://claude.ai/artifact/AEB3V1XuSEPRrc2SmgovLu', built: true },
    { id: '7.B.3', title: 'The Dot Product', url: 'https://claude.ai/artifact/753Sm147dog88gwo9sKhaV', built: true },
    { id: '7.B.4', title: 'A Matrix Is a Move', url: 'https://claude.ai/artifact/ELcqpcxsc7H6S6b6VHPA47', built: true },
    { id: '7.B.5', title: 'Matrix Multiplication: One Move After Another' },
    { id: '7.B.6', title: 'The Determinant' },
    { id: '7.B.7', title: 'Inverse Matrices' },
    { id: '7.B.8', title: 'Systems of Equations as Matrices' },
    { id: '7.B.9', title: 'Solving Systems by Row Reduction' },
    { id: '7.B.10', title: 'Into 3D: Vectors and 3×3 Matrices' },
    { id: '7.B.11', title: 'Matrices of Any Size: Adding, Scaling and the Transpose' },
    { id: '7.B.12', title: 'Independence, Basis and Dimension: A First Look' },
  ]},
  { ch: 8, title: 'Calculus', pages: [
    { id: '8.B.1', title: 'Limits' },
    { id: '8.B.2', title: 'Derivatives' },
    { id: '8.B.3', title: 'Integrals' },
    { id: '8.U.1', title: 'Infinite Series' },
    { id: '8.U.2', title: 'Power Series' },
    { id: '8.U.3', title: 'Taylor Approximations (Taylor Explorer)', ext: true, url: 'https://claude.ai/artifact/NbkDNnFSAGmLb5UqG4MBiB' },
  ]},
];
