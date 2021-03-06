import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'

export default function Home({result}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API. --- {result.id}</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className={styles.card}
                    >
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

/*
    동적 page에서만 설정가능
    fallback  설정 : build시 생성되지 않은 페이지(=url)접근시 fallback기능을 이용하여 페이지생성시까지 대기할수 있는 기능을 제공
 */
/*
export const getStaticPaths = async () =>  {
    return {
        fallback : true
    }
}
*/

/*
    next.js에서 pre-rendering을 하는 방법에는 2가지가 있다
    1.static-generation : 빌드시 html을 생성해서 요청시마다 생성된 html을 반환
    2.SSR : 요청시마다 html을 신규로 생성
*/

/*
    static-generation을 이용하여 데이터를 가져오는 방식
    - build시 단 1번만 실행된다 -> 한번 build된 데이터가 변경되지 않는다
    - yarn dev 로 실행시 F5를 누를때마다 실행되나 이는 테스트 환경이므로 착오하지 말 것
*/
export const getStaticProps = async (context) => {
    let randomInt = getRandomInt(1,100)
    let result = await fetch('https://jsonplaceholder.typicode.com/todos/'+randomInt)
    result = await result.json()

    return {
        props: {
            result : result
        },
        revalidate: 1 //단위 : sec => build - start 후 설정된 초 간격으로 신규 request가 들어오면 re-pre-rendering수행
    }
}
