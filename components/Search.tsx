import Input from '@/design-system/primitives/Input'
import {useState} from 'react'
import { styled } from 'stitches.config'

const StyledSearch  = styled(Input, {
    transition:'$all',
    height:'fit-content',
    variants:{
        open:{
            true:{
                width:'320px'
            },
            false:{
                width:'128px'
            }
        }
    },
    defaultVariants:{
        open:false
    }
})

const  Search = () =>{
    const [isOpen, setIsOpen] = useState(false)

    const ToggleSearch = () =>{
        setIsOpen(!isOpen)
    }
   
    return(
        <StyledSearch
        onBlur={ToggleSearch}
        open={isOpen}
        onFocus={ToggleSearch}
        onBeforeInput={()=>{alert('yo!')}}
        type='search' placeholder="search" />
    )
}

export default Search