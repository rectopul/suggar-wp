import Calendary from  '../../assets/calendary.png'
import AuthorIco from  '../../assets/author-ico.png'
import { useCallback, useEffect, useState } from 'react'
import { PostsMain } from '../../@types/Posts'
import { getSinglePost, getUser } from '../../util/Api'
import { UserMain } from '../../@types/User'
import { PostComments } from './Comments'

export function Post() {
    const [post, setPost] = useState<PostsMain | null>(null)
    const [user, setUser] = useState<UserMain | null>(null)

    const retrievePost = useCallback(async () => {
        try {
            if(window.post_info) {
                const thePost = await getSinglePost(window.post_info.id)

                thePost && setPost(thePost)

                const theUser = await getUser(thePost.author);

                theUser && setUser(theUser);
            }
        } catch (error) {
            console.log(`Erro ao buscar post`, error)
        }
    }, [])

    useEffect(() => {
        retrievePost()
    }, [retrievePost])

    return (
        <div className="w-full py-10">
            {window.post_info && (
                <div className="w-full max-w-[1300px] mx-auto flex flex-col pb-10 border-b border-neutral-300">
                    <h2 className="text-blue-900 text-xl font-bold font-pop mx-auto text-center mb-8">{window.post_info.title}</h2>

                    <div className="flex items-center">
                        <span className="flex items-center text-neutral-700 text-base font-medium font-pop">
                            <img src={Calendary} alt="calendar" className='mr-2 mt-[-4px] w-[20px]' />
                            <span>{window.post_info.date}</span>
                        </span>

                        <span className="flex items-center ml-10 text-neutral-700 text-base font-medium font-pop">
                            <img src={AuthorIco} alt="calendar" className='mr-1 mt-[-4px] w-[25px]' />
                            <span>{window.post_info.author}</span>
                        </span>
                    </div>

                    <div className="w-full h-[400px] bg-zinc-300 mt-5 flex justify-center items-center overflow-hidden">
                        <figure className='w-full'>
                            <img src={window.post_info.image} alt="post thumbnail" className='w-full' />
                        </figure>
                    </div>

                    <div className="w-full flex flex-col">
                        <h2 className="text-blue-900 text-lg font-bold font-pop my-6">{window.post_info.title}</h2>
                        {post && (
                            <div className="w-full gap-7 inline-flex flex-col text-neutral-700 text-sm font-normal font-pop" dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                        )}
                    </div>
                </div>
            )}
            {user && (<PostComments user={user} />)}
        </div>
    )
}