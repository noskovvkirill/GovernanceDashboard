/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps } from 'next'
import Layout from '@/design-system/Layout'
import Box from '@/design-system/primitives/Box'
import {useSWRInfinite} from 'swr'
import { useEffect, useRef } from 'react'
import ProtocolTile, {Protocol} from '@/design-system/ProtocolTile'
import Masonry from 'react-masonry-component';
import {useRouter} from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { Fragment } from 'react'
import axios from 'axios'
import { useInView } from 'react-intersection-observer';
import { minWidthTile, maxWidthTile } from 'contexts/cardSettings'
import {useRecoilValue} from 'recoil'

const fetcher = (url:string) => axios.get(url).then(res => res.data)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {index} = ctx.query

  if(!index){
    const initialData = await fetcher('https://api.boardroom.info/v1/protocols?limit=10')
    return { props: { initialData:[initialData], selected: index ? index.toString() : null } }
  } 
    const protocolName =    index[0].slice(0,1).toLowerCase() + index[0].slice(1,index[0].length)
    const initialDataItem = await fetcher(`https://api.boardroom.info/v1/protocols/${protocolName}`)
    const initialData = JSON.parse(JSON.stringify(initialDataItem))
    initialData.data = [initialDataItem.data]
    return { props: { initialData: [initialData], selected: protocolName  } }
};

interface Props {
  initialData: Protocol[],
  selected?:string;
}


const getKey = (pageIndex:any, previousPageData:any) => {
  if ((previousPageData && !previousPageData.data) || ( previousPageData && !previousPageData.nextCursor)) return null
  if (pageIndex === 0) return `https://api.boardroom.info/v1/protocols?limit=10`
  return `https://api.boardroom.info/v1/protocols?limit=10&cursor=${previousPageData.nextCursor}`
}


const Home = ({ initialData, selected}:Props) => {
 
  const { data, error, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher, { initialSize: 1, initialData: initialData })
  const router = useRouter()
  const minWidth = useRecoilValue(minWidthTile)
  const maxWidth = useRecoilValue(maxWidthTile)

  //ref is used to persist the current page number accross the renders
  const currentPage = useRef(1)

  //
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const refreshData = () => {
    router.replace(router.asPath);
  }

  
  useEffect(()=>{
      if(selected === null){
        setSize(currentPage.current+1)
      } else{
        refreshData()
      }
  }, [selected])

  useEffect(() => {
    if (inView) {
      currentPage.current = currentPage.current + 1
      setSize(size + 1)
    }
  }, [inView])

  if(error){
    return(<Box>Service is currently not available {JSON.stringify(error)}</Box>)
  } 

  if (!data) {
    return (<Box>Loading...</Box>)
  }

  

 
  return (
    <Layout isSelected={selected ? true : false}>
               <Masonry
                options={{
                  transitionDuration:0
                }}
                style={{
                  padding:'0',
                  margin:'0',
                  transition: 'none',
                  height:'auto',
                  width:'100%'}}
                > 
              <AnimatePresence>
                    {data.map((item: any, i:number) => {
                      if(!item.data){
                        return(
                          <Fragment key={i}></Fragment>
                        )
                      }
                      return (
                        <Fragment key={item.nextCursor}>
                          {item.data.map((item: Protocol) => {
                            if (item.cname === selected || selected === null) {
                              return (
                                <ProtocolTile
                                  minWidth={minWidth}
                                  maxWidth={maxWidth}
                                  onClick={() => {
                                    if (selected === null) { router.push(`./${item.cname}`) }
                                  }}
                                  key={item.name}
                                  selected={item.cname === selected ? true : false}
                                  icons={item.icons}
                                  name={item.name}
                                  cname={item.cname}
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
                        </Fragment>)
                    })}
  
                  </AnimatePresence>
                </Masonry>

                {isValidating && (
                  <Box layout='flexBoxRow' css={{width:'100%', alignItems:'center'}}>Loading...</Box>
                )}

                {!selected && !isValidating && data[data.length-1].nextCursor && (
                    <button 
                      style={{visibility:'hidden'}}
                      ref={ref}
                      onClick={() => {
                      currentPage.current = currentPage.current+1
                      setSize(size + 1)
                    }}>Load More</button>
                )}
          
    </Layout>
  )
}

export default Home
