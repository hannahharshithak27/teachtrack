import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://iukgeerobodzlhomxdgu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1a2dlZXJvYm9kemxob214ZGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDk1NzQsImV4cCI6MjA4OTA4NTU3NH0.7aTF-5Z5DWdH9MZ2_JdC_53K6yu5Wz-LpJPj_1TCF00";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── SUBJECTS MASTER LIST ───────────────────────────────────────────────────
const ALL_SUBJECTS = [
  "Quantum Mechanics","Data Structures","Python","Machine Learning","Operating Systems",
  "C Programming","Database Systems","SQL","Computer Networks","Cyber Security",
  "Artificial Intelligence","Opinion Mining","NLP","Web Development","JavaScript",
  "Cloud Computing","DevOps","Linear Algebra","Calculus","Discrete Mathematics",
  "Graph Theory","Probability","Statistics","Numerical Methods","Algebra",
  "Number Theory","Digital Electronics","Microprocessors","Signals and Systems","DSP",
  "Embedded Systems","IoT","VLSI Design","Microcontrollers","Communication Systems",
  "Thermodynamics","Fluid Mechanics","Machine Design","Manufacturing","Robotics",
  "Automation","Engineering Mechanics","CAD","Heat Transfer","Structural Engineering",
  "Geotechnical Engineering","Transportation Engineering","Environmental Engineering",
  "Surveying","Marketing","HRM","Finance","Business Strategy","Operations Management",
  "Genetics","Bioinformatics","Microbiology","Biochemistry","Genomics",
  "Data Science","Deep Learning","Blockchain","UI UX Design","Mobile App Development",
  "Software Engineering","Big Data","Hadoop","Computer Graphics","Information Security",
  "Ethical Hacking","Augmented Reality","Virtual Reality","DAA"
];

