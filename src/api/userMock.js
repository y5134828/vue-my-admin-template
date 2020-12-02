import request from "@/utils/request";

export async function getUserList(data) {
  return request({
    url: "/userList",
    method: "post",
    data,
  });
}
