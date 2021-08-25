import Box from '@/design-system/primitives/Box'
import { BoxMotion } from '@/design-system/primitives/Box'
import ProtocolCard from './ProtocolCard'
import {  AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import axios from 'axios'
import { useEffect, useState } from 'react'



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






const ProtocolData = ({ name, border, shadow, background }: { name?: string, background: string, border: string, shadow: string }) => {
    const { data, error, isValidating } = useSWR(`https://api.boardroom.info/v1/protocols/${name}/proposals`, fetcher)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        console.log('data proposals', data)
    }, [data])

    if (error) {
        return (<></>)
    }
    if (isValidating) {
        return (
            <Box css={{ height: 'auto' }}>Loading</Box>
        )
    }

    return (
        <>
            <Box layout='flexBoxRow' css={{
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginBottom:'$2',
                gap: '$0',
                width: '100%', flexWrap: 'nowrap',
            }}>
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

            <Box layout='flexBoxRow'
            css={{position:'relative'}}
            >
                <AnimatePresence>

                    {selected > 0 && (
                        <>
                            {[data.data.find((_: any, i: number) => i === selected - 1)].map((item: ProtocolData)=>{
                            return(
                                <BoxMotion
                                    css={{
                                        position: 'absolute',
                                        width: '100%',
                                        border: `1px solid ${border}`,
                                        height: '100%',
                                        opacity: '0.3',
                                        borderRadius: '$2',
                                        left: '-1024px'
                                    }}
                                    onClick={() => {
                                        setSelected(selected - 1)
                                    }}
                                    key={item.refId + 'pref'}>
                                </BoxMotion>
                            )
                        })}
                      
                        </>
                    )}

                    {data.data.map((item: ProtocolData, i: number) => {
                        if (i === selected) {
                            return (
                                <ProtocolCard
                                key={item.refId}
                                border={border}
                                background={background}
                                shadow={shadow}
                                item={item}
                                i={i}
                                />
                            )
                        } else {
                            return (<></>)
                        }
                    })}

                    {selected < data.data.length - 1 && (
                        <>
                            {[data.data.find((_: any, i: number) => i === selected + 1)].map((item: ProtocolData) => {
                                return (
                                    <BoxMotion 
                                        initial={{ position: 'absolute', opacity: 0,  }}
                                        animate={{ position: 'absolute', opacity: 0.5, }}
                                        exit={{ position: 'absolute', opacity: 0 }}
                                        transition={{duration:1.5}}
                                        css={{
                                        right: '-1066px',
                                        cursor:'pointer',
                                        width:'100%',
                                        border:`1px solid ${border}`,
                                        height:'100%',
                                        opacity:'0.1',
                                        borderRadius:'$2',
                                }}
                                    onClick={()=>{
                                        setSelected(selected + 1)
                                    }}
                                    key={item.refId+'next'}>
                                    </BoxMotion>
                                )
                            })}
                          
                        </>
                    )}

                </AnimatePresence>
            </Box>


           
          
          


        </>
    )
}

export default ProtocolData