// ─── FACULTY DATA ─────────────────────────────────────────────────────────────
// subjects: array of subjects this faculty teaches
// feedbacks: each feedback has subjectTaught field + internals + attendance
const INITIAL_FACULTY = [
{id:1,name:"Dr. Kavitha Nair",dept:"Physics",avatar:"KN",
 subjects:["Quantum Mechanics","Signals and Systems"],
 feedbacks:[
  {id:101,student:"Ravi Teja",subjectTaught:"Quantum Mechanics",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Makes quantum physics feel simple!",date:"01/03/2026"},
  {id:102,student:"Lakshmi Devi",subjectTaught:"Quantum Mechanics",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Great at breaking down complex topics.",date:"02/03/2026"},
  {id:103,student:"Naveen Goud",subjectTaught:"Signals and Systems",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Truly inspiring faculty!",date:"03/03/2026"},
  {id:104,student:"Preethi Rao",subjectTaught:"Quantum Mechanics",teaching:4,communication:5,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Always on time, very organized.",date:"04/03/2026"},
  {id:105,student:"Vikram Nair",subjectTaught:"Signals and Systems",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Top-class lectures every session.",date:"05/03/2026"},
]},
{id:2,name:"Dr. Ramesh Kumar",dept:"Computer Science",avatar:"RK",
 subjects:["Data Structures","Python","C Programming"],
 feedbacks:[
  {id:201,student:"Anjali Singh",subjectTaught:"Data Structures",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:3,attendance:4,comment:"Very clear explanations on DS algorithms.",date:"01/03/2026"},
  {id:202,student:"Suresh Babu",subjectTaught:"Python",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:4,attendance:4,comment:"Python sessions are interactive and fun.",date:"02/03/2026"},
  {id:203,student:"Divya Rao",subjectTaught:"Data Structures",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:4,internals:3,attendance:3,comment:"Good real-world examples.",date:"03/03/2026"},
  {id:204,student:"Kiran Kumar",subjectTaught:"C Programming",teaching:3,communication:4,knowledge:5,punctuality:3,engagement:4,internals:3,attendance:3,comment:"Could be more punctual.",date:"04/03/2026"},
]},
{id:3,name:"Dr. Lavanya Devi",dept:"Computer Science",avatar:"LD",
 subjects:["Machine Learning","Python","Data Science"],
 feedbacks:[
  {id:301,student:"Rahul Sharma",subjectTaught:"Machine Learning",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Best ML professor in the department!",date:"01/03/2026"},
  {id:302,student:"Pooja Mehta",subjectTaught:"Python",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Python ML labs are excellent.",date:"02/03/2026"},
  {id:303,student:"Arun Verma",subjectTaught:"Machine Learning",teaching:4,communication:5,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Very knowledgeable and approachable.",date:"03/03/2026"},
  {id:304,student:"Meena Pillai",subjectTaught:"Data Science",teaching:5,communication:4,knowledge:4,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Engaging classes with hands-on projects.",date:"04/03/2026"},
  {id:305,student:"Sai Charan",subjectTaught:"Python",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Connects theory with practice perfectly.",date:"05/03/2026"},
]},
{id:4,name:"Dr. Arjun Rao",dept:"Computer Science",avatar:"AR",
 subjects:["Operating Systems","C Programming","DAA"],
 feedbacks:[
  {id:401,student:"Harish Babu",subjectTaught:"Operating Systems",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:2,attendance:2,comment:"OS concepts covered well but pace is fast.",date:"01/03/2026"},
  {id:402,student:"Swathi Reddy",subjectTaught:"DAA",teaching:4,communication:3,knowledge:5,punctuality:4,engagement:3,internals:3,attendance:3,comment:"Deep subject knowledge.",date:"02/03/2026"},
  {id:403,student:"Manoj Kumar",subjectTaught:"C Programming",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:4,internals:2,attendance:3,comment:"C programming labs need more time.",date:"03/03/2026"},
]},
{id:5,name:"Dr. Sunita Sharma",dept:"Computer Science",avatar:"SS",
 subjects:["Database Systems","SQL","Big Data"],
 feedbacks:[
  {id:501,student:"Pallavi Sharma",subjectTaught:"Database Systems",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:4,comment:"SQL concepts explained with great clarity.",date:"01/03/2026"},
  {id:502,student:"Rahul Nair",subjectTaught:"SQL",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Database design sessions are very practical.",date:"02/03/2026"},
  {id:503,student:"Deepa Rao",subjectTaught:"Database Systems",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:5,attendance:5,comment:"Query optimization examples very helpful.",date:"03/03/2026"},
  {id:504,student:"Ajay Krishna",subjectTaught:"Big Data",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Good at handling student doubts.",date:"04/03/2026"},
]},
{id:6,name:"Dr. Vikram Patel",dept:"Computer Science",avatar:"VP",
 subjects:["Computer Networks","Cyber Security","Information Security"],
 feedbacks:[
  {id:601,student:"Nisha Verma",subjectTaught:"Computer Networks",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:3,attendance:3,comment:"Networking concepts very clearly explained.",date:"01/03/2026"},
  {id:602,student:"Rohit Mishra",subjectTaught:"Cyber Security",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Cyber security needs more practical sessions.",date:"02/03/2026"},
  {id:603,student:"Kavitha Sinha",subjectTaught:"Information Security",teaching:4,communication:3,knowledge:5,punctuality:4,engagement:4,internals:3,attendance:3,comment:"Good theoretical foundation.",date:"03/03/2026"},
]},
{id:7,name:"Dr. Anjali Mehta",dept:"Computer Science",avatar:"AM",
 subjects:["Artificial Intelligence","Python","Machine Learning"],
 feedbacks:[
  {id:701,student:"Tarun Patel",subjectTaught:"Artificial Intelligence",teaching:5,communication:5,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"AI sessions are thought-provoking and inspiring.",date:"01/03/2026"},
  {id:702,student:"Ishita Bose",subjectTaught:"Python",teaching:4,communication:5,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Python AI demos are very effective.",date:"02/03/2026"},
  {id:703,student:"Varun Das",subjectTaught:"Artificial Intelligence",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Exceptional faculty for AI subject.",date:"03/03/2026"},
  {id:704,student:"Rina Patel",subjectTaught:"Machine Learning",teaching:4,communication:5,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Always encourages critical thinking.",date:"04/03/2026"},
]},
{id:8,name:"Dr. Rohit Verma",dept:"Computer Science",avatar:"RV",
 subjects:["Opinion Mining","NLP","DAA"],
 feedbacks:[
  {id:801,student:"Anil Kumar",subjectTaught:"Opinion Mining",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:3,attendance:3,comment:"NLP research topics explained well.",date:"01/03/2026"},
  {id:802,student:"Sneha Reddy",subjectTaught:"DAA",teaching:3,communication:4,knowledge:5,punctuality:3,engagement:3,internals:2,attendance:2,comment:"More coding examples would help.",date:"02/03/2026"},
  {id:803,student:"Kunal Shah",subjectTaught:"Opinion Mining",teaching:4,communication:3,knowledge:4,punctuality:4,engagement:4,internals:3,attendance:3,comment:"Opinion mining projects are interesting.",date:"03/03/2026"},
]},
{id:9,name:"Dr. Neha Gupta",dept:"Computer Science",avatar:"NG",
 subjects:["Web Development","JavaScript","UI UX Design"],
 feedbacks:[
  {id:901,student:"Devendra Singh",subjectTaught:"Web Development",teaching:5,communication:5,knowledge:4,punctuality:5,engagement:5,internals:5,attendance:5,comment:"JavaScript sessions are very hands-on!",date:"01/03/2026"},
  {id:902,student:"Aishwarya Iyer",subjectTaught:"JavaScript",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Web dev projects assigned are practical.",date:"02/03/2026"},
  {id:903,student:"Pankaj Malhotra",subjectTaught:"UI UX Design",teaching:5,communication:5,knowledge:4,punctuality:5,engagement:5,internals:4,attendance:4,comment:"Frontend and backend both covered thoroughly.",date:"03/03/2026"},
]},
{id:10,name:"Dr. Karthik Reddy",dept:"Computer Science",avatar:"KR",
 subjects:["Cloud Computing","DevOps","Big Data"],
 feedbacks:[
  {id:1001,student:"Manish Arora",subjectTaught:"Cloud Computing",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Cloud concepts with AWS demos are great.",date:"01/03/2026"},
  {id:1002,student:"Radhika Kapoor",subjectTaught:"DevOps",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:2,attendance:2,comment:"DevOps pipeline needs more examples.",date:"02/03/2026"},
  {id:1003,student:"Kunal Mehta",subjectTaught:"Cloud Computing",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:3,attendance:3,comment:"Practical DevOps exposure is excellent.",date:"03/03/2026"},
]},
{id:11,name:"Dr. Priya Iyer",dept:"Mathematics",avatar:"PI",
 subjects:["Linear Algebra","Calculus","Numerical Methods"],
 feedbacks:[
  {id:1101,student:"Aditi Sharma",subjectTaught:"Linear Algebra",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Best maths professor! Concepts are crystal clear.",date:"01/03/2026"},
  {id:1102,student:"Nikhil Jain",subjectTaught:"Calculus",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Linear algebra visualizations are very helpful.",date:"02/03/2026"},
  {id:1103,student:"Kavya Menon",subjectTaught:"Linear Algebra",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Calculus derivations explained step by step.",date:"03/03/2026"},
  {id:1104,student:"Rohini Desai",subjectTaught:"Numerical Methods",teaching:4,communication:5,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Very patient with students.",date:"04/03/2026"},
  {id:1105,student:"Sameer Gupta",subjectTaught:"Calculus",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Inspiring teaching style!",date:"05/03/2026"},
]},
{id:12,name:"Dr. Rajesh Singh",dept:"Mathematics",avatar:"RS",
 subjects:["Discrete Mathematics","Graph Theory","DAA"],
 feedbacks:[
  {id:1201,student:"Ravi Teja",subjectTaught:"Discrete Mathematics",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:2,attendance:2,comment:"Graph theory is difficult but explained ok.",date:"01/03/2026"},
  {id:1202,student:"Anjali Reddy",subjectTaught:"Graph Theory",teaching:4,communication:3,knowledge:5,punctuality:4,engagement:3,internals:3,attendance:3,comment:"Strong subject knowledge.",date:"02/03/2026"},
  {id:1203,student:"Suresh Kumar",subjectTaught:"DAA",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:4,internals:2,attendance:2,comment:"More examples needed for discrete math.",date:"03/03/2026"},
]},
{id:13,name:"Dr. Meera Nair",dept:"Mathematics",avatar:"MN",
 subjects:["Probability","Statistics","Data Science"],
 feedbacks:[
  {id:1301,student:"Divya Rao",subjectTaught:"Statistics",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Statistics with real datasets is very useful.",date:"01/03/2026"},
  {id:1302,student:"Kiran Babu",subjectTaught:"Probability",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Probability concepts made easy.",date:"02/03/2026"},
  {id:1303,student:"Pallavi Iyer",subjectTaught:"Statistics",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Engaging lectures on distributions.",date:"03/03/2026"},
  {id:1304,student:"Rahul Das",subjectTaught:"Data Science",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:3,attendance:3,comment:"Good problem solving approach.",date:"04/03/2026"},
]},
{id:14,name:"Dr. Deepak Sharma",dept:"Mathematics",avatar:"DS",
 subjects:["Numerical Methods","Calculus","Linear Algebra"],
 feedbacks:[
  {id:1401,student:"Deepa Pillai",subjectTaught:"Numerical Methods",teaching:3,communication:3,knowledge:4,punctuality:2,engagement:3,internals:2,attendance:2,comment:"Often late to class, but explains well.",date:"01/03/2026"},
  {id:1402,student:"Ajay Krishna",subjectTaught:"Calculus",teaching:4,communication:3,knowledge:5,punctuality:3,engagement:3,internals:3,attendance:2,comment:"Numerical methods coverage is thorough.",date:"02/03/2026"},
  {id:1403,student:"Nisha Singh",subjectTaught:"Linear Algebra",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:3,internals:2,attendance:2,comment:"Could engage students more.",date:"03/03/2026"},
]},
{id:15,name:"Dr. Asha Menon",dept:"Mathematics",avatar:"AM",
 subjects:["Algebra","Number Theory","Discrete Mathematics"],
 feedbacks:[
  {id:1501,student:"Rohit Kumar",subjectTaught:"Algebra",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Number theory sessions are fascinating.",date:"01/03/2026"},
  {id:1502,student:"Kavitha Rao",subjectTaught:"Number Theory",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Algebra proofs are well structured.",date:"02/03/2026"},
  {id:1503,student:"Tarun Mishra",subjectTaught:"Discrete Mathematics",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Very interactive teaching style.",date:"03/03/2026"},
]},
{id:16,name:"Dr. Rahul Khanna",dept:"Electronics",avatar:"RK",
 subjects:["Digital Electronics","Microprocessors","Embedded Systems"],
 feedbacks:[
  {id:1601,student:"Ishita Bose",subjectTaught:"Digital Electronics",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:3,attendance:3,comment:"Digital circuits explained with good examples.",date:"01/03/2026"},
  {id:1602,student:"Varun Das",subjectTaught:"Microprocessors",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:2,attendance:2,comment:"Microprocessor lab needs more practice time.",date:"02/03/2026"},
  {id:1603,student:"Rina Patel",subjectTaught:"Embedded Systems",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:3,attendance:3,comment:"Good at explaining 8085 architecture.",date:"03/03/2026"},
]},
{id:17,name:"Dr. Sneha Kapoor",dept:"Electronics",avatar:"SK",
 subjects:["Signals and Systems","DSP","Communication Systems"],
 feedbacks:[
  {id:1701,student:"Sneha Reddy",subjectTaught:"Signals and Systems",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Signals and systems covered very systematically.",date:"01/03/2026"},
  {id:1702,student:"Kunal Shah",subjectTaught:"DSP",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:5,internals:4,attendance:4,comment:"DSP MATLAB demos are excellent.",date:"02/03/2026"},
  {id:1703,student:"Devendra Singh",subjectTaught:"Communication Systems",teaching:5,communication:4,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Very punctual and well-prepared.",date:"03/03/2026"},
]},
{id:18,name:"Dr. Amit Agarwal",dept:"Electronics",avatar:"AA",
 subjects:["Embedded Systems","IoT","Microcontrollers"],
 feedbacks:[
  {id:1801,student:"Aishwarya Iyer",subjectTaught:"IoT",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:5,internals:4,attendance:4,comment:"IoT projects are practical and relevant.",date:"01/03/2026"},
  {id:1802,student:"Pankaj Malhotra",subjectTaught:"Embedded Systems",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Embedded C coding sessions are great.",date:"02/03/2026"},
  {id:1803,student:"Shalini Gupta",subjectTaught:"Microcontrollers",teaching:4,communication:5,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Very helpful during project submissions.",date:"03/03/2026"},
  {id:1804,student:"Manish Arora",subjectTaught:"IoT",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Raspberry Pi and Arduino demos are fun!",date:"04/03/2026"},
]},
{id:19,name:"Dr. Vivek Joshi",dept:"Mechanical",avatar:"VJ",
 subjects:["Robotics","Automation","Engineering Mechanics"],
 feedbacks:[
  {id:1901,student:"Deepa Pillai",subjectTaught:"Robotics",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Robotics lab sessions are the best!",date:"01/03/2026"},
  {id:1902,student:"Ajay Krishna",subjectTaught:"Automation",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Automation with industrial examples.",date:"02/03/2026"},
  {id:1903,student:"Nisha Singh",subjectTaught:"Robotics",teaching:4,communication:5,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Very passionate about robotics.",date:"03/03/2026"},
  {id:1904,student:"Rohit Kumar",subjectTaught:"Engineering Mechanics",teaching:5,communication:4,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Hands-on robot building is amazing!",date:"04/03/2026"},
]},
{id:20,name:"Dr. Rekha Iyer",dept:"Civil",avatar:"RI",
 subjects:["Environmental Engineering","Geotechnical Engineering","Surveying"],
 feedbacks:[
  {id:2001,student:"Nikhil Jain",subjectTaught:"Environmental Engineering",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Environmental impact explained brilliantly.",date:"01/03/2026"},
  {id:2002,student:"Kavya Menon",subjectTaught:"Environmental Engineering",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Water treatment process clearly taught.",date:"02/03/2026"},
  {id:2003,student:"Rohini Desai",subjectTaught:"Geotechnical Engineering",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Inspiring lecture on sustainable engineering.",date:"03/03/2026"},
  {id:2004,student:"Sameer Gupta",subjectTaught:"Surveying",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Great awareness about environmental issues.",date:"04/03/2026"},
]},
{id:21,name:"Dr. Pankaj Malhotra",dept:"Management",avatar:"PM",
 subjects:["Marketing","Business Strategy","Operations Management"],
 feedbacks:[
  {id:2101,student:"Divya Rao",subjectTaught:"Marketing",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Marketing case studies from top brands!",date:"01/03/2026"},
  {id:2102,student:"Kiran Babu",subjectTaught:"Business Strategy",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Consumer behaviour insights are practical.",date:"02/03/2026"},
  {id:2103,student:"Pallavi Iyer",subjectTaught:"Marketing",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Industry guest lectures organised frequently.",date:"03/03/2026"},
  {id:2104,student:"Rahul Das",subjectTaught:"Operations Management",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Very engaging lectures.",date:"04/03/2026"},
]},
{id:22,name:"Dr. Aishwarya Iyer",dept:"Information Technology",avatar:"AI",
 subjects:["Software Engineering","UI UX Design","Web Development"],
 feedbacks:[
  {id:2201,student:"Nikhil Jain",subjectTaught:"Software Engineering",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Software lifecycle covered end to end!",date:"01/03/2026"},
  {id:2202,student:"Kavya Menon",subjectTaught:"UI UX Design",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Selenium testing framework taught well.",date:"02/03/2026"},
  {id:2203,student:"Rohini Desai",subjectTaught:"Software Engineering",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Agile methodology explained with projects.",date:"03/03/2026"},
]},
{id:23,name:"Dr. Rina Patel",dept:"Information Technology",avatar:"RP",
 subjects:["Information Security","Ethical Hacking","Cyber Security"],
 feedbacks:[
  {id:2301,student:"Deepa Pillai",subjectTaught:"Ethical Hacking",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Ethical hacking labs are incredibly engaging!",date:"01/03/2026"},
  {id:2302,student:"Ajay Krishna",subjectTaught:"Information Security",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Penetration testing demos are eye-opening.",date:"02/03/2026"},
  {id:2303,student:"Nisha Singh",subjectTaught:"Cyber Security",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Information security made fun and practical.",date:"03/03/2026"},
  {id:2304,student:"Rohit Kumar",subjectTaught:"Ethical Hacking",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Cybersecurity frameworks explained clearly.",date:"04/03/2026"},
  {id:2305,student:"Kavitha Rao",subjectTaught:"Information Security",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Best security faculty in the department!",date:"05/03/2026"},
]},
{id:24,name:"Dr. Kavya Menon",dept:"Biotechnology",avatar:"KM",
 subjects:["Microbiology","Immunology","Biochemistry"],
 feedbacks:[
  {id:2401,student:"Nikhil Jain",subjectTaught:"Microbiology",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Immunology concepts with diagrams brilliantly.",date:"01/03/2026"},
  {id:2402,student:"Rohini Desai",subjectTaught:"Immunology",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Very inspiring faculty!",date:"03/03/2026"},
  {id:2403,student:"Sameer Gupta",subjectTaught:"Microbiology",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Excellent interaction with students.",date:"04/03/2026"},
  {id:2404,student:"Ravi Teja",subjectTaught:"Biochemistry",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Research-oriented teaching style.",date:"05/03/2026"},
]},
{id:25,name:"Dr. Anil Kumar",dept:"Computer Science",avatar:"AK",
 subjects:["Data Science","Python","Machine Learning","Opinion Mining"],
 feedbacks:[
  {id:2501,student:"Ajay Krishna",subjectTaught:"Data Science",teaching:5,communication:5,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Data science with real datasets is fantastic!",date:"01/03/2026"},
  {id:2502,student:"Nisha Singh",subjectTaught:"Python",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Pandas and numpy taught very well.",date:"02/03/2026"},
  {id:2503,student:"Rohit Kumar",subjectTaught:"Machine Learning",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Kaggle competitions used in class are great.",date:"03/03/2026"},
  {id:2504,student:"Kavitha Rao",subjectTaught:"Opinion Mining",teaching:5,communication:5,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Opinion mining with sentiment analysis is excellent!",date:"04/03/2026"},
]},
{id:26,name:"Dr. Sneha Reddy",dept:"Computer Science",avatar:"SR",
 subjects:["Deep Learning","Artificial Intelligence","Opinion Mining"],
 feedbacks:[
  {id:2601,student:"Tarun Mishra",subjectTaught:"Deep Learning",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Deep learning with TensorFlow is great!",date:"01/03/2026"},
  {id:2602,student:"Ishita Bose",subjectTaught:"Artificial Intelligence",teaching:4,communication:5,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Neural network visualizations are very helpful.",date:"02/03/2026"},
  {id:2603,student:"Varun Das",subjectTaught:"Deep Learning",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:4,attendance:4,comment:"AI research papers discussed in class.",date:"03/03/2026"},
  {id:2604,student:"Rina Patel",subjectTaught:"Opinion Mining",teaching:4,communication:5,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:4,comment:"Opinion mining course very relevant today.",date:"04/03/2026"},
  {id:2605,student:"Anil Kumar",subjectTaught:"Deep Learning",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:5,comment:"Best deep learning faculty!",date:"05/03/2026"},
]},
{id:27,name:"Dr. Mohan Rao",dept:"Mechanical",avatar:"MR",
 subjects:["Machine Design","Manufacturing","CAD"],
 feedbacks:[
  {id:2701,student:"Divya Rao",subjectTaught:"Machine Design",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Manufacturing processes need more visuals.",date:"01/03/2026"},
  {id:2702,student:"Kiran Babu",subjectTaught:"CAD",teaching:4,communication:3,knowledge:5,punctuality:4,engagement:3,internals:4,attendance:3,comment:"Strong in machine design theory.",date:"02/03/2026"},
  {id:2703,student:"Pallavi Iyer",subjectTaught:"Manufacturing",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:4,internals:3,attendance:3,comment:"CAD tool training is useful.",date:"03/03/2026"},
  {id:2704,student:"Rahul Das",subjectTaught:"Machine Design",teaching:4,communication:3,knowledge:4,punctuality:4,engagement:3,internals:3,attendance:3,comment:"Decent overall teaching.",date:"04/03/2026"},
]},
{id:28,name:"Dr. Ritu Sharma",dept:"Mechanical",avatar:"RS",
 subjects:["Thermodynamics","Fluid Mechanics","Heat Transfer"],
 feedbacks:[
  {id:2801,student:"Ravi Teja",subjectTaught:"Thermodynamics",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Thermodynamics laws with real examples.",date:"01/03/2026"},
  {id:2802,student:"Anjali Reddy",subjectTaught:"Fluid Mechanics",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:5,attendance:5,comment:"Fluid mechanics derivations are very clear.",date:"02/03/2026"},
  {id:2803,student:"Suresh Kumar",subjectTaught:"Heat Transfer",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Very engaging lecture style.",date:"03/03/2026"},
]},
{id:29,name:"Dr. Kiran Patel",dept:"Mechanical",avatar:"KP",
 subjects:["Engineering Mechanics","CAD","Manufacturing"],
 feedbacks:[
  {id:2901,student:"Kavitha Rao",subjectTaught:"Engineering Mechanics",teaching:4,communication:4,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Engineering mechanics problems step by step.",date:"01/03/2026"},
  {id:2902,student:"Tarun Mishra",subjectTaught:"CAD",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"CAD software needs more lab hours.",date:"02/03/2026"},
  {id:2903,student:"Ishita Bose",subjectTaught:"Manufacturing",teaching:4,communication:3,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Good knowledge of solid mechanics.",date:"03/03/2026"},
]},
{id:30,name:"Dr. Sanjay Kulkarni",dept:"Civil",avatar:"SK",
 subjects:["Structural Engineering","Geotechnical Engineering","Surveying"],
 feedbacks:[
  {id:3001,student:"Sneha Reddy",subjectTaught:"Structural Engineering",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Structural design problems well illustrated.",date:"01/03/2026"},
  {id:3002,student:"Kunal Shah",subjectTaught:"Geotechnical Engineering",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:5,attendance:5,comment:"Concrete technology experiments are great.",date:"02/03/2026"},
  {id:3003,student:"Devendra Singh",subjectTaught:"Surveying",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Very helpful during project work.",date:"03/03/2026"},
  {id:3004,student:"Aishwarya Iyer",subjectTaught:"Structural Engineering",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"In-depth coverage of structural analysis.",date:"04/03/2026"},
]},
{id:31,name:"Dr. Harish Gupta",dept:"Civil",avatar:"HG",
 subjects:["Transportation Engineering","Environmental Engineering","Surveying"],
 feedbacks:[
  {id:3101,student:"Radhika Kapoor",subjectTaught:"Transportation Engineering",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Highway design case studies are insightful.",date:"01/03/2026"},
  {id:3102,student:"Kunal Mehta",subjectTaught:"Environmental Engineering",teaching:4,communication:5,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:5,comment:"Transportation planning explained practically.",date:"02/03/2026"},
  {id:3103,student:"Aditi Sharma",subjectTaught:"Transportation Engineering",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:4,comment:"Passionate about smart transportation.",date:"03/03/2026"},
]},
{id:32,name:"Dr. Ajay Sharma",dept:"Civil",avatar:"AS",
 subjects:["Structural Engineering","CAD","Surveying"],
 feedbacks:[
  {id:3201,student:"Ravi Teja",subjectTaught:"Structural Engineering",teaching:3,communication:3,knowledge:4,punctuality:2,engagement:3,internals:2,attendance:2,comment:"Surveying field work is good but starts late.",date:"01/03/2026"},
  {id:3202,student:"Anjali Reddy",subjectTaught:"CAD",teaching:4,communication:3,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Construction management cases helpful.",date:"02/03/2026"},
  {id:3203,student:"Suresh Kumar",subjectTaught:"Surveying",teaching:3,communication:4,knowledge:5,punctuality:3,engagement:4,internals:3,attendance:3,comment:"Very knowledgeable.",date:"03/03/2026"},
]},
{id:33,name:"Dr. Shalini Gupta",dept:"Management",avatar:"SG",
 subjects:["HRM","Business Strategy","Operations Management"],
 feedbacks:[
  {id:3301,student:"Deepa Pillai",subjectTaught:"HRM",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"HR with real company examples.",date:"01/03/2026"},
  {id:3302,student:"Ajay Krishna",subjectTaught:"Business Strategy",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:5,attendance:5,comment:"Leadership sessions are very motivating.",date:"02/03/2026"},
  {id:3303,student:"Nisha Singh",subjectTaught:"HRM",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Role plays and group activities interesting.",date:"03/03/2026"},
]},
{id:34,name:"Dr. Manish Arora",dept:"Management",avatar:"MA",
 subjects:["Finance","Business Strategy","Operations Management"],
 feedbacks:[
  {id:3401,student:"Rohit Kumar",subjectTaught:"Finance",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Investment with market data is excellent.",date:"01/03/2026"},
  {id:3402,student:"Kavitha Rao",subjectTaught:"Operations Management",teaching:3,communication:3,knowledge:5,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Financial modelling needs more practice.",date:"02/03/2026"},
  {id:3403,student:"Tarun Mishra",subjectTaught:"Finance",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Strong finance background.",date:"03/03/2026"},
  {id:3404,student:"Ishita Bose",subjectTaught:"Business Strategy",teaching:4,communication:4,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Good at explaining valuations.",date:"04/03/2026"},
]},
{id:35,name:"Dr. Radhika Kapoor",dept:"Management",avatar:"RK",
 subjects:["Business Strategy","Marketing","Finance"],
 feedbacks:[
  {id:3501,student:"Varun Das",subjectTaught:"Business Strategy",teaching:5,communication:5,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:4,comment:"Startup case studies are very motivating!",date:"01/03/2026"},
  {id:3502,student:"Rina Patel",subjectTaught:"Marketing",teaching:4,communication:5,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:5,comment:"Entrepreneurship sessions spark new ideas.",date:"02/03/2026"},
  {id:3503,student:"Anil Kumar",subjectTaught:"Finance",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:4,comment:"Business model canvas workshop was great.",date:"03/03/2026"},
]},
{id:36,name:"Dr. Aditi Sharma",dept:"Biotechnology",avatar:"AS",
 subjects:["Genetics","Microbiology","Biochemistry"],
 feedbacks:[
  {id:3601,student:"Aishwarya Iyer",subjectTaught:"Genetics",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:5,attendance:5,comment:"Genetics experiments in lab are excellent.",date:"01/03/2026"},
  {id:3602,student:"Pankaj Malhotra",subjectTaught:"Microbiology",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Molecular biology concepts made easy.",date:"02/03/2026"},
  {id:3603,student:"Shalini Gupta",subjectTaught:"Genetics",teaching:5,communication:4,knowledge:4,punctuality:5,engagement:4,internals:5,attendance:5,comment:"Very up to date with latest research.",date:"03/03/2026"},
  {id:3604,student:"Manish Arora",subjectTaught:"Biochemistry",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Passionate about genetics research.",date:"04/03/2026"},
]},
{id:37,name:"Dr. Nikhil Jain",dept:"Biotechnology",avatar:"NJ",
 subjects:["Microbiology","Genetics","Biochemistry"],
 feedbacks:[
  {id:3701,student:"Radhika Kapoor",subjectTaught:"Microbiology",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Python for bioinformatics is taught very well.",date:"01/03/2026"},
  {id:3702,student:"Kunal Mehta",subjectTaught:"Genetics",teaching:3,communication:4,knowledge:5,punctuality:3,engagement:3,internals:3,attendance:3,comment:"More sequence analysis tools needed.",date:"02/03/2026"},
  {id:3703,student:"Aditi Sharma",subjectTaught:"Biochemistry",teaching:4,communication:3,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Computational biology covered well.",date:"03/03/2026"},
]},
{id:38,name:"Dr. Rohini Desai",dept:"Biotechnology",avatar:"RD",
 subjects:["Biochemistry","Microbiology","Genetics"],
 feedbacks:[
  {id:3801,student:"Anjali Reddy",subjectTaught:"Biochemistry",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Cell biology experiments are well structured.",date:"01/03/2026"},
  {id:3802,student:"Suresh Kumar",subjectTaught:"Microbiology",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Biochemistry calculations need more practice.",date:"02/03/2026"},
  {id:3803,student:"Divya Rao",subjectTaught:"Genetics",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Metabolic pathways explained clearly.",date:"03/03/2026"},
]},
{id:39,name:"Dr. Sameer Gupta",dept:"Biotechnology",avatar:"SG",
 subjects:["Microbiology","Biochemistry","Genetics"],
 feedbacks:[
  {id:3901,student:"Kiran Babu",subjectTaught:"Microbiology",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Genomics research topics are cutting edge.",date:"01/03/2026"},
  {id:3902,student:"Pallavi Iyer",subjectTaught:"Biochemistry",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:5,attendance:5,comment:"Proteomics data analysis sessions are great.",date:"02/03/2026"},
  {id:3903,student:"Rahul Das",subjectTaught:"Genetics",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Very up to date with latest genomics tools.",date:"03/03/2026"},
  {id:3904,student:"Deepa Pillai",subjectTaught:"Microbiology",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Good at linking genomics with medicine.",date:"04/03/2026"},
]},
{id:40,name:"Dr. Tarun Mishra",dept:"Computer Science",avatar:"TM",
 subjects:["Blockchain","Cryptography","Computer Networks"],
 feedbacks:[
  {id:4001,student:"Sneha Reddy",subjectTaught:"Blockchain",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Blockchain concepts clearly explained.",date:"01/03/2026"},
  {id:4002,student:"Kunal Shah",subjectTaught:"Cryptography",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Cryptography proofs need simplification.",date:"02/03/2026"},
  {id:4003,student:"Devendra Singh",subjectTaught:"Blockchain",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Smart contracts demo was excellent.",date:"03/03/2026"},
]},
{id:41,name:"Dr. Ishita Bose",dept:"Computer Science",avatar:"IB",
 subjects:["UI UX Design","Web Development","JavaScript"],
 feedbacks:[
  {id:4101,student:"Aishwarya Iyer",subjectTaught:"UI UX Design",teaching:5,communication:5,knowledge:4,punctuality:5,engagement:5,internals:5,attendance:5,comment:"Figma and design thinking sessions are amazing!",date:"01/03/2026"},
  {id:4102,student:"Pankaj Malhotra",subjectTaught:"Web Development",teaching:4,communication:5,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Web dev with React is taught practically.",date:"02/03/2026"},
  {id:4103,student:"Shalini Gupta",subjectTaught:"UI UX Design",teaching:5,communication:4,knowledge:4,punctuality:5,engagement:5,internals:5,attendance:5,comment:"UI portfolio reviews are very helpful.",date:"03/03/2026"},
  {id:4104,student:"Manish Arora",subjectTaught:"JavaScript",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Very creative and inspiring faculty.",date:"04/03/2026"},
]},
{id:42,name:"Dr. Rahul Saxena",dept:"Computer Science",avatar:"RS",
 subjects:["Mobile App Development","JavaScript","Web Development"],
 feedbacks:[
  {id:4201,student:"Radhika Kapoor",subjectTaught:"Mobile App Development",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Android app development is very hands-on.",date:"01/03/2026"},
  {id:4202,student:"Kunal Mehta",subjectTaught:"JavaScript",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Flutter section needs more time.",date:"02/03/2026"},
  {id:4203,student:"Aditi Sharma",subjectTaught:"Mobile App Development",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"App deployment to Play Store is covered.",date:"03/03/2026"},
]},
{id:43,name:"Dr. Pooja Bansal",dept:"Electronics",avatar:"PB",
 subjects:["VLSI Design","Microcontrollers","Digital Electronics"],
 feedbacks:[
  {id:4301,student:"Radhika Kapoor",subjectTaught:"VLSI Design",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"VLSI tools need more explanation.",date:"01/03/2026"},
  {id:4302,student:"Kunal Mehta",subjectTaught:"Microcontrollers",teaching:4,communication:3,knowledge:5,punctuality:4,engagement:3,internals:4,attendance:3,comment:"Deep knowledge in VLSI area.",date:"02/03/2026"},
  {id:4303,student:"Aditi Sharma",subjectTaught:"Digital Electronics",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:4,internals:3,attendance:3,comment:"Microcontroller labs are good.",date:"03/03/2026"},
]},
{id:44,name:"Dr. Suresh Nair",dept:"Electronics",avatar:"SN",
 subjects:["Communication Systems","Signals and Systems","DSP"],
 feedbacks:[
  {id:4401,student:"Nikhil Jain",subjectTaught:"Communication Systems",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Communication theory covered in depth.",date:"01/03/2026"},
  {id:4402,student:"Kavya Menon",subjectTaught:"Signals and Systems",teaching:4,communication:5,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:5,comment:"Wireless networks explained with diagrams.",date:"02/03/2026"},
  {id:4403,student:"Rohini Desai",subjectTaught:"DSP",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:4,comment:"Excellent at explaining modulation techniques.",date:"03/03/2026"},
  {id:4404,student:"Sameer Gupta",subjectTaught:"Communication Systems",teaching:4,communication:4,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Good overall faculty.",date:"04/03/2026"},
]},
{id:45,name:"Dr. Rahul Khanna",dept:"Electronics",avatar:"RK",
 subjects:["Digital Electronics","Microprocessors","Embedded Systems"],
 feedbacks:[
  {id:4501,student:"Ishita Bose",subjectTaught:"Digital Electronics",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Digital circuits explained with good examples.",date:"01/03/2026"},
  {id:4502,student:"Varun Das",subjectTaught:"Microprocessors",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Microprocessor lab needs more practice time.",date:"02/03/2026"},
  {id:4503,student:"Rina Patel",subjectTaught:"Embedded Systems",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Good at explaining 8085 architecture.",date:"03/03/2026"},
]},
{id:46,name:"Dr. Kunal Shah",dept:"Information Technology",avatar:"KS",
 subjects:["Big Data","Hadoop","Cloud Computing"],
 feedbacks:[
  {id:4601,student:"Ravi Teja",subjectTaught:"Big Data",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Hadoop ecosystem explained systematically.",date:"01/03/2026"},
  {id:4602,student:"Anjali Reddy",subjectTaught:"Hadoop",teaching:3,communication:3,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Spark sessions need more examples.",date:"02/03/2026"},
  {id:4603,student:"Suresh Kumar",subjectTaught:"Big Data",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Big data pipelines explained well.",date:"03/03/2026"},
  {id:4604,student:"Divya Rao",subjectTaught:"Cloud Computing",teaching:4,communication:4,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Good exposure to industry tools.",date:"04/03/2026"},
]},
{id:47,name:"Dr. Devendra Singh",dept:"Information Technology",avatar:"DS",
 subjects:["Computer Graphics","Web Development","JavaScript"],
 feedbacks:[
  {id:4701,student:"Kiran Babu",subjectTaught:"Computer Graphics",teaching:4,communication:4,knowledge:4,punctuality:4,engagement:4,internals:4,attendance:4,comment:"OpenGL demos are visually stunning!",date:"01/03/2026"},
  {id:4702,student:"Pallavi Iyer",subjectTaught:"Web Development",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:4,internals:3,attendance:3,comment:"Multimedia compression needs more depth.",date:"02/03/2026"},
  {id:4703,student:"Rahul Das",subjectTaught:"Computer Graphics",teaching:4,communication:3,knowledge:5,punctuality:4,engagement:3,internals:4,attendance:4,comment:"Strong in graphics algorithms.",date:"03/03/2026"},
]},
{id:48,name:"Dr. Varun Chatterjee",dept:"Information Technology",avatar:"VC",
 subjects:["Augmented Reality","Virtual Reality","Computer Graphics"],
 feedbacks:[
  {id:4801,student:"Tarun Mishra",subjectTaught:"Augmented Reality",teaching:5,communication:5,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:4,comment:"AR/VR demos with Meta Quest are incredible!",date:"01/03/2026"},
  {id:4802,student:"Ishita Bose",subjectTaught:"Virtual Reality",teaching:4,communication:5,knowledge:5,punctuality:5,engagement:4,internals:4,attendance:5,comment:"Unity development for VR taught practically.",date:"02/03/2026"},
  {id:4803,student:"Varun Das",subjectTaught:"Augmented Reality",teaching:5,communication:4,knowledge:5,punctuality:4,engagement:5,internals:5,attendance:4,comment:"Future tech faculty, very inspiring!",date:"03/03/2026"},
  {id:4804,student:"Rina Patel",subjectTaught:"Virtual Reality",teaching:4,communication:5,knowledge:4,punctuality:5,engagement:4,internals:4,attendance:5,comment:"AR app development sessions are creative.",date:"04/03/2026"},
]},
{id:49,name:"Dr. Deepak Sharma",dept:"Mathematics",avatar:"DS",
 subjects:["Numerical Methods","Calculus","Linear Algebra"],
 feedbacks:[
  {id:4901,student:"Deepa Pillai",subjectTaught:"Numerical Methods",teaching:3,communication:3,knowledge:4,punctuality:2,engagement:3,internals:2,attendance:2,comment:"Often late to class, but explains well.",date:"01/03/2026"},
  {id:4902,student:"Ajay Krishna",subjectTaught:"Calculus",teaching:4,communication:3,knowledge:5,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Numerical methods coverage is thorough.",date:"02/03/2026"},
  {id:4903,student:"Nisha Singh",subjectTaught:"Linear Algebra",teaching:3,communication:4,knowledge:4,punctuality:3,engagement:3,internals:3,attendance:3,comment:"Could engage students more.",date:"03/03/2026"},
]},
{id:50,name:"Dr. Asha Menon",dept:"Mathematics",avatar:"AM",
 subjects:["Algebra","Number Theory","Discrete Mathematics"],
 feedbacks:[
  {id:5001,student:"Rohit Kumar",subjectTaught:"Algebra",teaching:4,communication:4,knowledge:5,punctuality:4,engagement:4,internals:4,attendance:4,comment:"Number theory sessions are fascinating.",date:"01/03/2026"},
  {id:5002,student:"Kavitha Rao",subjectTaught:"Number Theory",teaching:5,communication:4,knowledge:5,punctuality:5,engagement:4,internals:5,attendance:5,comment:"Algebra proofs are well structured.",date:"02/03/2026"},
  {id:5003,student:"Tarun Mishra",subjectTaught:"Discrete Mathematics",teaching:4,communication:5,knowledge:4,punctuality:4,engagement:5,internals:4,attendance:4,comment:"Very interactive teaching style.",date:"03/03/2026"},
]},
];

// ─── FEATURES (for feedback ratings) ─────────────────────────────────────────
const FEATURES = [
  { key:"teaching",      label:"Teaching Quality",    icon:"📚", weight:0.25, hint:"" },
  { key:"communication", label:"Communication",        icon:"🗣️", weight:0.15, hint:"" },
  { key:"knowledge",     label:"Subject Knowledge",    icon:"🧠", weight:0.20, hint:"" },
  { key:"punctuality",   label:"Punctuality",          icon:"⏰", weight:0.10, hint:"" },
  { key:"engagement",    label:"Student Engagement",   icon:"🎯", weight:0.15, hint:"" },
  { key:"internals",     label:"Internals Policy",     icon:"📝", weight:0.08, hint:"" },
  { key:"attendance",    label:"Attendance Policy",    icon:"🎓", weight:0.07, hint:"" },
];

const RATING_FEATURES = FEATURES;
const NUM_FEATURES    = [];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function avg(arr) { return arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0; }

function weightedScore(feedbacks) {
  if (!feedbacks.length) return 0;
  const totalWeight = FEATURES.reduce((s,f) => s + f.weight, 0);
  const weightedSum = FEATURES.reduce((sum, f) => {
    return sum + avg(feedbacks.map(x => x[f.key])) * f.weight;
  }, 0);
  return weightedSum / totalWeight;  // always 0–5
}

// Score for a specific subject only
function subjectScore(feedbacks, subject) {
  const sub = feedbacks.filter(fb => fb.subjectTaught === subject);
  return { score: weightedScore(sub), count: sub.length };
}

function getColor(score) {
  if (score >= 4.5) return "#00e5a0";
  if (score >= 3.5) return "#4da6ff";
  if (score >= 2.5) return "#ffb84d";
  return "#ff6b6b";
}
function getMedal(rank) {
  if (rank===1) return "🥇"; if (rank===2) return "🥈"; if (rank===3) return "🥉";
  return `#${rank}`;
}

const StarRating = ({ value, onChange, label, hint }) => (
  <div style={{ marginBottom:10 }}>
    <div style={{ fontSize:12, color:"#8899aa", marginBottom:2, fontFamily:"'Space Mono',monospace" }}>{label}</div>
    {hint && <div style={{ fontSize:10, color:"#445566", marginBottom:4, fontFamily:"'Space Mono',monospace" }}>{hint}</div>}
    <div style={{ display:"flex", gap:4 }}>
      {[1,2,3,4,5].map(s=>(
        <span key={s} onClick={()=>onChange(s)} style={{
          fontSize:22, cursor:"pointer", transition:"transform 0.1s",
          filter: s<=value?"none":"grayscale(1) opacity(0.3)",
          transform: s<=value?"scale(1.1)":"scale(1)"
        }}>⭐</span>
      ))}
    </div>
  </div>
);

const ScoreBar = ({ score, max=5, color }) => (
  <div style={{ background:"#0d1a2b", borderRadius:4, height:8, overflow:"hidden" }}>
    <div style={{ width:`${(score/max)*100}%`, height:"100%", background:color, borderRadius:4,
      transition:"width 0.8s cubic-bezier(.4,0,0,1)", boxShadow:`0 0 6px ${color}88` }}/>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [faculty, setFaculty]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [tab, setTab]                   = useState("feedback");
  const [selectedFacId, setSelectedFacId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [form, setForm]                 = useState({
    teaching:0, communication:0, knowledge:0, punctuality:0, engagement:0,
    internals:0, attendance:0, comment:"", student:"", subjectTaught:""
  });
  const [submitted, setSubmitted]       = useState(false);
  const [rankMetric, setRankMetric]     = useState("weighted");
  const [rankDept, setRankDept]         = useState("All");
  const [recSubject, setRecSubject]     = useState("All");
  const [recDept, setRecDept]           = useState("All");
  const [deptFilter, setDeptFilter]     = useState("All");
  const [searchQuery, setSearchQuery]   = useState("");
  const [toast, setToast]               = useState("");
  const toastRef                        = useRef();

  // ─── LOAD FACULTY + FEEDBACKS FROM SUPABASE ───────────────────────────────
  useEffect(() => {
    loadData();

    // ─── REALTIME SUBSCRIPTION ───────────────────────────────────────────────
    // Automatically updates when anyone submits a new feedback
    const channel = supabase
      .channel("realtime-feedbacks")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedbacks" },
        (payload) => {
          const fb = payload.new;
          const newFb = {
            id:            fb.id,
            student:       fb.student,
            subjectTaught: fb.subject_taught,
            teaching:      fb.teaching,
            communication: fb.communication,
            knowledge:     fb.knowledge,
            punctuality:   fb.punctuality,
            engagement:    fb.engagement,
            internals:     fb.internals,
            attendance:    fb.attendance,
            comment:       fb.comment || "",
            date:          fb.date || new Date(fb.created_at).toLocaleDateString(),
          };
          // Add to correct faculty without full reload
          setFaculty(prev => prev.map(f =>
            f.id === fb.faculty_id
              ? { ...f, feedbacks: [...f.feedbacks, newFb] }
              : f
          ));
          showToast("🔴 Live: New feedback received!");
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => supabase.removeChannel(channel);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load faculty
      const { data: facultyData, error: fErr } = await supabase
        .from("faculty")
        .select("*")
        .order("id");
      if (fErr) throw fErr;

      // Load feedbacks
      const { data: feedbackData, error: fbErr } = await supabase
        .from("feedbacks")
        .select("*")
        .order("id");
      if (fbErr) throw fbErr;

      // Merge feedbacks into faculty
      const merged = facultyData.map(f => ({
        ...f,
        subjects: f.subjects || [],
        feedbacks: feedbackData
          .filter(fb => fb.faculty_id === f.id)
          .map(fb => ({
            id:           fb.id,
            student:      fb.student,
            subjectTaught:fb.subject_taught,
            teaching:     fb.teaching,
            communication:fb.communication,
            knowledge:    fb.knowledge,
            punctuality:  fb.punctuality,
            engagement:   fb.engagement,
            internals:    fb.internals,
            attendance:   fb.attendance,
            comment:      fb.comment || "",
            date:         fb.date || new Date(fb.created_at).toLocaleDateString(),
          }))
      }));

      setFaculty(merged);
      if (merged.length > 0) setSelectedFacId(merged[0].id);
    } catch (err) {
      showToast("❌ Database load failed: " + err.message);
      // Fallback to local data if DB fails
      setFaculty(INITIAL_FACULTY);
      setSelectedFacId(INITIAL_FACULTY[0].id);
    }
    setLoading(false);
  };

  // Enrich faculty with scores
  const ranked = [...faculty].map(f => ({
    ...f,
    score:         weightedScore(f.feedbacks),
    featureScores: FEATURES.reduce((a,feat)=>({...a,[feat.key]:avg(f.feedbacks.map(x=>x[feat.key]))}),{}),
    count:         f.feedbacks.length,
  })).sort((a,b)=>b.score-a.score);

  const depts       = ["All", ...new Set(faculty.map(f=>f.dept))];
  const allSubjects = ["All", ...new Set(faculty.flatMap(f=>f.subjects))].sort();
  const bestFaculty = ranked[0];

  // Subject-wise recommendation: for each subject find best faculty
  const subjectRecs = (() => {
    const subj = recSubject === "All" ? null : recSubject;
    const list = faculty.filter(f =>
      (recDept==="All" || f.dept===recDept) &&
      (!subj || f.subjects.includes(subj))
    ).map(f => {
      const { score, count } = subj ? subjectScore(f.feedbacks, subj) : { score: weightedScore(f.feedbacks), count: f.feedbacks.length };
      return { ...f, recScore: score, recCount: count };
    }).filter(f => f.recCount > 0).sort((a,b)=>b.recScore-a.recScore).slice(0,3);
    return list;
  })();

  const showToast = msg => {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(()=>setToast(""), 2800);
  };

  const selectedFac = faculty.find(f=>f.id===selectedFacId);

  // When faculty changes, reset subject
  const handleFacSelect = id => {
    setSelectedFacId(id);
    setForm(p=>({...p, subjectTaught:""}));
  };

  const handleSubmit = async () => {
    if (!form.student.trim())       return showToast("⚠️ Please enter your student name!");
    if (!form.subjectTaught)        return showToast("⚠️ Please select the subject!");
    if (RATING_FEATURES.some(f=>form[f.key]===0)) return showToast("⚠️ Please rate all features!");

    try {
      // Save to Supabase
      const { data, error } = await supabase.from("feedbacks").insert([{
        faculty_id:    selectedFacId,
        student:       form.student,
        subject_taught:form.subjectTaught,
        teaching:      form.teaching,
        communication: form.communication,
        knowledge:     form.knowledge,
        punctuality:   form.punctuality,
        engagement:    form.engagement,
        internals:     form.internals,
        attendance:    form.attendance,
        comment:       form.comment,
        date:          new Date().toLocaleDateString(),
      }]).select();
      if (error) throw error;

      // Update local state instantly (no need to reload)
      const newFb = {
        id: data[0].id, student: form.student, subjectTaught: form.subjectTaught,
        teaching: form.teaching, communication: form.communication,
        knowledge: form.knowledge, punctuality: form.punctuality,
        engagement: form.engagement, internals: form.internals,
        attendance: form.attendance, comment: form.comment,
        date: new Date().toLocaleDateString(),
      };
      setFaculty(prev=>prev.map(f=>f.id===selectedFacId?{...f,feedbacks:[...f.feedbacks,newFb]}:f));
      setForm({ teaching:0,communication:0,knowledge:0,punctuality:0,engagement:0,internals:0,attendance:0,comment:"",student:"",subjectTaught:"" });
      setSubmitted(true);
      showToast("✅ Feedback saved to database!");
      setTimeout(()=>setSubmitted(false), 1800);
    } catch(err) {
      showToast("❌ Save failed: " + err.message);
    }
  };

  const TABS = [
    { id:"feedback",  label:"Submit Feedback",  icon:"✍️" },
    { id:"ranking",   label:"Rankings",          icon:"🏆" },
    { id:"recommend", label:"Recommendations",   icon:"💡" },
    { id:"analytics", label:"Analytics",         icon:"📊" },
  ];

  const filteredFaculty = faculty.filter(f => {
    const matchSubject = deptFilter==="All" || f.subjects.includes(deptFilter);
    const matchSearch  = searchQuery.trim()==="" || f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#060d16", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", fontFamily:"'Sora','Segoe UI',sans-serif", color:"#e0eaf7" }}>
      <div style={{ fontSize:48, marginBottom:20 }}>🎓</div>
      <div style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>TeachTrack</div>
      <div style={{ fontSize:13, color:"#4da6ff", marginBottom:32, fontFamily:"'Space Mono',monospace" }}>Loading from database...</div>
      <div style={{ width:200, height:4, background:"#0d1a2b", borderRadius:4, overflow:"hidden" }}>
        <div style={{ height:"100%", background:"linear-gradient(90deg,#00e5a0,#4da6ff)",
          borderRadius:4, animation:"load 1.5s ease-in-out infinite",
          width:"60%" }}/>
      </div>
      <style>{`@keyframes load{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#060d16", fontFamily:"'Sora','Segoe UI',sans-serif", color:"#e0eaf7", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#0d1a2b} ::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:3px}
        .tab-btn:hover{background:#112240!important;transform:translateY(-1px)}
        .card{transition:transform 0.2s,box-shadow 0.2s} .card:hover{transform:translateY(-3px);box-shadow:0 8px 32px #00e5a022!important}
        .submit-btn:hover{background:#00c985!important;transform:scale(1.02)} .submit-btn:active{transform:scale(0.98)}
        .fac-item:hover{background:#0d2040!important}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        .animate-in{animation:fadeIn 0.4s ease both}
        .best-badge{animation:pulse 2s infinite}
        input[type=number]::-webkit-inner-spin-button{opacity:1}
      `}</style>

      {toast && (
        <div style={{ position:"fixed",top:20,right:20,zIndex:9999,background:"#112240",
          border:"1px solid #00e5a044",borderRadius:12,padding:"12px 20px",fontSize:14,
          boxShadow:"0 4px 24px #00000088",animation:"slideIn 0.3s ease" }}>{toast}</div>
      )}

      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(135deg,#0a1628 0%,#0d2040 50%,#0a1628 100%)", borderBottom:"1px solid #1e3a5f", padding:"28px 32px 0" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
            <div style={{ width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#00e5a0,#4da6ff)",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 0 20px #00e5a044" }}>🎓</div>
            <div>
              <div style={{ fontSize:22,fontWeight:700,letterSpacing:-0.5 }}>TeachTrack</div>
              <div style={{ fontSize:12,color:"#4da6ff",fontFamily:"'Space Mono',monospace" }}>TEACHING FEEDBACK & ANALYTICS</div>
            </div>
            {bestFaculty?.count>0 && (
              <div className="best-badge" style={{ marginLeft:"auto",background:"#0d2040",border:"1px solid #00e5a044",
                borderRadius:10,padding:"6px 14px",fontSize:12,color:"#00e5a0",fontFamily:"'Space Mono',monospace" }}>
                🏆 TOP: {bestFaculty.name.split(" ")[1]} ({bestFaculty.score.toFixed(2)})
              </div>
            )}
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {TABS.map(t=>(
              <button key={t.id} className="tab-btn" onClick={()=>setTab(t.id)} style={{
                padding:"10px 20px",border:"none",cursor:"pointer",borderRadius:"10px 10px 0 0",
                fontSize:13,fontWeight:600,fontFamily:"inherit",transition:"all 0.2s",
                background:tab===t.id?"#112240":"transparent",
                color:tab===t.id?"#00e5a0":"#6688aa",
                borderBottom:tab===t.id?"2px solid #00e5a0":"2px solid transparent"
              }}>{t.icon} {t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px" }}>

        {/* ══════════════ FEEDBACK TAB ══════════════ */}
        {tab==="feedback" && (
          <div className="animate-in">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
              {/* Faculty List */}
              <div style={{ background:"#0d1a2b",borderRadius:20,padding:20,border:"1px solid #1e3a5f" }}>

                {/* 🔍 Search Box */}
                <div style={{ position:"relative",marginBottom:12 }}>
                  <span style={{ position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:14,pointerEvents:"none" }}>🔍</span>
                  <input
                    placeholder="Search faculty by name..."
                    value={searchQuery}
                    onChange={e=>setSearchQuery(e.target.value)}
                    style={{ width:"100%",padding:"9px 12px 9px 34px",borderRadius:10,
                      background:"#060d16",border:"1px solid #1e3a5f",color:"#e0eaf7",
                      fontSize:13,fontFamily:"inherit",outline:"none" }}
                  />
                  {searchQuery && (
                    <span onClick={()=>setSearchQuery("")} style={{ position:"absolute",right:10,top:"50%",
                      transform:"translateY(-50%)",cursor:"pointer",fontSize:14,color:"#445566" }}>✕</span>
                  )}
                </div>

                {/* 📚 Subject Filter */}
                <div style={{ marginBottom:10 }}>
                  <div style={{ fontSize:10,color:"#445566",marginBottom:6,fontFamily:"'Space Mono',monospace" }}>FILTER BY SUBJECT</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5,maxHeight:100,overflowY:"auto" }}>
                    <button onClick={()=>setDeptFilter("All")} style={{
                      padding:"3px 10px",border:`1px solid ${deptFilter==="All"?"#00e5a0":"#1e3a5f"}`,
                      borderRadius:6,background:deptFilter==="All"?"#00e5a022":"transparent",
                      color:deptFilter==="All"?"#00e5a0":"#6688aa",fontSize:11,cursor:"pointer",fontFamily:"inherit"
                    }}>All</button>
                    {[...new Set(faculty.flatMap(f=>f.subjects))].sort().map(s=>(
                      <button key={s} onClick={()=>setDeptFilter(s)} style={{
                        padding:"3px 10px",border:`1px solid ${deptFilter===s?"#4da6ff":"#1e3a5f"}`,
                        borderRadius:6,background:deptFilter===s?"#4da6ff22":"transparent",
                        color:deptFilter===s?"#4da6ff":"#6688aa",fontSize:11,cursor:"pointer",fontFamily:"inherit"
                      }}>{s}</button>
                    ))}
                  </div>
                </div>

                <div style={{ fontSize:11,color:"#445566",marginBottom:8 }}>
                  <span style={{ color:"#e0eaf7",fontWeight:600 }}>{filteredFaculty.length}</span> faculty
                  {deptFilter!=="All" && <span style={{ color:"#4da6ff" }}> · <strong>{deptFilter}</strong></span>}
                  {searchQuery && <span style={{ color:"#00e5a0" }}> · "{searchQuery}"</span>}
                </div>

                <div style={{ maxHeight:400,overflowY:"auto",display:"flex",flexDirection:"column",gap:8,paddingRight:4 }}>
                  {filteredFaculty.map(f=>(
                    <div key={f.id} className="fac-item" onClick={()=>handleFacSelect(f.id)} style={{
                      display:"flex",alignItems:"center",gap:12,padding:"10px 14px",
                      borderRadius:12,cursor:"pointer",transition:"all 0.2s",
                      background:selectedFacId===f.id?"#112240":"#060d16",
                      border:`1px solid ${selectedFacId===f.id?"#00e5a066":"#1e3a5f"}`,
                      boxShadow:selectedFacId===f.id?"0 0 12px #00e5a022":"none"
                    }}>
                      <div style={{ width:38,height:38,borderRadius:10,
                        background:`linear-gradient(135deg,${getColor(weightedScore(f.feedbacks))}44,#0d2040)`,
                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0
                      }}>{f.avatar}</div>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ fontWeight:600,fontSize:13,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{f.name}</div>
                        <div style={{ fontSize:10,color:"#4da6ff",marginTop:2,display:"flex",flexWrap:"wrap",gap:4 }}>
                          {f.subjects.map(s=>(
                            <span key={s} style={{ background:"#112240",padding:"1px 6px",borderRadius:4,fontSize:10 }}>{s}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize:10,fontFamily:"'Space Mono',monospace",color:"#4da6ff",flexShrink:0 }}>{f.feedbacks.length}✍</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Form */}
              <div style={{ background:"#0d1a2b",borderRadius:20,padding:28,border:"1px solid #1e3a5f" }}>
                <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#00e5a0" }}>Rate {selectedFac?.name}</div>
                <div style={{ fontSize:12,color:"#6688aa",marginBottom:16,fontFamily:"'Space Mono',monospace" }}>
                  {selectedFac?.dept}
                </div>

                <input placeholder="Your name / student ID" value={form.student}
                  onChange={e=>setForm(p=>({...p,student:e.target.value}))}
                  style={{ width:"100%",padding:"10px 14px",borderRadius:10,marginBottom:12,
                    background:"#060d16",border:"1px solid #1e3a5f",color:"#e0eaf7",fontSize:13,fontFamily:"inherit",outline:"none" }}/>

                {/* Subject selector */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:12,color:"#8899aa",marginBottom:6,fontFamily:"'Space Mono',monospace" }}>📖 Subject Being Taught</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                    {selectedFac?.subjects.map(s=>(
                      <button key={s} onClick={()=>setForm(p=>({...p,subjectTaught:s}))} style={{
                        padding:"5px 12px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"inherit",transition:"all 0.2s",border:"none",
                        background:form.subjectTaught===s?"#00e5a0":"#112240",
                        color:form.subjectTaught===s?"#060d16":"#aabbcc",
                        fontWeight:form.subjectTaught===s?700:400
                      }}>{s}</button>
                    ))}
                  </div>
                </div>

                {RATING_FEATURES.map(f=>(
                  <StarRating key={f.key} label={`${f.icon} ${f.label}`} hint={f.hint} value={form[f.key]} onChange={v=>setForm(p=>({...p,[f.key]:v}))}/>
                ))}



                <textarea placeholder="Additional comments (optional)..." value={form.comment}
                  onChange={e=>setForm(p=>({...p,comment:e.target.value}))} rows={2}
                  style={{ width:"100%",padding:"10px 14px",borderRadius:10,background:"#060d16",
                    border:"1px solid #1e3a5f",color:"#e0eaf7",fontSize:13,fontFamily:"inherit",outline:"none",resize:"none" }}/>

                <button className="submit-btn" onClick={handleSubmit} style={{
                  width:"100%",marginTop:14,padding:"13px",
                  background:submitted?"#00c985":"#00e5a0",border:"none",borderRadius:12,
                  color:"#060d16",fontWeight:700,fontSize:15,fontFamily:"inherit",cursor:"pointer",transition:"all 0.2s"
                }}>{submitted?"✓ Submitted!":"Submit Feedback →"}</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ RANKING TAB ══════════════ */}
        {tab==="ranking" && (
          <div className="animate-in">
            <div style={{ display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center" }}>
              <span style={{ fontSize:13,color:"#6688aa" }}>Dept:</span>
              {depts.map(d=>(
                <button key={d} onClick={()=>setRankDept(d)} style={{
                  padding:"5px 12px",border:`1px solid ${rankDept===d?"#4da6ff":"#1e3a5f"}`,
                  borderRadius:8,background:rankDept===d?"#4da6ff22":"transparent",
                  color:rankDept===d?"#4da6ff":"#6688aa",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"
                }}>{d}</button>
              ))}
            </div>

            <div style={{ display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center" }}>
              <span style={{ fontSize:13,color:"#6688aa" }}>Sort by:</span>
              {[{id:"weighted",label:"Overall Score",icon:"⭐"},
                ...FEATURES.map(f=>({id:f.key,label:f.label,icon:f.icon}))
              ].map(m=>(
                <button key={m.id} onClick={()=>setRankMetric(m.id)} style={{
                  padding:"5px 12px",border:`1px solid ${rankMetric===m.id?"#00e5a0":"#1e3a5f"}`,
                  borderRadius:8,background:rankMetric===m.id?"#00e5a022":"transparent",
                  color:rankMetric===m.id?"#00e5a0":"#6688aa",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"
                }}>{m.icon} {m.label}</button>
              ))}
            </div>

            {[...ranked]
              .filter(f=>rankDept==="All"||f.dept===rankDept)
              .sort((a,b)=>{
                if (rankMetric==="weighted") return b.score-a.score;
                return (b.featureScores[rankMetric]||0)-(a.featureScores[rankMetric]||0);
              })
              .map((f,i)=>{
                const displayScore = rankMetric==="weighted" ? f.score : (f.featureScores[rankMetric]||0);
                const color = getColor(displayScore);
                const internalsAvg = avg(f.feedbacks.map(x=>x.internals));
                const attendanceAvg = avg(f.feedbacks.map(x=>x.attendance));
                return (
                  <div key={f.id} className="card" style={{
                    background:"#0d1a2b",border:`1px solid ${i===0?"#00e5a044":"#1e3a5f"}`,
                    borderRadius:16,padding:"20px 24px",marginBottom:12,
                    boxShadow:i===0?"0 0 20px #00e5a011":"none"
                  }}>
                    <div style={{ display:"flex",alignItems:"flex-start",gap:16 }}>
                      <div style={{ fontSize:i<3?28:18,fontWeight:700,fontFamily:"'Space Mono',monospace",
                        minWidth:40,textAlign:"center",paddingTop:4,
                        color:i===0?"#ffd700":i===1?"#c0c0c0":i===2?"#cd7f32":"#4466aa" }}>{getMedal(i+1)}</div>
                      <div style={{ width:48,height:48,borderRadius:12,flexShrink:0,
                        background:`linear-gradient(135deg,${color}44,#112240)`,border:`2px solid ${color}66`,
                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700 }}>{f.avatar}</div>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ fontWeight:700,fontSize:15,marginBottom:2 }}>{f.name}</div>
                        <div style={{ fontSize:11,color:"#6688aa",marginBottom:6 }}>{f.dept}</div>
                        {/* Subject tags */}
                        <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
                          {f.subjects.map(s=>(
                            <span key={s} style={{ fontSize:10,padding:"2px 8px",borderRadius:5,background:"#112240",color:"#4da6ff" }}>{s}</span>
                          ))}
                        </div>
                        {/* Rating bars */}
                        <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:10 }}>
                          {RATING_FEATURES.map(feat=>(
                            <div key={feat.key}>
                              <div style={{ fontSize:10,color:"#445566",marginBottom:3 }}>{feat.icon}</div>
                              <ScoreBar score={f.featureScores[feat.key]||0} color={rankMetric===feat.key?"#00e5a0":color}/>
                              <div style={{ fontSize:10,color:"#6688aa",marginTop:2,fontFamily:"'Space Mono',monospace" }}>
                                {(f.featureScores[feat.key]||0).toFixed(1)}
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Internals + Attendance */}
                        {f.count>0 && (
                          <div style={{ display:"flex",gap:10 }}>
                            <div style={{ background:"#060d16",borderRadius:8,padding:"6px 14px",display:"flex",alignItems:"center",gap:8 }}>
                              <span style={{ fontSize:14 }}>📝</span>
                              <div>
                                <div style={{ fontSize:10,color:"#445566" }}>Internals Policy</div>
                                <div style={{ fontSize:13,color:internalsAvg>=4?"#00e5a0":internalsAvg>=3?"#ffb84d":"#ff6b6b" }}>
                                  {internalsAvg.toFixed(1)}
                                </div>
                              </div>
                            </div>
                            <div style={{ background:"#060d16",borderRadius:8,padding:"6px 14px",display:"flex",alignItems:"center",gap:8 }}>
                              <span style={{ fontSize:14 }}>🎓</span>
                              <div>
                                <div style={{ fontSize:10,color:"#445566" }}>Attendance Policy</div>
                                <div style={{ fontSize:13,color:attendanceAvg>=4?"#00e5a0":attendanceAvg>=3?"#ffb84d":"#ff6b6b" }}>
                                  {attendanceAvg.toFixed(1)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign:"center",flexShrink:0 }}>
                        <div style={{ fontSize:32,fontWeight:700,fontFamily:"'Space Mono',monospace",color,textShadow:`0 0 12px ${color}88` }}>
                          {displayScore>0?displayScore.toFixed(2):"—"}
                        </div>
                        <div style={{ fontSize:11,color:"#445566" }}>{f.count} reviews</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* ══════════════ RECOMMENDATION TAB ══════════════ */}
        {tab==="recommend" && (
          <div className="animate-in">
            <div style={{ background:"#0a1628",borderRadius:16,padding:"20px 24px",marginBottom:24,border:"1px solid #1e3a5f" }}>
              <div style={{ fontSize:13,color:"#4da6ff",marginBottom:14,fontFamily:"'Space Mono',monospace" }}>
                🔍 FIND BEST FACULTY FOR A SUBJECT
              </div>
              <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
                <div style={{ flex:1,minWidth:200 }}>
                  <div style={{ fontSize:12,color:"#6688aa",marginBottom:8 }}>Subject</div>
                  <select value={recSubject} onChange={e=>setRecSubject(e.target.value)}
                    style={{ width:"100%",padding:"10px 14px",borderRadius:10,background:"#060d16",
                      border:"1px solid #1e3a5f",color:"#e0eaf7",fontSize:13,fontFamily:"inherit",outline:"none" }}>
                    {allSubjects.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ flex:1,minWidth:200 }}>
                  <div style={{ fontSize:12,color:"#6688aa",marginBottom:8 }}>Department</div>
                  <select value={recDept} onChange={e=>setRecDept(e.target.value)}
                    style={{ width:"100%",padding:"10px 14px",borderRadius:10,background:"#060d16",
                      border:"1px solid #1e3a5f",color:"#e0eaf7",fontSize:13,fontFamily:"inherit",outline:"none" }}>
                    {depts.map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              {recSubject!=="All" && (
                <div style={{ marginTop:12,padding:"10px 14px",background:"#112240",borderRadius:10,fontSize:13,color:"#00e5a0" }}>
                  💡 Showing faculty ranked by their performance specifically in <strong>{recSubject}</strong>
                  {" "}— faculty teaching this subject are compared by subject-specific scores only
                </div>
              )}
            </div>

            {subjectRecs.length===0 ? (
              <div style={{ textAlign:"center",padding:60,color:"#445566" }}>
                <div style={{ fontSize:48,marginBottom:12 }}>💡</div>
                <div>No faculty found for this subject/department with feedback data.</div>
              </div>
            ) : (
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20 }}>
                {subjectRecs.map((f,i)=>{
                  const color = getColor(f.recScore);
                  const subFeedbacks = recSubject==="All" ? f.feedbacks : f.feedbacks.filter(fb=>fb.subjectTaught===recSubject);
                  const internalsAvg = avg(subFeedbacks.map(x=>x.internals));
                  const attendanceAvg = avg(subFeedbacks.map(x=>x.attendance));
                  const topFeat = RATING_FEATURES.reduce((best,feat)=>
                    (avg(subFeedbacks.map(x=>x[feat.key])))>(avg(subFeedbacks.map(x=>x[best.key])))?feat:best
                  );
                  return (
                    <div key={f.id} className="card" style={{
                      background:"#0d1a2b",borderRadius:20,padding:24,
                      border:`1px solid ${color}44`,boxShadow:`0 4px 24px ${color}11`,position:"relative",overflow:"hidden"
                    }}>
                      <div style={{ position:"absolute",top:-20,right:-20,fontSize:80,opacity:0.04,pointerEvents:"none" }}>{getMedal(i+1)}</div>
                      <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:14 }}>
                        <div style={{ width:56,height:56,borderRadius:16,
                          background:`linear-gradient(135deg,${color}44,#060d16)`,border:`2px solid ${color}88`,
                          display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700 }}>{f.avatar}</div>
                        <div>
                          <div style={{ fontWeight:700,fontSize:16 }}>{f.name}</div>
                          <div style={{ fontSize:11,color:"#6688aa" }}>{f.dept}</div>
                          <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginTop:4 }}>
                            {f.subjects.map(s=>(
                              <span key={s} style={{ fontSize:10,padding:"1px 7px",borderRadius:4,
                                background:s===recSubject?"#00e5a033":"#112240",
                                color:s===recSubject?"#00e5a0":"#6688aa",
                                border:s===recSubject?"1px solid #00e5a044":"1px solid transparent"
                              }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{ background:"#060d16",borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between" }}>
                        <div>
                          <div style={{ fontSize:11,color:"#445566" }}>{recSubject==="All"?"Overall":"Subject"} Score</div>
                          <div style={{ fontSize:28,fontWeight:700,color,fontFamily:"'Space Mono',monospace" }}>{f.recScore.toFixed(2)}</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:11,color:"#445566" }}>Best at</div>
                          <div style={{ fontSize:13,color:"#4da6ff",marginTop:4 }}>{topFeat.icon} {topFeat.label}</div>
                          <div style={{ fontSize:11,color:"#6688aa" }}>{avg(subFeedbacks.map(x=>x[topFeat.key])).toFixed(1)}/5</div>
                        </div>
                      </div>

                      {RATING_FEATURES.map(feat=>(
                        <div key={feat.key} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                          <span style={{ fontSize:13,width:20,textAlign:"center" }}>{feat.icon}</span>
                          <div style={{ flex:1 }}><ScoreBar score={avg(subFeedbacks.map(x=>x[feat.key]))} color={color}/></div>
                          <span style={{ fontSize:11,width:24,textAlign:"right",fontFamily:"'Space Mono',monospace",color:"#6688aa" }}>
                            {avg(subFeedbacks.map(x=>x[feat.key])).toFixed(1)}
                          </span>
                        </div>
                      ))}

                      {/* Internals + Attendance in rec card */}
                      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10,marginBottom:12 }}>
                        <div style={{ background:"#060d16",borderRadius:8,padding:"8px 12px",textAlign:"center" }}>
                          <div style={{ fontSize:11,color:"#445566",marginBottom:4 }}>📝 Internals Policy</div>
                          <div style={{ fontSize:16 }}>
                            {internalsAvg>0?internalsAvg.toFixed(1):"—"}
                          </div>
                        </div>
                        <div style={{ background:"#060d16",borderRadius:8,padding:"8px 12px",textAlign:"center" }}>
                          <div style={{ fontSize:11,color:"#445566",marginBottom:4 }}>🎓 Attendance Policy</div>
                          <div style={{ fontSize:16 }}>
                            {attendanceAvg>0?attendanceAvg.toFixed(1):"—"}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        fontSize:11,color:i===0?"#00e5a0":i===1?"#4da6ff":"#ffb84d",
                        fontFamily:"'Space Mono',monospace",textAlign:"center",padding:"8px",
                        background:i===0?"#00e5a011":i===1?"#4da6ff11":"#ffb84d11",borderRadius:8
                      }}>
                        {i===0?"⭐ HIGHLY RECOMMENDED":i===1?"👍 RECOMMENDED":"✔ GOOD CHOICE"} · {f.recCount} reviews
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════ ANALYTICS TAB ══════════════ */}
        {tab==="analytics" && (
          <div className="animate-in">
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
              {[
                { label:"Total Reviews",  value:faculty.reduce((s,f)=>s+f.feedbacks.length,0), icon:"📝", color:"#00e5a0" },
                { label:"Faculty Rated",  value:`${faculty.filter(f=>f.feedbacks.length>0).length}/${faculty.length}`, icon:"👨‍🏫", color:"#4da6ff" },
                { label:"Avg Score",      value:(()=>{ const a=ranked.filter(f=>f.count>0); return a.length?(a.reduce((s,f)=>s+f.score,0)/a.length).toFixed(2):"—"; })(), icon:"⭐", color:"#ffb84d" },
                { label:"Top Faculty",    value:ranked[0]?.count>0?ranked[0].name.split(" ")[1]:"—", icon:"🏆", color:"#ff6b9d" },
              ].map(stat=>(
                <div key={stat.label} style={{ background:"#0d1a2b",borderRadius:16,padding:"20px",border:`1px solid ${stat.color}33`,textAlign:"center" }}>
                  <div style={{ fontSize:28,marginBottom:6 }}>{stat.icon}</div>
                  <div style={{ fontSize:24,fontWeight:700,fontFamily:"'Space Mono',monospace",color:stat.color }}>{stat.value}</div>
                  <div style={{ fontSize:11,color:"#445566",marginTop:4 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
              {/* Heatmap */}
              <div style={{ background:"#0d1a2b",borderRadius:20,padding:24,border:"1px solid #1e3a5f" }}>
                <div style={{ fontSize:14,fontWeight:700,marginBottom:16,color:"#00e5a0" }}>Performance Heatmap</div>
                <div style={{ overflowX:"auto",overflowY:"auto",maxHeight:380 }}>
                  <table style={{ width:"100%",borderCollapse:"collapse",fontSize:11 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign:"left",padding:"4px 8px",color:"#445566",fontWeight:400,position:"sticky",top:0,background:"#0d1a2b" }}>Faculty</th>
                        {FEATURES.map(f=>(
                          <th key={f.key} style={{ padding:"4px",color:"#445566",fontWeight:400,textAlign:"center",position:"sticky",top:0,background:"#0d1a2b" }}>{f.icon}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ranked.filter(f=>f.count>0).map(f=>(
                        <tr key={f.id}>
                          <td style={{ padding:"3px 8px",color:"#aabbcc",fontWeight:600,whiteSpace:"nowrap",fontSize:10 }}>
                            {f.name.replace("Dr. ","")}
                          </td>
                          {FEATURES.map(feat=>{
                            const raw = f.featureScores[feat.key]||0;
                            const disp = feat.isNum ? raw : raw;
                            const norm = feat.isNum ? (raw/feat.max)*5 : raw;
                            const c = getColor(norm);
                            return (
                              <td key={feat.key} style={{ padding:"2px",textAlign:"center" }}>
                                <div style={{ width:36,height:30,borderRadius:6,margin:"0 auto",
                                  background:`${c}33`,border:`1px solid ${c}44`,
                                  display:"flex",alignItems:"center",justifyContent:"center",
                                  fontSize:9,fontFamily:"'Space Mono',monospace",color:c }}>
                                  {feat.isNum ? disp.toFixed(0) : disp.toFixed(1)}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Score Distribution */}
              <div style={{ background:"#0d1a2b",borderRadius:20,padding:24,border:"1px solid #1e3a5f",overflowY:"auto",maxHeight:420 }}>
                <div style={{ fontSize:14,fontWeight:700,marginBottom:16,color:"#4da6ff" }}>Score Distribution</div>
                {ranked.filter(f=>f.count>0).map(f=>{
                  const color=getColor(f.score);
                  return (
                    <div key={f.id} style={{ marginBottom:12 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:3 }}>
                        <span style={{ fontSize:11,color:"#aabbcc" }}>{f.name.replace("Dr. ","")}</span>
                        <span style={{ fontSize:11,fontFamily:"'Space Mono',monospace",color }}>{f.score.toFixed(2)}</span>
                      </div>
                      <div style={{ background:"#060d16",borderRadius:6,height:8,overflow:"hidden" }}>
                        <div style={{ width:`${(f.score/5)*100}%`,height:"100%",borderRadius:6,
                          background:`linear-gradient(90deg,${color},${color}88)`,
                          transition:"width 1s ease",boxShadow:`0 0 6px ${color}66` }}/>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Feedback Log */}
              <div style={{ background:"#0d1a2b",borderRadius:20,padding:24,border:"1px solid #1e3a5f",gridColumn:"1/-1" }}>
                <div style={{ fontSize:14,fontWeight:700,marginBottom:16,color:"#ffb84d" }}>Recent Feedback Log</div>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12 }}>
                  {faculty.flatMap(f=>f.feedbacks.map(fb=>({...fb,facultyName:f.name,facultyAvatar:f.avatar})))
                    .sort((a,b)=>b.id-a.id).slice(0,9).map(fb=>(
                    <div key={fb.id} style={{ background:"#060d16",borderRadius:12,padding:"14px 16px",border:"1px solid #1e3a5f" }}>
                      <div style={{ display:"flex",gap:10,marginBottom:8 }}>
                        <div style={{ width:32,height:32,borderRadius:8,flexShrink:0,background:"#112240",
                          display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700 }}>{fb.facultyAvatar}</div>
                        <div>
                          <div style={{ fontWeight:600,fontSize:13 }}>{fb.facultyName}</div>
                          <div style={{ fontSize:10,color:"#445566" }}>by {fb.student} · {fb.subjectTaught} · {fb.date}</div>
                        </div>
                      </div>
                      <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:6 }}>
                        {RATING_FEATURES.map(f=>(
                          <span key={f.key} style={{ fontSize:10,padding:"2px 7px",borderRadius:5,background:"#112240",color:"#6688aa",fontFamily:"'Space Mono',monospace" }}>
                            {f.icon}{fb[f.key]}
                          </span>
                        ))}
                        <span style={{ fontSize:10,padding:"2px 7px",borderRadius:5,background:"#1a2840",color:"#ffb84d",fontFamily:"'Space Mono',monospace" }}>📝{fb.internals}</span>
                        <span style={{ fontSize:10,padding:"2px 7px",borderRadius:5,background:"#1a2840",color:"#4da6ff",fontFamily:"'Space Mono',monospace" }}>🎓{fb.attendance}%</span>
                      </div>
                      {fb.comment&&<div style={{ fontSize:11,color:"#6688aa",fontStyle:"italic" }}>"{fb.comment}"</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
