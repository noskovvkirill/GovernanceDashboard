import Box from '@/design-system/primitives/Box'

import { BoxMotion } from '@/design-system/primitives/Box'
import ProtocolCard from './ProtocolCard'

import {  AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import axios from 'axios'
import {  useState, useEffect } from 'react'




const fetcher = (url: string) => axios.get(url).then(res => res.data)

export type ProtocolData = {
    refId: string,
    title: string,
    content: string,
    proposer: string,
    totalVotes: number,
    currentState:string,
    choices:string[],
    startTimestamp:number,
    endTimestamp:number,
    results:[{
        total:number,
        choice:number
    }]
}






const ProtocolData = ({ container, name, border, shadow, background }: { container:any, name?: string, background: string, border: string, shadow: string }) => {
    const { data, error, isValidating } = useSWR(`https://api.boardroom.info/v1/protocols/${name}/proposals`, fetcher)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        console.log('data selected', selected)
    }, [selected])

    if (error) {
        return (<></>)
    }
    if (isValidating) {
        return (
            <Box css={{ height: '512px' }}></Box>
        )
    }

    return (
        <>
            <Box layout='flexBoxRow' css={{
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginBottom:'$2',
                maxWidth:'1024px',
                overflow:'visible',
                gap: '$0',
                paddingLeft:'$3',
                width: '100%', flexWrap: 'nowrap',
            }}> 
            {data.data.length === 0 && (
                <Box>No proposals yet</Box>
            )}
                {data.data.map((_: any, i: number) =>
                    <Box
                        onClick={()=>{
                            setSelected(i)
                        }}
                        css={{
                            cursor:'pointer',
                            minWidth: i === selected ? '256px' : '0px',
                            background: i === selected ? border : 'inherit',
                            boxShadow: i === selected ? shadow : 'inherit',
                            border: `1px solid ${border}`, height: '4px', width: '100%',
                            transition: 'all 1s ease-out',
                            '&:hover':{
                                minWidth:'256px',
                                background:border,
                            }
                        }}
                        key={i}>
                    </Box>)}
            </Box>

            <Box 
            layout='flexBoxRow'
            css={{position:'relative', 
            maxWidth:'100%', overflow:'visible', gap:'$1'}}
            >
                <AnimatePresence>
                   
                            <BoxMotion 
                                        exit={{opacity:'0',  display:'none'}}
                                        css={{
                                        fill:border,
                                        justifyContent:'flex-end',
                                        stroke:border,
                                        visibility:selected >= 1 ? 'visible' : 'hidden',
                                        display:'flex', 
                                        // padding:'$2',
                                        alignItems:'center',
                                        boxSizing: 'border-box',
                                        height:'512px',
                                        cursor:'pointer',
                                        overflow:'visible',
                                        width:'16px',
                                        transform:'translateX(-8px) scale(2)',
                                        opacity:'0.25',
                                        // border:`1px solid ${border}`,
                                        minHeight:'100%',
                                        borderRadius:'$2',
                                }}
                                    onClick={()=>{
                                        setSelected(selected - 1)
                                    }}
                                        key={`prevCard${selected}`} 
                                    >
                                           <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="64"
                                            height="64"
                                            style={{transform:'rotate(-180deg)'}}
                                            fill="none"
                                            viewBox="0 0 64 64"
                                            >
                                            <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="2"></circle>
                                            <path
                                                fill="currentColor"
                                                d="M14 31a1 1 0 100 2v-2zm36.707 1.707a1 1 0 000-1.414l-6.364-6.364a1 1 0 00-1.414 1.414L48.586 32l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM14 33h36v-2H14v2z"
                                            ></path>
                                            </svg>
                         </BoxMotion>
              

    
                    {[data.data.find((_:any, i:number)=>i===selected)].map((item: ProtocolData, i: number) => {
                            return (
                                <ProtocolCard
                                container={container}
                                key={item.refId+'data'}
                                border={border}
                                background={background}
                                shadow={shadow}
                                item={item}
                                i={i}
                                />
                            )
                    })}
              

                    {selected < data.data.length - 1 && (
                                    <BoxMotion
                                        exit={{opacity:'0.5', position:'-10000px', display:'none'}}
                                        key={`nextCard${selected}`} 
                                        css={{
                                        fill:border,
                                        stroke:border,
                                        display:'flex', 
                                        // padding:'$2',
                                        alignItems:'center',
                                        boxSizing: 'border-box',
                                        height:'512px',
                                        cursor:'pointer',
                                        overflow:'visible',
                                        width:'32px',
                                        // border:`1px solid ${border}`,
                                        minHeight:'100%',
                                        opacity:'0.25',
                                        borderRadius:'$2',
                                }}
                                    onClick={()=>{
                                        setSelected(selected + 1)
                                    }}
                                    >
                                           <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="64"
                                            height="64"
                                            fill="none"
                                            viewBox="0 0 64 64"
                                            >
                                            <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="2"></circle>
                                            <path
                                                fill="currentColor"
                                                d="M14 31a1 1 0 100 2v-2zm36.707 1.707a1 1 0 000-1.414l-6.364-6.364a1 1 0 00-1.414 1.414L48.586 32l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM14 33h36v-2H14v2z"
                                            ></path>
                                            </svg>
                                    </BoxMotion>
                    )}
                
          

                </AnimatePresence>
            </Box>


           
          
          


        </>
    )
}

export default ProtocolData