import {styled,  keyframes} from 'stitches.config'
import Box from '@/design-system/primitives/Box'



const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
})

const StyledLoader = styled(Box,{
  borderRadius: '$round',
  width:'$2',
  height: '$2',
  animation:`${spin} 2s linear infinite`
})

const Loader = ({border='rgba(0,0,0,0.25)', spinner='rgba(0,0,0,0.45)'}:{border?:string, spinner?:string}) =>{
    return(
       <StyledLoader 
       css={{
        border: `4px solid ${border}`,
        borderTop: `4px solid ${spinner}`,
       }}
       />
    )
}

export default Loader