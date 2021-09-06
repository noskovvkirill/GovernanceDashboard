import { styled } from "stitches.config";
import * as SliderPrimitive from "@radix-ui/react-slider";

const StyledSlider = styled(SliderPrimitive.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: '100%',

  '&[data-orientation="horizontal"]': {
    height: 20
  },

  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: 20,
    height: 100
  }
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: 'gray',
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 }
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: "absolute",
  backgroundColor: "lightgray",
  borderRadius: "9999px",
  height: "100%"
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: "unset",
  display: "block",
  width: 20,
  height: 20,
  backgroundColor: "$foreground",
  borderRadius: 10,
  "&:hover": { backgroundColor: 'black' },
  "&:focus": { boxShadow: `0 0 0 2px rgba(0,0,0,0.1)` }
});

interface SliderProps {
    onChange:(newValue:number[])=>void;
}

const SliderDemo = ({onChange}:SliderProps) => (
  <StyledSlider
    onValueChange={onChange}
    minStepsBetweenThumbs={0}
    defaultValue={[144, 400]}
    min={144}
    max={800}
    step={10}
    aria-label="Volume"
  >
    <StyledTrack>
      <StyledRange />
    </StyledTrack>
    <StyledThumb />
    <StyledThumb />
  </StyledSlider>
);

export default SliderDemo;
