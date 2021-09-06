  import Box from  '@/design-system/primitives/Box'
  import Button from  '@/design-system/primitives/Button'

  const Introduction = () =>{
    return(
    <Box layout='flexBoxColumn' css={{
            width: '100%',
            // maxWidth:'1336px',
            borderRadius: '$2', marginBottom:'calc($2 * 1)', marginTop: '$2',
            color: 'black',
            background:'radial-gradient(34.16% 121.92% at 27.13% 53.11%, #EBFEEC 0%, #F6F2F9 99.99%, #F9EFFC 100%), conic-gradient(from 50.98deg at 50% 50%, #FAF3CF 0deg, rgba(252, 253, 240, 0) 360deg)',
            padding: '$4 $2', boxSizing: 'border-box', height: 'fit-content', border: '1px solid lightgray'
            }}>
            <Box layout='flexBoxRow' css={{justifyContent:'space-between', padding:'$1 0'}}>
                <Box layout='flexBoxColumn'>
                    <Box as='h1' css={{fontSize:'96px', 
                    animationFillMode:'revert',
                    letterSpacing:'-4px',
                    }}>Vote for the proposals&#8201;—</Box>
                    <Box  as='h1' css={{fontSize:'96px', 
                      fontWeight:'700',
                        // animation:`${fontWeightAnimation} 8s ease-in-out infinite`,
                        animationDelay:'0s',
                        transformOrigin:'center',
                        animationDirection:'alternate-reverse',
                        animationFillMode:'revert',
                        letterSpacing:'-4px', 
                    }}>make difference</Box>
                </Box>
                <Button look='outlined'><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></Button>
            </Box>
            <Box as='p' css={{marginBottom:'$4'}}>Explore open protocols and vote for the changes</Box>
    </Box>
    )
  }

  export default Introduction