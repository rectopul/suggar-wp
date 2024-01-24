import { useCallback, useEffect, useState } from "react"
import { PostsMain } from "../../@types/Posts"
import { getPosts } from "../../util/Api"
import { PostItem } from "./PostItem"

export function PostsHome() {
    const [posts, setPosts] = useState<PostsMain[] | null>(null)

    const getAllPosts = useCallback(async () => {
        try {
            const posts = await getPosts()

            posts && setPosts(posts)
        } catch (error) {
            console.log(`Erro ao buscar posts na home`, error)
        }
    }, [])

    useEffect(() => {
        getAllPosts()
    }, [getAllPosts])


    return (
        <div className="w-full px-2 py-[60px]">
            <div className="w-full max-w-[1300px] mx-auto flex flex-col">
                <h3 className="text-black text-xl font-medium mb-[22px]">As matérias <span className="text-blue-900">mais recentes</span></h3>

                <div className="w-full flex flex-wrap items-center">
                    {posts && posts.length && posts.map((p, k) => (
                        <PostItem post={p} key={k} />
                    ))}
                </div>
            </div>
        </div>
    )
}