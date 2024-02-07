import axios from "axios";
import { request } from "https";
import moment from "moment-timezone";

import { NextRequest } from "next/server";

export default function isAuth(request: NextRequest): boolean {
  const cookies = request.cookies;
  const accessToken: string | undefined = cookies.get("accessToken")?.value;
  if (accessToken == undefined) {
    console.log("Access token is not available");
    return false;
  }
  const accessTokenExpiresAt: string | undefined = cookies.get(
    "accessTokenExpiresAt"
  )?.value;
  if (accessTokenExpiresAt !== undefined) {
    const accessTokenExpiresAtDate = moment(
      accessTokenExpiresAt,
      moment.ISO_8601
    );
    const refreshTokenExpiresAt: string | undefined = cookies.get(
      "refreshTokenExpiresAt"
    )?.value;
    const refreshToken: undefined | string = cookies.get("refreshToken")?.value;
    if (refreshToken === undefined || refreshToken === undefined) {
      return false;
    }

    const refreshTokenExpiresDate = moment(
      refreshTokenExpiresAt,
      moment.ISO_8601
    );
    if (
      tokenExpiresNow(accessTokenExpiresAtDate) &&
      !tokenExpiresNow(refreshTokenExpiresDate)
    ) {
      refresh({
        user: {
          login: cookies.get("login")?.value,
          userId: cookies.get("userId")?.value,
        },
        accessToken,
        refreshToken,
      }).then((res) => {
        cookies.set("refreshToken", res.refreshToken);
        cookies.set("accessToken", res.accessToken);
        cookies.set(
          "refreshTokenExpiresAt",
          res.refreshTokenExpiresAt?.local()?.format()
        );
        cookies.set(
          "accessTokenExpiresAt",
          res.accessTokenExpiresAt?.local()?.format()
        );
      });
    }
  }

  return false;
}

function tokenExpiresNow(tokenTime: moment.Moment): boolean {
  return moment(moment.now()).isBefore(tokenTime);
}
interface UserDto {
  login: string | undefined;
  userId: string | undefined;
}
interface RefreshRequestBody {
  refreshToken: string;
  accessToken: string;
  user: UserDto;
}
interface AuthDto {
  refreshToken: string;
  accessToken: string;
  accessTokenExpiresAt: moment.Moment;
  refreshTokenExpiresAt: moment.Moment;
}
function refresh(body: RefreshRequestBody): Promise<AuthDto> {
  return axios
    .post(`http://localhost:3000/api/user/refresh`, {
      data: {
        ...body,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
}
