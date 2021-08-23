import type { GetServerSideProps } from 'next'
import Layout from '@/design-system/Layout'
import Box from '@/design-system/primitives/Box'
import useSWR from 'swr'
import { useEffect } from 'react'
import ProtocolTile, {Protocol} from '@/design-system/ProtocolTileNew'
import Masonry from 'react-masonry-component';
import {useRouter} from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { Fragment } from 'react'
const fetcher = (url:string) => fetch(url).then(res => res.json())

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {index} = ctx.query

  if(!index){
    console.log('in data full')
    const initialData = await fetcher('https://api.boardroom.info/v1/protocols?limit=20')
    return { props: { initialData, selected: index ? index.toString() : null } }
  }
  const initialDataItem = await fetcher(`https://api.boardroom.info/v1/protocols/${index[0]}`)
  const initialData = {}
  initialData.data = [initialDataItem.data]
  return { props: { initialData:initialData , selected: index ? index.toString() : null } }
  
};

interface Props {
  initialData: Protocol[],
  selected?:string;
}

const Home = ({initialData, selected}:Props) => {
  
  const { data, error } = useSWR('https://api.boardroom.info/v1/protocols', fetcher, { initialData: initialData })
  const router = useRouter()

  useEffect(() => {
    console.log('in', initialData)
  }, [initialData])



  if(error){
    return(<Box>Service is currently not available</Box>)
  } 

 



  return (
    <Layout isSelected={selected ? true : false}>
               <Masonry
                options={{
                  transitionDuration:0
                }}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
                style={{
                  padding:'0',
                  margin:'0',
                  transition: 'none',
                  height:'auto',
                  width:'100%'}}
                > 
              <AnimatePresence>
                      {data.data.map((item: Protocol) => {
                        if (item.cname === selected || selected === null) {
                          return (
                            <ProtocolTile
                              onClick={() => {
                                if (selected === null) { router.push(`./${item.cname}`) }
                              }}
                              key={item.name}
                              selected={item.cname === selected ? true : false}
                              icons={item.icons}
                              name={item.name}
                              totalProposals={item.totalProposals}
                              totalVotes={item.totalVotes}
                              uniqueVoters={item.uniqueVoters}
                            />
                          )
                        } else {
                          return (
                            <Fragment
                              key={item.name}
                            ></Fragment>)
                        }
                      })}
                
                 
                  </AnimatePresence>
                </Masonry>
    </Layout>
  )
}

export default Home
