import { Box, TextField, Typography, type TextFieldProps } from "@mui/material";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import theme from "../../utils/theme";

type IInputField<T = FieldValues> = {
  label: string;
  nameField: Path<T>;
} & TextFieldProps;

function InputField<T extends FieldValues>({
  label,
  nameField,
  ...props
}: IInputField<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[nameField] ? errors[nameField].message : "";
  return (
    <Box>
      <Controller
        name={nameField}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            fullWidth
            error={!!errors[nameField]}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.primary.main,
              },
            }}
            {...props}
          />
        )}
      />
      <Typography
        sx={{
          color: "#ef4444",
          fontSize: "0.75rem",
          mt: 0.5,
          ml: 1.75,
          height: "16px",
        }}
      >
        {error as string}
      </Typography>
    </Box>
  );
}

export default InputField;
