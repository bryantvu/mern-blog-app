import mongoose from "mongoose";

// const userIds = [
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
// ];

export const title = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Bryant does things",
    picturePath: "bg1.jpg",
 
  },
];

export const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: "test",
    lastName: "me",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    blogPath: "README",
    description: "Some really long random description",
    picturePath: "post1.jpeg",
    likes: [
      "253.47.121.144",
      "179.247.84.131",
      "248.111.184.138",
      "213.71.85.229",
    ],
    comments: [
      "random comment",
      "another random comment",
      "yet another random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    blogPath: "README",
    description:
      "Another really long random description. This one is longer than the previous one.",
    picturePath: "post2.jpeg",
    likes: [
      "253.47.121.144",
      "179.247.84.131",
      "248.111.184.138",
      "213.71.85.229",
    ],
    comments: [
      "one more random comment",
      "and another random comment",
      "no more random comments",
      "I lied, one more random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    blogPath: "README",
    description:
      "This is the last really long random description. This one is longer than the previous one.",
    picturePath: "post3.jpeg",
    likes: [
      "253.47.121.144",
      "179.247.84.131",
      "248.111.184.138",
      "213.71.85.229",
    ],
    comments: [
      "one more random comment",
      "I lied, one more random comment",
      "I lied again, one more random comment",
      "Why am I doing this?",
      "I'm bored",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    blogPath: "README",
    description:
      "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
    picturePath: "post4.jpeg",
    likes: [
      "253.47.121.144",
      "179.247.84.131",
      "248.111.184.138",
    ],
    comments: [
      "I lied again, one more random comment",
      "Why am I doing this?",
      "I'm bored",
      "I'm still bored",
      "All I want to do is play video games",
      "I'm going to play video games",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    blogPath: "README",
    description:
      "Just a short description. I'm tired of typing. I'm going to play video games now.",
    picturePath: "post5.jpeg",
    likes: [
      "253.47.121.144",
      "179.247.84.131",
      "248.111.184.138",
      "213.71.85.229",
    ],
    comments: [
      "I lied again, one more random comment",
      "Why am I doing this?",
      "Man I'm bored",
      "What should I do?",
      "I'm going to play video games",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    blogPath: "README",
    description:
      "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
    picturePath: "post6.jpeg",
    likes: [
      "253.47.121.144",
      "179.247.84.131",
    ],

    comments: [
      "Can I play video games now?",
      "No let's actually study",
      "Never mind, I'm going to play video games",
      "Stop it.",
      "Michael, stop it.",
    ],
  },
];

