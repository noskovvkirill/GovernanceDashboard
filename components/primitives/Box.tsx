/* eslint-disable react/display-name */
import { styled } from "stitches.config";
import {motion} from  'framer-motion'
import React from 'react'


const Box = styled("div", {
    padding: 0,
    textTransform:'unset',
    variants: {
        look: {
            default: {
            },
        },
        layout: {
            default: {
                display: "auto",
            },
            flexBoxRow: {
                display: "flex",
                flexDirection: "row",
                gap: "$1",
            },
            flexBoxColumn: {
                display: "flex",
                flexDirection: "column",
                gap: "$1",
            },
        },
    },
    defaultVariants: {
        look: "default",
        layout: "default",
    },
});
export default Box;


const Component = React.forwardRef((props:any, ref:any) => (
    <Box {...props} ref={ref} />
))

export const BoxMotion = motion(Component)

