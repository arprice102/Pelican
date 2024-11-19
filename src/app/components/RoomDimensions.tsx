import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import TextInputWithUnits from "./TextInputWithUnits";

export default function RoomDimensions() {
    const units = [
        {
            value: 'meters',
            label: 'm',
            type: 'metric'
        },
        {
            value: 'feet',
            label: 'ft',
            type: 'imperial'
        }
    ]

    return (
        <div className="roomdimensions">
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                <FormLabel id="unit-type-label">Unit type</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="unit-type-label"
                    defaultValue="metric"
                    name="unit-type-group"
                >
                    <FormControlLabel value="metric" control={<Radio />} label="Metric" />
                    <FormControlLabel value="imperial" control={<Radio />} label="Imperial" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}