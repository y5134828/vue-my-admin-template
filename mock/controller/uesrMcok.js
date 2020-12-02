const { mock } = require("mockjs");

module.exports = [
  {
    url: "/userList",
    type: "post",
    response(config) {
      const { paginate } = config.body;
      return {
        code: 200,
        msg: "success",
        data: {
          currentPage: paginate,
          totlePage: 15,
          "userlist|15": [
            {
              id: `@increment(${paginate})`,
              name: "@ctitle(2, 3)",
              phone: "18735951245",
              ip: "@ip",
              channel: "@ctitle(2)",
              keyword: "@ctitle(2, 5)",
              disabled: "@integer(0, 1)",
              loginTime: "@datetime()",
              registeTime: "@datetime()",
            },
          ],
        },
      };
    },
  },
];
