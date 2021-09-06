import { styled } from "../../stitches.config";

const StyledButton = styled("button", {
    transition: "$background",
    userSelect: "none",
    fontSize: "$p",
    width: "fit-content",
    borderRadius: "$1",
    display: "flex",
    cursor: "pointer",
    lineHeight: "130%",
    height: "fit-content",
    whiteSpace: "nowrap",
    backgroundColor: "transparent",
    alignItems:'center',
    gap:"$0",
    padding:'$1',
    border: "0",
    variants: {
        selected:{
            true:{

            },
            false:{

            },
        },
        color:{
            gray:{
                color:'gray'
            },
            black:{
                color:'black'
            },
        },
        look: {
            default: {
        
                "&:focus": {
                    
                },
                "&:active": {
                   
                },
                "&:hover": {
                    
                },
                "&:disabled": {
                    
                },
            },
            outlined: {
                border:'1px solid',
                borderColor:'lightgray',
                "&:hover": {
                  color:'black',
                },
                "&:focus": {
               
                },
                "&:active": {
                  
                },
                "&:disabled": {
                  
                },
            },
            color:{

            }
        },
    },
    compoundVariants: [
        {
            color: 'black',
            look: 'outlined',
            css: {
                color: 'black',
                borderColor: 'black',
                '&:hover': {
                    color: 'white',
                    backgroundColor:'$black'
                },
                '&:active':{
                    color: 'white',
                    backgroundColor: '$black'
                }
            },
        },
        {
            color: 'black',
            look: 'outlined',
            selected:'true',
            css: {
                borderColor: 'black',
                color: 'white',
                backgroundColor: '$black',
                '&:hover': {
                    color: 'white',
                    backgroundColor: '$black'
                },
                '&:active': {
                    color: 'white',
                    backgroundColor: '$black'
                }
            },
        },
        {
            color:'gray',
            look:'outlined',
            selected:'false',
            css:{
                borderColor:'lightgray',
                color:'gray',
                '&:hover':{
                    borderColor:'black',
                    color:'black'
                }
            }
        }
    ],
    defaultVariants: {
        look: "default",
        color:'gray',
        selected:'false'
    },
});

export default StyledButton;