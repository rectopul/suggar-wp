import { useCallback, useEffect, useState } from "react"
import { PostsMain } from "../../@types/Posts"
import { PostCategoryMain } from "../../@types/PostCategory"
import { getCategory, getSiteMedia } from "../../util/Api"
import { MediaTypes } from "../../util/types"

interface PostItemProps {
    post: PostsMain
}

export function PostItem({ post }: PostItemProps) {
    const [categories, setCategories] = useState<PostCategoryMain[] | null>(null);
    const [thumbnail, setThumbnail] = useState<MediaTypes | null>(null)

    const getMedia = useCallback(async () => {
        try {
            const media: MediaTypes = await getSiteMedia(post.featured_media)

            media && setThumbnail(media)
        } catch (error) {
            console.log(`erro ao buscar media`, error)
        }
    }, [post.featured_media])

    const getPostCategory = useCallback(async () => {
        try {
            if (post.categories) {
                const categoryArray = await Promise.all(post.categories.map(async (c) => {
                    try {
                        const searchCategory = await getCategory(c);
                        return searchCategory;
                    } catch (error) {
                        console.log(`Erro ao buscar categoria do post`, error);
                        return null;
                    }
                }));
                setCategories(categoryArray.filter(category => category !== null) as PostCategoryMain[]);
            }
        } catch (error) {
            console.log(`Erro ao buscar categoria do post`, error);
        }
    }, [post.categories]);

    useEffect(() => {
        getPostCategory()
        getMedia()
    }, [getPostCategory, getMedia])

    return (
        <>
            {categories && (
                <div className="w-6/12 px-2">
                    <div className="w-full p-2.5 border border-stone-300 flex-col justify-start items-start gap-[22px] inline-flex">
                        <figure className="w-full">
                            {thumbnail && (
                                <img className="w-full" src={thumbnail.media_details.sizes.full.source_url} alt={post.slug} />
                            )}
                        </figure>

                        <div className="flex-col justify-start items-start gap-3 inline-flex">
                            <span className="flex items-center">
                                {categories.map((c, k) => (
                                    <a href={c.link} className="text-blue-900 mr-1 text-lg font-medium font-['Poppins'] underline" key={k}>
                                        {c.name}
                                    </a>
                                ))}
                            </span>

                            <h2>
                                <a className="text-black text-xl font-medium font-pop" href={post.link}>{post.title.rendered}</a>
                            </h2>

                            <span className="text-black text-base font-normal font-pop" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}