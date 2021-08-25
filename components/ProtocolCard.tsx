import Box, { BoxMotion } from "@/design-system/primitives/Box"
import Button from '@/design-system/primitives/Button'
import { ProtocolData}  from  '@/design-system/ProtocolData'
import Markdown from 'markdown-to-jsx';
import {keyframes, styled} from 'stitches.config'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const rotateAnimation = keyframes({
    '0%': { transform: 'rotate(0)' },
    '100%': { transform: 'rotate(360deg)' },
});

const StyledCard = styled(BoxMotion,{
    boxSizing: 'border-box',
    width: '1024px',
    height: '512px', overflow: 'hidden',
    borderRadius: '$2'
})

type Card ={
    shadow:string,
    background:string,
    border:string,
    i:number,
    item: ProtocolData
}

const ProtocolCard = ({shadow, background, border, item, i}:Card) =>{
    return(
        <StyledCard
            initial={{ position: 'absolute', opacity: 0, right: '-200%' }}
            animate={{ position: 'relative', opacity: 1, right: i > 0 ? '-2%' : '0%' }}
            exit={{ position: 'absolute', opacity: 1, left: '-200%' }}
            transition={{ duration: 0.5 }}
            css={{background: background, boxShadow: shadow, border: `1px solid ${border}`}}>


            <Box layout='flexBoxRow' css={{
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: shadow,
                borderBottom: `1px solid ${border}`, padding: '$1 $2'
            }}>
                <Box layout='flexBoxRow' css={{gap: '$0'}}>
                    <Box css={{transformOrigin: '50% 51%', animation: item.currentState === 'active' ? `${rotateAnimation} 3.2s linear` : 'none',  animationIterationCount: 'infinite'}}>
                        {item.currentState === 'active' && <>✷</>}
                        {item.currentState === 'executed' && <>✔︎</>}
                        {item.currentState === 'closed' && <>✘</>}
                    </Box> 
                    {item.currentState.toUpperCase()}
                </Box>
                <Box layout='flexBoxRow'
                    css={{ alignItems: 'center', fontSize: '$6' }}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        {item.proposer}
                </Box>
            </Box>



            <Box layout='flexBoxColumn' css={{ padding: '$4' }}>
                <Box as='h3'>{item.title}</Box>
                <Box css={{
                    'p': {
                        marginBottom: "$2",
                    },
                    padding: '$2 0', maxWidth: '960px'
                }}>
                    <Markdown>{item.content}</Markdown>
                </Box>
            </Box>

            <Box layout='flexBoxRow' css={{
                position: 'absolute',
                boxSizing: 'border-box',
                bottom: '0',
                justifyContent: 'space-between',
                gap: '$2',
                width: '100%',
                padding: '$2'
            }}>
                <Box layout='flexBoxRow' css={{ gap: '$1' }}>
                    {item.results.map((option: any) => {
                        return (
                            <Box
                                css={{
                                    gap: '$0',
                                    alignItems: 'center',
                                    boxShadow: shadow,
                                    background: background,
                                    padding: '$0 $2', borderRadius: '$2', border: `1px solid ${border}`
                                }}
                                layout='flexBoxRow'
                                key={option.choice}>
                                <b>{option.total}</b>{item.choices[option.choice]}</Box>
                        )
                    })}
                </Box>

                <Button
                    look='outlined'
                    css={{
                        color: 'inherit',
                        alignItems: 'center',
                        gap: '$1',
                        boxShadow: shadow,
                        background: background,
                        padding: '$1', borderRadius: '$2', border: `1px solid ${border}`
                    }}
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </Button>

            </Box>

        </StyledCard>
    )
}

export default ProtocolCard