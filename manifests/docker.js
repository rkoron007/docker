const courses = {
  courses: {
    example_1: {
      taskGroupId: "8BCA0B7F-0CBB-418C-9F7F-FAFBEF50F1E7",
      name: "Docker Curriculum",
      url: "docker-curriculum",
      track: "In Development",
      order: 2,
      topics: [
        {
          id: "one",
          name: "Intro"
        }
      ],
      subtopics: [
        {
          id: "readings",
          name: "Readings"
        },
        {
          id: "videos",
          name: "Videos"
        }
      ]
    }
  },
  tasks: [
    {
      name: "Docker Course Overview",
      type: "Reading",
      topicId: "one",
      subtopicId: "readings",
      id: "E020D9AB-5577-4F58-AE3F-9FB012052369",
      repo: "docker-course",
      path: "readings/Docker_Overview.md",
      timeEstimate: "00:05:00"
    }
  ]
};

module.exports = courses;
