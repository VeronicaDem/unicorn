import { NextRequest } from "next/server";
import isAuth from "../feature/isAuth";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

class Roles {
    public isResolved(req: NextRequest) {
        // делаем get запрос на получение всех разрешенных разделов
        // article/[articleId] - только просмотр READ
        // article/add - CREATE 
        // article/delete - DELETE
        // article/update - UPDATE
        // получаю от сервиса следующие данные
        // article : create, delete, update, read
        // atricle: <набор прав через запятую>
        const cookies = req.cookies;
        if (!isAuth(req)) return false;
        const urlPath = req.nextUrl.pathname;
        console.log("url ", urlPath);
        const delimeterIndex = urlPath.indexOf("/", 1);
        const entity = urlPath.substring(1, delimeterIndex > -1 ? delimeterIndex : undefined);
        const delimeterIndexAction = urlPath.indexOf("/", delimeterIndex + 1);
        const action = urlPath.substring(delimeterIndex, delimeterIndexAction > -1 ? delimeterIndexAction : undefined);
        return this.canCreate(cookies, action, entity) ||
            this.canUpdate(cookies, action, entity) ||
            this.canDelete(cookies, action, entity) ||
            this.canRead(cookies, entity);
    }
    private canCreate(cookies: RequestCookies, action: string, entity: string) {
        return action.endsWith('add') && cookies.get(entity)?.value?.includes("CREATE");
    }
    private canUpdate(cookies: RequestCookies, action: string, entity: string) {
        return action.endsWith('update') && cookies.get(entity)?.value?.includes("UPDATE");
    }
    private canDelete(cookies: RequestCookies, action: string, entity: string) {
        return action.endsWith('delete') && cookies.get(entity)?.value?.includes("DELETE");
    }
    private canRead(cookies: RequestCookies, entity: string) {
        return cookies.get(entity)?.value?.includes("READ");
    }
}
export default new Roles();