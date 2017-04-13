export const mongoSurvey = {
  "id": "58ee63c65a2d576d5125b4bc",
  "owners": [
    "58ee63c65a2d576d5125b4c3",
    "58ee63c65a2d576d5125b4c2",
    "58ee63c65a2d576d5125b4c0"
  ],
  "title": "Example Survey",
  "questions": [
    {
      "_id": "58ee6466aa8ac36d6d74fe9f",
      "type": "Scale",
      "required": false,
      "title": "How much do you like burritos?",
      "min": 0,
      "max": 10,
      "labels": ["Not at All", "Somewhat", "Extremely"]
    },
    {
      "_id": "58ee6466aa8ac36d6d74fe9e",
      "type": "Text",
      "required": false,
      "title": "Explain your rating.",
      "max": 1000
    },
    {
      "_id": "58ee63c65a2d576d5125b4c1",
      "type": "Select",
      "required": false,
      "title": "What is your favorite color?",
      "options": [
        { "_id": "58ee6466aa8ac36d6d74fe9a", "label": "Red"},
        { "_id": "58ee6466aa8ac36d6d74fe9b", "label": "Green"},
        { "_id": "58ee6466aa8ac36d6d74fe9c", "label": "Blue"}
      ],
      "maxSelection": 0
    }
  ]
}

export default mongoSurvey;
