export const userData = {
  username: "alex_ant",
  first_name: "Alex",
  last_name: "Ant",
  email: "alex_ant@gmail.com",
  boards: [
    {
      id: 91,
      name: "ant site",
      is_admin: true,
      members: [
        {
          username: "alex_ant",
          is_admin: true,
        },
        {
          username: "beth_bat",
          is_admin: false,
        },
      ],
    },
    {
      id: 92,
      name: "bat site",
      is_admin: true,
      members: [
        {
          username: "alex_ant",
          is_admin: true,
        },
        {
          username: "beth_bat",
          is_admin: false,
        },
        {
          username: "carli_cat",
          is_admin: false,
        },
      ],
    },
  ],
};

export const boardData = {
  id: 91,
  name: "ant site",
  members: [
    {
      username: "alex_ant",
      is_admin: true,
    },
    {
      username: "beth_bat",
      is_admin: false,
    },
  ],
  lists: [
    {
      id: 91,
      name: "design",
      board_id: 91,
      cards: [
        {
          id: 91,
          name: "create wireframe",
          text: "use figma instead of sketch",
          due_date: "2020-10-01T04:00:00.000Z",
          status: "not_started",
          list_id: 91,
        },
        {
          id: 92,
          name: "mockup mobile",
          text: "pass off using zeplin",
          due_date: "2020-10-06T04:00:00.000Z",
          status: "in_progress",
          list_id: 91,
        },
      ],
    },
    {
      id: 92,
      name: "backend",
      board_id: 91,
      cards: [
        {
          id: 93,
          name: "set up database",
          text: "use node and express",
          due_date: "2020-10-08T04:00:00.000Z",
          status: "completed",
          list_id: 92,
        },
        {
          id: 94,
          name: "test database",
          text: "just basic tests",
          due_date: "2020-10-03T04:00:00.000Z",
          status: "not_started",
          list_id: 92,
        },
      ],
    },
    {
      id: 93,
      name: "fontend",
      board_id: 91,
      cards: [
        {
          id: 95,
          name: "write the frontend",
          text: "use react and redux",
          due_date: "2020-10-01T04:00:00.000Z",
          status: "completed",
          list_id: 93,
        },
        {
          id: 96,
          name: "eat tests",
          text: "use the new api",
          due_date: "2020-10-02T04:00:00.000Z",
          status: "in_progress",
          list_id: 93,
        },
      ],
    },
  ],
};
