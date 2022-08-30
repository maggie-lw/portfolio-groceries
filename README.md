## Why Groceries?

I realise I often rely on my notepad on my phone to help with my groceries. So my goal for this project is to create an app that can help to make grocery shopping a lot easier. I am hoping to be able to actually use this app for my groceries one day. As a first project, I am also looking for something that can give me practice in using many of the fundamental features that ReactJS (and in this case, NextJS) offers, without being too overwhelming. 

## How I worked on this project

- I first drafted a design on my iPad. [Screenshot here](https://lh3.googleusercontent.com/XdW8GhJAzf7Bep7oHfQ7VKqbScX0w21U5vHNwNmrZmI2sPtCVa-mS9PbWIkt7P-R0jTCIT0pEyUUcVIZvttP-4vCaggdiX_J7fJ8KGm23nUWyJTaTnRnhZ8VgI3aKH4-RJWNLUiRJUwJLAls93K5sQk8e6pgCtY5wZcEBJOBo9hZcDV3HUJAB-br8XyE-wALXD51O0zfVu-JUxBid-d7NjMINAQAe1VpY5oOKeWQB_flCja4SIEZa_ZD8KoWSMScba4D6d1l_MWpm8fwf-xWUjfEmfxh_cfDPpJ3h5zeLEIi4uFZChi5SUssiUhG_K5NczW2rEZenKN_e7tNsjp_0BOES0QJnXrAl15iySz4IMi3fLSyq4nLtMKMGLSQ8S5uFL6RpQK2JAwEET31LJ3KtjljPTQLlVihnT80Q3KH5l6lMWZjmId0yJS-yUS5zC2JuZf2xWp97YlC268SFZ9Z1XmY-KyPlK2svveu3CXnbPdbrdGga2sspRBJcGSTWd5bHakO1hpkYX_W3Qzz1mXqcl5kxC_nfDMrckt8Ok1x5vY1ezcFu4xAq30o01DnigXhbAPXHEQsVuzu353MRrvT8X7Yaw1lKak6X__3VRG58F0pp__BHhaptmnyYgELu7vMVI64zhr2Y5D5ede0WMXmxoCvhqXZmyp6EsOv2HxyK6By7ZlVYZv3Bniy_F8CzUuPUtqr8oSDHyJEAgQgRx-in-w2b5uJij9Jxsf1az8K1U2E3JyOZ5RdpcnGTXtBSf2udQ503TB8zrAZEXxXOxLIXwaqBY7E-lrwdw_Wx8yod3GHRS3gqlpLkgzTpLrNPQA6ABo4=w1637-h781-no?authuser=2)
- I broke down tasks into categories and delegated tasks to each day. [Screenshot here](https://lh3.googleusercontent.com/56AlkjIYgCNnX031mNzRGRrvwpiD66E-t12pVJpgkQVVOSPf7PATRCghu0Pq3JJFzNGynId2ay1Ami3wePjnnN0gY7_vhkxn1AIiSUECIq7xVckTs-Acsknlei-oceQu-6V2OTGuvwvbxF3hs2oIs3iDaxtQ1jGFg3qAcnhUi2xKVM9AFKMIJxNGdMyIPkXKa42aF3ftkEROB35J7QnkgZ-irV3kvwP2ovYAWJ83SvJ_IwDtYlV4bSBYyduqLePqru3xq-17XBLg_R88e7hb65Waeui21WIgFiOV5xqWAvasX7XQWPDbBs9g3OUePVOVRTAftmnJgbGN4hv07m1K0mNb7kK76IWRvr4ANxTsS_Imgg3ERyExM99b1b6Y7PEtb0rnoZyjKrZB4YGPDVO2IC-BDtPPhrN0lzusj4-W-2NaHUAKxopNarS_s7fPjyIxnUlFOz_DO8JucV3XqPTAD3UrVBN5m7GhmnXtGCwBeToQ9X84iGfo5H8Gq6BqEDHXFIW22E75-gtPiecDE5Cu_rwMC08XJ3PBKbV0ridGRZ33FMu1AbqKh5m9QivCwMQazCbj9i4B06UGIX-HnGlkDDEIr6k6LefBHWzlj6JO1PooVCKIek2YNZyFBrYXgR09al9TKkIhuQDP05SBl5HYqsY9zE1ILSpFzfTvEThdjwXBUmbDBfRyin-kW7Jos6J8trgfXr7J_g_jxm9F82xAbyxb3XJxfGZoSGT19hde9TSeczefiJevmwiRClkVElV1tkEpGSIq8cIWgHaAKc3OUY5hzXNxkJ4XFQqILRNbT8kn8226Becqi2w79b8voYMBfJyz=w1911-h1021-no?authuser=2)
- I rely on documentations online including Firebase and NextJS to help with sections that are beyond my previous learning. 
- I write down my reflections every few days to record my learning process and challenges, and things I could improve on next time. 

## How to navigate this project

- User authentication functionality. [ContextAPI](https://github.com/maggie-lw/portfolio-groceries/blob/main/components/store/auth-context.js) | [Login](https://github.com/maggie-lw/portfolio-groceries/blob/main/components/Auth/LogInForm.js)
- Connecting to a database. [Example Code](https://github.com/maggie-lw/portfolio-groceries/blob/main/components/Lists/AllLists.js) 
- Limit access to pages based on auth status. [Auth Validation Code](https://github.com/maggie-lw/portfolio-groceries/blob/main/components/Auth/AuthGuard.js) 
- Custom CSS. [Example Code](https://github.com/maggie-lw/portfolio-groceries/blob/main/components/Lists/GroceryLists.module.css)

## Why I built the project this way

- This is my very first project, so I wanted to apply all the basic skills that I've learned from my course. I've tried to incorporate as many common React hooks as I can to practise, including useState, useEffect, useRef, useContext, as well as creating a custom hook.
- I wanted to further improve my familiarity with applying user authentication within apps, hence why I decided to make user authentication a big part of this project. It also allowed each users to create their own lists that are secure. This is also my first try in linking data posted to the database with the currently logged in user.
- I opted for NextJS instead of React Router, as I wanted more practice with NextJS. NextJS also requires less code, and provides better readability, and better project management. 

## Things I would like to change

- I realised I forgot to create a bigger umbrella folder called 'src'...
- I conceptualised the component tree within my head before I started. Things got a little messy in the process with the nested props. I would want to include drawing a component tree diagram before I start my future projects. 
- Code can be cleaner and reduced. EG: Creating a custom hook for http requests on list and content management.
- Incorporate server-side rendering for Dashboard to improve performance; and static generation for index pages.
- Set timer to log user out to improve security.  
- To improve the efficacy of the app, I'd like to add the ability for users to choose the measurements of each item (eg kg, packets). 
- I still need to familiarise myself more with CSS. 

##

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
