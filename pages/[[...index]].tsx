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
import Button  from '@/design-system/primitives/Button'

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
      {!selected && (
        <Box layout='flexBoxColumn' css={{
          width: '100%',
          borderRadius: '$2', marginBottom: '$2', marginTop: '$2',
          color: 'gray',
          padding: '$2', boxSizing: 'border-box', height: '256px', border: '1px solid lightgray'
        }}>
          <Box layout='flexBoxRow' css={{justifyContent:'space-between'}}>
            <h1>Vote for the proposals—<br/>make difference</h1>
            <Button look='outlined'><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></Button>
          </Box>
          <p>Explore open protocols and vote for the changes</p>
        </Box>
      )}

      {!selected  && (
        <Box layout='flexBoxRow'  css={{gap:'$1', padding:"$2 0"}}>
          <Button 
          selected={true}
          color='black' look='outlined'>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg> All Protocols
          </Button>
          <Button color='black' look='outlined'>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.877075C3.84222 0.877075 0.877075 3.84222 0.877075 7.49991C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49991C14.1227 3.84222 11.1576 0.877075 7.49991 0.877075ZM1.82708 7.49991C1.82708 4.36689 4.36689 1.82707 7.49991 1.82707C10.6329 1.82707 13.1727 4.36689 13.1727 7.49991C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49991ZM8.37287 7.50006C8.37287 7.98196 7.98221 8.37263 7.5003 8.37263C7.01839 8.37263 6.62773 7.98196 6.62773 7.50006C6.62773 7.01815 7.01839 6.62748 7.5003 6.62748C7.98221 6.62748 8.37287 7.01815 8.37287 7.50006ZM9.32287 7.50006C9.32287 8.50664 8.50688 9.32263 7.5003 9.32263C6.49372 9.32263 5.67773 8.50664 5.67773 7.50006C5.67773 6.49348 6.49372 5.67748 7.5003 5.67748C8.50688 5.67748 9.32287 6.49348 9.32287 7.50006Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>  My Protocols
          </Button>
        </Box>
      )}
        

               <Masonry
                options={{
                  transitionDuration:0
                }}
                style={{
                  padding:'0',
                  margin:'0',
                  marginLeft:!selected ?  '-8px' : '0',
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
