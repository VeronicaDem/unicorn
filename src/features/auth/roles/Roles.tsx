import { NextRequest } from "next/server";
import isAuth from "../feature/isAuth";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import axios from "axios";

class Roles {
  public async isResolved(req: NextRequest) {
    // делаем get запрос на получение всех разрешенных разделов
    // article/[articleId] - только просмотр READ
    // article/add - CREATE
    // article/delete - DELETE
    // article/update - UPDATE
    // получаю от сервиса следующие данные
    // article : create, delete, update, read
    // atricle: <набор прав через запятую>
    const cookies = req.cookies;
    return this.getRoles(cookies)
      .then((roles) => {
        const urlPath = req.nextUrl.pathname;
        console.log("url ", urlPath);
        const delimeterIndex = urlPath.indexOf("/", 1);
        const entity = urlPath.substring(
          1,
          delimeterIndex > -1 ? delimeterIndex : undefined
        );
        const delimeterIndexAction = urlPath.indexOf("/", delimeterIndex + 1);
        let action = urlPath.substring(
          delimeterIndex,
          delimeterIndexAction > -1 ? delimeterIndexAction : undefined
        );
        if (action === "") {
          action = "read";
        }
        return (
          this.canCreate(roles, action, entity) ||
          this.canUpdate(roles, action, entity) ||
          this.canDelete(roles, action, entity) ||
          this.canRead(roles, action, entity)
        );
      })
      .catch((err) => {
        console.log("Error while resolving roles", err);
        return Promise.reject(err);
      });
  }
  async getRoles(cookies: RequestCookies) {
    const userId = cookies.get("userId");
    const accessToken = cookies.get("accessToken");
    const refreshToken = cookies.get("refreshToken");
    if (
      userId == undefined ||
      accessToken === undefined ||
      refreshToken === undefined
    ) {
      return Promise.reject(new Error("Invalid user"));
    }
    return axios("http://localhost:3000/api/user/roles", {
      data: {
        accessToken,
        refreshToken,
        userId,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("error while getting roles", err);
        return Promise.reject(err);
      });
  }
  canRead(roles: any[], action: string, entity: string): boolean {
    const ROLES_READ = new Set(["user", "admin"]);
    if (action !== "read") return false;
    if (entity === "article") {
      return roles.filter((role) => ROLES_READ.has(role.name)).length > 0;
    }
    return false;
  }
  canDelete(roles: any[], action: string, entity: string): boolean {
    const ROLES_DELETE = new Set(["admin"]);
    if (action !== "delete") return false;
    if (entity === "article") {
      return roles.filter((role) => ROLES_DELETE.has(role.name)).length > 0;
    }
    return false;
  }
  canUpdate(roles: any[], action: string, entity: string): boolean {
    const ROLES_UPDATE = new Set(["admin"]);
    if (action !== "update") return false;
    if (entity === "article") {
      return roles.filter((role) => ROLES_UPDATE.has(role.name)).length > 0;
    }
    return false;
  }
  canCreate(roles: any[], action: string, entity: string) {
    const ROLES_CREATE = new Set(["admin", "user"]);
    if (action !== "add") return false;
    if (entity === "article") {
      return roles.filter((role) => ROLES_CREATE.has(role.name)).length > 0;
    }
    return false;
  }
}
export default new Roles();
