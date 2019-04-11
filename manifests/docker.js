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
      id: "18C69708-CA06-437C-AF82-718D27EA6E22",
      repo: "docker-course",
      path: "readings/Docker_Overview.md",
      timeEstimate: "00:05:00",
      topicId: "zero",
      subtopicId: "nosubtopic"
    },
    {
      name: "Non Technical Overview of Docker",
      type: "Reading",
      id: "9A5ACE2A-47A0-4296-9BF0-596CECDF1FC0",
      repo: "docker-course",
      path: "readings/non_tech_docker.md",
      timeEstimate: "00:20:00",
      topicId: "zero",
      subtopicId: "nosubtopic"
    },
    {
      name: "Docker Installation",
      type: "Reading",
      id: "B9C79487-44EA-4D5C-8EF3-B30D2D8181CA",
      repo: "docker-course",
      path: "readings/install_docker.md",
      timeEstimate: "00:20:00",
      topicId: "zero",
      subtopicId: "nosubtopic"
    },
    {
      name: "Docker vs. Virtual Machines",
      type: "Reading",
      id: "64D5F93B-58EA-460B-9EF6-E13B058AE90D",
      repo: "docker-course",
      path: "readings/docker_vs_vm.md",
      timeEstimate: "00:15:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Containers",
      type: "Reading",
      id: "93B80BAF-D179-4D17-9175-AFFFE4666EA5",
      repo: "docker-course",
      path: "readings/container.md",
      timeEstimate: "00:20:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Command Cheat Sheet",
      type: "Reading",
      id: "B3FF8E47-54C1-4215-A61E-9D028F8E8718",
      repo: "docker-course",
      path: "readings/container_commands.md",
      timeEstimate: "00:05:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Process Monitoring",
      type: "Reading",
      id: "9EEDD7A8-3DC5-44DC-9047-79139EA24133",
      repo: "docker-course",
      path: "readings/process_monitor.md",
      timeEstimate: "00:10:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Persisting Data in Docker",
      type: "Reading",
      id: "5CD9BA50-210E-484D-84AA-9DD55684CEBA",
      repo: "docker-course",
      path: "readings/persistent_docker.md",
      timeEstimate: "00:15:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Networking in Docker",
      type: "Reading",
      id: "175C4FD2-2EBF-42A8-A973-B95CD8A00A95",
      repo: "docker-course",
      path: "readings/networks.md",
      timeEstimate: "00:15:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Health Checks",
      type: "Reading",
      id: "4AAE4E71-CC64-45BF-BD9C-899E32588094",
      repo: "docker-course",
      path: "readings/health_checks.md",
      timeEstimate: "00:10:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Container Intro",
      type: "Video",
      id: "1B5AA718-A704-4E40-BFE1-F82D0965A083",
      href: "https://player.vimeo.com/video/324339043",
      timeEstimate: "00:12:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Docker Networking",
      type: "Video",
      id: "BB857500-8F2C-49A3-93E2-CD69B970420C",
      href: "https://player.vimeo.com/video/324328969",
      timeEstimate: "00:09:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Persistent Data in Docker: Bind Mounts",
      type: "Video",
      id: "84825BD9-2263-4BC4-B0D8-27E0F78E1AC4",
      href: "https://player.vimeo.com/video/324332060",
      timeEstimate: "00:09:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "Persistent Data in Docker:Volumes",
      type: "Video",
      id: "60E00795-B1E1-46F8-95A7-A54C932DA05F",
      href: "https://player.vimeo.com/video/324328867",
      timeEstimate: "00:09:00",
      topicId: "one",
      subtopicId: "materials"
    },
    {
      name: "DNS Explained Via Comic",
      type: "ExternalResource",
      id: "672E3265-6FEA-4546-9F50-8BFF7ACA1476",
      href: "https://howdns.works/",
      timeEstimate: "00:15:00",
      topicId: "one",
      subtopicId: "additional resources"
    },
    {
      name: "12 minute Docker Overview",
      type: "ExternalResource",
      id: "35103C74-FECF-4BC0-A58B-FA110448086C",
      href: "https://www.youtube.com/watch?v=YFl2mCHdv24",
      timeEstimate: "00:12:00",
      topicId: "one",
      subtopicId: "additional resources"
    },
    {
      name: "Immutable Infrastructure",
      type: "ExternalResource",
      id: "6A19FA41-6310-487C-B4BD-BF280FB501CC",
      href: "https://www.oreilly.com/ideas/an-introduction-to-immutable-infrastructure",
      timeEstimate: "00:20:00",
      topicId: "one",
      subtopicId: "additional resources"
    },
    {
      name: "The 12 Factor App: Key to Cloud Design",
      type: "ExternalResource",
      id: "2A989AE0-95A8-4958-A6B0-85B65683AA7E",
      href: "https://12factor.net/",
      timeEstimate: "00:30:00",
      topicId: "one",
      subtopicId: "additional resources"
    },
    {
      name: "First Containers",
      type: "Assessment",
      id: "F086240F-4635-45E9-AB2A-3325E5EB33C7",
      repo: "docker-course",
      path: "homeworks/first_containers/README.md",
      timeEstimate: "00:20:00",
      topicId: "one",
      subtopicId: "homeworks"
    },
    {
      name: "Container Fun",
      type: "Assessment",
      id: "1789DD21-E821-49A1-B663-9520E4B1D6A2",
      repo: "docker-course",
      path: "projects/container_fun/README.md",
      timeEstimate: "05:00:00",
      topicId: "one",
      subtopicId: "projects"
    },
    {
      name: "Image Composition",
      type: "Reading",
      id: "1881BE02-17A8-47F9-AF1A-2F519C7CCBC2",
      repo: "docker-course",
      path: "readings/images.md",
      timeEstimate: "00:10:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Images and Layers",
      type: "Reading",
      id: "D8C77D66-4C2C-4837-99B0-693A40E85286",
      repo: "docker-course",
      path: "readings/layers.md",
      timeEstimate: "00:20:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Images and the Dockerfile",
      type: "Reading",
      id: "D735BAD9-F6B1-455F-B176-B025C63835D7",
      repo: "docker-course",
      path: "readings/dockerfile.md",
      timeEstimate: "00:20:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Dockerfile Cheat Sheet",
      type: "Reading",
      id: "976455BF-3001-4AB5-8507-FE8CF6AC8C7C",
      repo: "docker-course",
      path: "readings/dockerfile_cheat.md",
      timeEstimate: "00:07:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Docker Hub - Pushing and Pulling Images",
      type: "Reading",
      id: "43A44345-AE49-4F69-A0F9-EFB921868BD1",
      repo: "docker-course",
      path: "readings/dockerhub.md",
      timeEstimate: "00:07:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Docker Images and Layers",
      type: "Video",
      id: "FF810303-AFB5-4D0E-B340-4C1A8688DB8C",
      href: "https://player.vimeo.com/video/324328832",
      timeEstimate: "00:05:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "Dockerfile Building and Pushing",
      type: "Video",
      id: "93A78F91-528A-4222-9763-9821EF963B98",
      href: "https://player.vimeo.com/video/324248455",
      timeEstimate: "00:15:00",
      topicId: "two",
      subtopicId: "materials"
    },
    {
      name: "First Dockerfile",
      type: "Assessment",
      id: "973ED2BE-9030-4BBF-84CA-146D5EE89E13",
      repo: "docker-course",
      path: "homeworks/first_dockerfile/README.md",
      timeEstimate: "00:35:00",
      topicId: "two",
      subtopicId: "homeworks"
    },
    {
      name: "Dockerfiles Galore",
      type: "Assessment",
      id: "4E19308F-7316-4E71-AB46-A9D8BD07ECF7",
      repo: "docker-course",
      path: "projects/dockerfiles_galore/README.md",
      timeEstimate: "06:00:00",
      topicId: "two",
      subtopicId: "projects"
    },
    {
      name: "Docker Compose",
      type: "Reading",
      id: "73628407-AD59-4BB5-B801-9A7A9B4D97AA",
      repo: "docker-course",
      path: "readings/docker_compose.md",
      timeEstimate: "00:20:00",
      topicId: "three",
      subtopicId: "materials"
    },
    {
      name: "The Docker Compose CLI",
      type: "Reading",
      id: "3224AF86-03C8-47AC-ABE4-A8CCC220F070",
      repo: "docker-course",
      path: "readings/docker_compose_cli.md",
      timeEstimate: "00:07:00",
      topicId: "three",
      subtopicId: "materials"
    },
    {
      name: "Building Images with Docker Compose",
      type: "Reading",
      id: "7F642479-ABA0-4EC2-A2C6-248AC07DA956",
      repo: "docker-course",
      path: "readings/compose_image_build.md",
      timeEstimate: "00:05:00",
      topicId: "three",
      subtopicId: "materials"
    },
    {
      name: "Using Docker Compose",
      type: "Video",
      id: "8AB5AA7A-2B95-42B0-9AC2-AF24988F60A0",
      href: "https://player.vimeo.com/video/324248406",
      timeEstimate: "00:07:00",
      topicId: "three",
      subtopicId: "materials"
    },
    {
      name: "Comprehensive Docker Article",
      type: "ExternalResource",
      id: "0D6236F1-FC23-4D4A-9E1F-F340E1436BF0",
      href: "https://medium.freecodecamp.org/comprehensive-introductory-guide-to-docker-vms-and-containers-4e42a13ee103",
      timeEstimate: "00:30:00",
      topicId: "three",
      subtopicId: "additional resources"
    },
    {
      name: "First Docker Compose File",
      type: "Assessment",
      id: "51562B29-19CC-40E9-BBCB-198B57EFECF2",
      repo: "docker-course",
      path: "homeworks/first_composition/README.md",
      timeEstimate: "00:30:00",
      topicId: "three",
      subtopicId: "homeworks"
    },
    {
      name: "Becoming Compose Pros",
      type: "Assessment",
      id: "2F86D4B7-6D54-49E7-9F3C-9CBE6733BFEF",
      repo: "docker-course",
      path: "projects/compose_pros/README.md",
      timeEstimate: "06:00:00",
      topicId: "three",
      subtopicId: "projects"
    },
    {
      name: "Creating a Dockerfile For Your Project",
      type: "Reading",
      id: "D4C8BEC2-7A24-43B4-9661-1B928B87AB33",
      repo: "docker-course",
      path: "readings/projects_dockerfile.md",
      timeEstimate: "00:20:00",
      topicId: "four",
      subtopicId: "materials"
    },
    {
      name: "Docker vs. Heroku",
      type: "ExternalResource",
      id: "D9D28FB6-F5FD-40ED-805B-1A4E6CA81A4F",
      href: "https://tuhrig.de/docker-vs-heroku/",
      timeEstimate: "00:20:00",
      topicId: "four",
      subtopicId: "materials"
    },
    {
      name: "Hosting Using Docker and the Heroku Container Registry",
      type: "Reading",
      id: "D2D410F7-8996-437A-B2F9-83F9B1E751D9",
      repo: "docker-course",
      path: "readings/heroku_guide.md",
      timeEstimate: "00:20:00",
      topicId: "four",
      subtopicId: "materials"
    },
    {
      name: "Putting It Together - Docker",
      type: "Reading",
      id: "937E4341-90EB-436B-BAC3-F4005B812D4D",
      repo: "docker-course",
      path: "readings/put_it_together.md",
      timeEstimate: "06:00:00",
      topicId: "four",
      subtopicId: "homeworks"
    }
  ]
};

module.exports = courses;
