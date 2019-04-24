const courses = {
  courses: {
    example_1: {
      taskGroupId: "8BCA0B7F-0CBB-418C-9F7F-FAFBEF50F1E7",
      name: "SWE Online - Docker Curriculum",
      url: "swe-online-docker-curriculum",
      track: "SWE Online",
      order: 11,
      topics: [
        {
          id: "zero",
          name: "Getting Started"
        },
        {
          id: "one",
          name: "Day 1: Docker and Containers"
        },
        {
          id: "two",
          name: "Day 2: Images and the Dockerfile"
        },
        {
          id: "three",
          name: "Day 3: Docker Compose"
        },
        {
          id: "four",
          name: "Day 4: Hosting Using Docker"
        }
      ],
      subtopics: [
        {
          id: "nosubtopic",
          name: "NOSUBTOPIC"
        },
        {
          id: "materials",
          name: "Materials"
        },
        {
          id: "additional resources",
          name: "Additional Resources"
        },
        {
          id: "homeworks",
          name: "Homeworks"
        },
        {
          id: "projects",
          name: "Projects"
        }
      ]
    }
  },
  tasks: [
    {
      name: "Docker Course Overview",
      type: "Reading",
      id: "2BE941A1-39C7-4E14-9753-872AECC38379",
      repo: "docker-course",
      path: "readings/Docker_Overview.md",
      timeEstimate: "00:05:00",
      topicId: "zero",
      subtopicId: "nosubtopic"
    },
    {
      name: "Non Technical Overview of Docker",
      type: "Reading",
      id: "C1E65B4C-1553-4E12-8BDF-923BEA515F7D",
      repo: "docker-course",
      path: "readings/non_tech_docker.md",
      timeEstimate: "00:20:00",
      topicId: "zero",
      subtopicId: "nosubtopic"
    },
    {
      name: "Docker Installation",
      type: "Reading",
      id: "18E49E7D-B1C0-4069-8D89-5EA5E812D51E",
      repo: "docker-course",
      path: "readings/install_docker.md",
      timeEstimate: "00:20:00",
      topicId: "zero",
      subtopicId: "nosubtopic"
    },
    {
      name: "Docker vs. Virtual Machines",
      type: "Reading",
      id: "E6211A62-0C5F-4A3D-94AC-CE9898EE46FC",
      repo: "docker-course",
      path: "readings/docker_vs_vm.md",
      timeEstimate: "00:15:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Containers",
      type: "Reading",
      id: "669DB5D4-7223-491A-9A7F-FBE2FB8865AD",
      repo: "docker-course",
      path: "readings/container.md",
      timeEstimate: "00:20:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Command Cheat Sheet",
      type: "Reading",
      id: "B9B8B421-B229-4DDB-8729-C57D4CCEAF88",
      repo: "docker-course",
      path: "readings/container_commands.md",
      timeEstimate: "00:05:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Process Monitoring",
      type: "Reading",
      id: "121AF4F5-DF29-4002-A4AE-F3754D0DEA34",
      repo: "docker-course",
      path: "readings/process_monitor.md",
      timeEstimate: "00:10:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Persisting Data in Docker",
      type: "Reading",
      id: "2CB31A61-21C3-4460-97C2-F394A79FD901",
      repo: "docker-course",
      path: "readings/persistent_docker.md",
      timeEstimate: "00:15:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Networking in Docker",
      type: "Reading",
      id: "94F64E1A-36DB-4ECA-ABD4-E2A5D502B184",
      repo: "docker-course",
      path: "readings/networks.md",
      timeEstimate: "00:15:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Health Checks",
      type: "Reading",
      id: "28F1C22E-DD93-4AAE-8732-802B6AEE6B7C",
      repo: "docker-course",
      path: "readings/health_checks.md",
      timeEstimate: "00:10:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Intro",
      type: "Video",
      id: "74416845-306F-4B39-B07F-64953E7B9370",
      href: "https://player.vimeo.com/video/324339043",
      timeEstimate: "00:12:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Docker Networking",
      type: "Video",
      id: "B146315E-FF09-4CAA-B960-977EDF13D423",
      href: "https://player.vimeo.com/video/324328969",
      timeEstimate: "00:09:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Persistent Data in Docker: Bind Mounts",
      type: "Video",
      id: "5C120C43-F27A-4998-9676-541483D24F16",
      href: "https://player.vimeo.com/video/324332060",
      timeEstimate: "00:09:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Persistent Data in Docker:Volumes",
      type: "Video",
      id: "E760392C-1033-4653-82DB-4CDD0993A094",
      href: "https://player.vimeo.com/video/324328867",
      timeEstimate: "00:09:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "DNS Explained Via Comic",
      type: "ExternalResource",
      id: "F4545B7F-E412-4859-BEF9-9FDC4BD6FB6E",
      href: "https://howdns.works/",
      timeEstimate: "00:15:00",
      topicId: "one",
      subtopicId: "additional resources"
    },
    {
      name: "12 minute Docker Overview",
      type: "ExternalResource",
      id: "665E5BAA-A60E-4368-9EDB-F335A0446B30",
      href: "https://www.youtube.com/watch?v=YFl2mCHdv24",
      timeEstimate: "00:12:00",
      topicId: "one",
      subtopicId: "additional resources"
    },
    {
      name: "Immutable Infrastructure",
      type: "ExternalResource",
      id: "6923B5D3-B9C7-42AC-974B-CC582D915809",
      href: "https://www.oreilly.com/ideas/an-introduction-to-immutable-infrastructure",
      timeEstimate: "00:20:00",
      topicId: "one",
      subtopicId: "additional resources"
    },
    {
      name: "The 12 Factor App: Key to Cloud Design",
      type: "ExternalResource",
      id: "4D223C62-03A2-4171-A740-3CCE772D949C",
      href: "https://12factor.net/",
      timeEstimate: "00:30:00",
      topicId: "one",
      subtopicId: "additional resources"
    },
    {
      name: "First Containers",
      type: "Project",
      id: "E7FDF6A7-2194-470D-95D3-A30EF8679655",
      repo: "docker-course",
      path: "homeworks/first_containers/README.md",
      solution: "http://assets.aaonline.io/Docker/homeworks/first_containers/solutions.md.zip",
      acceptSubmission: true,
      timeEstimate: "00:20:00",
      topicId: "one",
      subtopicId: "homeworks"
    },
    {
      name: "Container Fun",
      type: "Project",
      id: "21C860B8-9FD2-4CD1-9CAE-05636D5B221C",
      repo: "docker-course",
      path: "projects/container_fun/README.md",
      solution: "http://assets.aaonline.io/Docker/projects/container_fun/solutions.md.zip",
      acceptSubmission: true,
      timeEstimate: "05:00:00",
      topicId: "one",
      subtopicId: "projects"
    },
    {
      name: "Image Composition",
      type: "Reading",
      id: "CBED2D72-1D39-47FA-AAF2-C227E43026BE",
      repo: "docker-course",
      path: "readings/images.md",
      timeEstimate: "00:10:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Images and Layers",
      type: "Reading",
      id: "99BCEABB-255D-41F4-B149-D5D0A6104B89",
      repo: "docker-course",
      path: "readings/layers.md",
      timeEstimate: "00:20:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Images and the Dockerfile",
      type: "Reading",
      id: "38A77F46-2B53-4DF5-9F1A-384170A33FE3",
      repo: "docker-course",
      path: "readings/dockerfile.md",
      timeEstimate: "00:20:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Dockerfile Cheat Sheet",
      type: "Reading",
      id: "9DB559D4-F1BB-45F0-A686-C32A6F8E0CB6",
      repo: "docker-course",
      path: "readings/dockerfile_cheat.md",
      timeEstimate: "00:07:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Docker Hub - Pushing and Pulling Images",
      type: "Reading",
      id: "72A87A79-B805-4382-A83B-C0FBBB6FE9D8",
      repo: "docker-course",
      path: "readings/dockerhub.md",
      timeEstimate: "00:07:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Docker Images and Layers",
      type: "Video",
      id: "AEE6ADE8-B2BB-4B2E-80F2-A399B780FA93",
      href: "https://player.vimeo.com/video/324328832",
      timeEstimate: "00:05:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Dockerfile Building and Pushing",
      type: "Video",
      id: "D3E22501-A783-4A5D-89B5-9A27C023EDEC",
      href: "https://player.vimeo.com/video/324248455",
      timeEstimate: "00:15:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "First Dockerfile",
      type: "Project",
      id: "E2B500BD-B441-45C8-8797-05F4B15C54A9",
      repo: "docker-course",
      path: "homeworks/first_dockerfile/README.md",
      solution: "http://assets.aaonline.io/Docker/homeworks/first_dockerfile/solution.zip",
      acceptSubmission: true,
      timeEstimate: "00:35:00",
      topicId: "two",
      subtopicId: "homeworks"
    },
    {
      name: "Dockerfiles Galore",
      type: "Project",
      id: "936AC830-2CE9-432A-A42F-A06B04EA7D40",
      repo: "docker-course",
      path: "projects/dockerfiles_galore/README.md",
      solution: "http://assets.aaonline.io/Docker/projects/dockerfiles_galore/solution.zip",
      acceptSubmission: true,
      timeEstimate: "06:00:00",
      topicId: "two",
      subtopicId: "projects"
    },
    {
      name: "Docker Compose",
      type: "Reading",
      id: "DCB00A70-291A-47DD-974C-F5C5169253E1",
      repo: "docker-course",
      path: "readings/docker_compose.md",
      timeEstimate: "00:20:00",
      topicId: "three",
      subtopicId: "materials"
    },
    {
      name: "The Docker Compose CLI",
      type: "Reading",
      id: "BB9440B3-DCF6-49BE-B18A-B0012AECCE02",
      repo: "docker-course",
      path: "readings/docker_compose_cli.md",
      timeEstimate: "00:07:00",
      topicId: "three",
      subtopicId: "materials"
    },
    {
      name: "Building Images with Docker Compose",
      type: "Reading",
      id: "11F7C758-13AB-4A9B-B2F9-6C66D1DCA73A",
      repo: "docker-course",
      path: "readings/compose_image_build.md",
      timeEstimate: "00:05:00",
      topicId: "three",
      subtopicId: "materials"
    },
    {
      name: "Using Docker Compose",
      type: "Video",
      id: "28EBFB7F-F95C-4D4D-8669-F3ED6E8C495C",
      href: "https://player.vimeo.com/video/324248406",
      timeEstimate: "00:07:00",
      topicId: "three",
      subtopicId: "materials"
    },
    {
      name: "Comprehensive Docker Article",
      type: "ExternalResource",
      id: "875D3E8B-678C-495B-BD0C-04858F69B57E",
      href: "https://medium.freecodecamp.org/comprehensive-introductory-guide-to-docker-vms-and-containers-4e42a13ee103",
      timeEstimate: "00:30:00",
      topicId: "three",
      subtopicId: "additional resources"
    },
    {
      name: "First Docker Compose File",
      type: "Project",
      id: "C3EC1485-062A-4437-8312-799C9BAAF613",
      repo: "docker-course",
      path: "homeworks/first_composition/README.md",
      solution: "http://assets.aaonline.io/Docker/homeworks/first_composition/solution.zip",
      acceptSubmission: true,
      timeEstimate: "00:30:00",
      topicId: "three",
      subtopicId: "homeworks"
    },
    {
      name: "Becoming Compose Pros",
      type: "Project",
      id: "5CE6040D-2E3C-41C3-9A39-BEDC6C336786",
      repo: "docker-course",
      path: "projects/compose_pros/README.md",
      solution: "http://assets.aaonline.io/Docker/projects/compose_pros/solution.zip",
      acceptSubmission: true,
      timeEstimate: "06:00:00",
      topicId: "three",
      subtopicId: "projects"
    },
    {
      name: "Creating a Dockerfile For Your Project",
      type: "Reading",
      id: "6E237C84-842A-4548-9BD3-272BAB8B7E94",
      repo: "docker-course",
      path: "readings/projects_dockerfile.md",
      timeEstimate: "00:20:00",
      topicId: "four",
      subtopicId: "materials"
    },
    {
      name: "Docker vs. Heroku",
      type: "ExternalResource",
      id: "AAADA132-2430-4B9C-AD81-4722929400AE",
      href: "https://tuhrig.de/docker-vs-heroku/",
      timeEstimate: "00:20:00",
      topicId: "four",
      subtopicId: "materials"
    },
    {
      name: "Hosting Using Docker and the Heroku Container Registry",
      type: "Reading",
      id: "7235F49C-8EFB-4F21-9D0C-1C7143BBEE5E",
      repo: "docker-course",
      path: "readings/heroku_guide.md",
      timeEstimate: "00:20:00",
      topicId: "four",
      subtopicId: "materials"
    },
    {
      name: "Putting It Together - Docker",
      type: "Reading",
      id: "92734706-8BFB-46C0-A1AB-7A0101202314",
      repo: "docker-course",
      path: "readings/put_it_together.md",
      timeEstimate: "06:00:00",
      topicId: "four",
      subtopicId: "homeworks"
    }
  ]
};

module.exports = courses;
