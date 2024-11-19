import { Input, InputAdornment, FormHelperText } from "@mui/material";
import toSentenceCase from "../library/toSentenceCase";

export default function TextInputWithUnits({
    units, 
    label, 
    onChange
} : {
    units: string,
    label: string,
    onChange: () => void
}) {
    const labelText = toSentenceCase(label);

    return (
        <>
            <Input
                id="standard-adornment-weight"
                endAdornment={<InputAdornment position="end">{units}</InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                    'aria-label': 'weight',
                }}
            />
            <FormHelperText id="standard-weight-helper-text">{labelText}</FormHelperText>
        </>
    )
}