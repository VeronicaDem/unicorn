'use client'
import { useParams } from "next/navigation"
/**
 * Страница с определенной статьей
 * Доступна авторизованному пользователю
 */
export default function ArticlePage(props: any) {
    const { articleId } = useParams();
    return (
        <div>
            {articleId}
        </div>
    )
}