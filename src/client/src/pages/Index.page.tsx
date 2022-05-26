import React, { useContext, useEffect } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Sex } from "../types/Sex";
import enumKeys from "../utils/enumArray";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DefaultStudentInfo, StudentInfo } from "../types/StudentInfo";
import { AddressType } from "../types/AddressType";
import { CohabitationStatus } from "../types/CohabitationStatus";
import { Binary } from "../types/Binary";
import { parseIntOrEmpty } from "../utils/parseIntOrEmpty";
import Server from "../services/Server";
import { useNotifier } from "../hooks/notifier";
import { useNavigate } from "react-router-dom";
import { PredictionContext } from "../contexts/prediction.context";
import { useStorage } from "../hooks/useStorage";

export const IndexPage = () => {
  const { setPrediction } = useContext(PredictionContext);
  const { form, setForm, loading } = useStorage();
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotifier();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<StudentInfo>({
    defaultValues: DefaultStudentInfo,
  });

  useEffect(() => {
    reset(form);
  }, [reset, form]);

  const submit: SubmitHandler<StudentInfo> = async (data) => {
    try {
      const prediction = await Server.getPrediction(data);
      setPrediction(prediction);
      setForm(data);
      showSuccess("Successfully predicted");
      navigate("/result");
    } catch (e) {
      showError(e);
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography
          variant={"h4"}
          component={"div"}
          sx={{ textAlign: "center" }}
        >
          Please provide some information
        </Typography>
      </Grid>
      <Grid item xs={12} md={9} lg={6}>
        <Stack
          component={"form"}
          autoCorrect={"off"}
          spacing={3}
          onSubmit={handleSubmit(submit)}
        >
          <Controller
            name="sex"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.sex}>
                <InputLabel>Sex</InputLabel>
                <Select
                  value={field.value}
                  label="Sex"
                  onChange={field.onChange}
                >
                  {enumKeys(Sex).map((key) => (
                    <MenuItem value={Sex[key]} key={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.sex?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name={"age"}
            control={control}
            rules={{
              required: { value: true, message: "Required" },
              min: { value: 15, message: "Min - 15" },
              max: { value: 22, message: "Max - 22" },
            }}
            render={({ field }) => (
              <TextField
                error={!!errors.age && !!errors.age.message}
                helperText={errors.age?.message}
                label="Age"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
                type={"number"}
                value={field.value}
                onChange={(e) =>
                  field.onChange(parseIntOrEmpty(e.target.value))
                }
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.address}>
                <InputLabel>Address</InputLabel>
                <Select
                  value={field.value}
                  label="Address"
                  onChange={field.onChange}
                >
                  {enumKeys(AddressType).map((key) => (
                    <MenuItem value={AddressType[key]} key={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.address?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="Pstatus"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.address}>
                <InputLabel>Parent's cohabitation status</InputLabel>
                <Select
                  value={field.value}
                  label="Parent's cohabitation status"
                  onChange={field.onChange}
                >
                  {enumKeys(CohabitationStatus).map((key) => (
                    <MenuItem value={CohabitationStatus[key]} key={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.address?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="traveltime"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.traveltime}>
                <InputLabel>Travel time</InputLabel>
                <Select
                  value={field.value}
                  label="Travel time"
                  onChange={field.onChange}
                >
                  <MenuItem value={1}>{"< 15 min"}</MenuItem>
                  <MenuItem value={2}>{"15 to 30 min"}</MenuItem>
                  <MenuItem value={3}>{"30 min to 1 hour"}</MenuItem>
                  <MenuItem value={4}>{"> 1 hour"}</MenuItem>
                </Select>
                <FormHelperText>{errors.traveltime?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="studytime"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.studytime}>
                <InputLabel>Study time</InputLabel>
                <Select
                  value={field.value}
                  label="Study time"
                  onChange={field.onChange}
                >
                  <MenuItem value={1}>{"< 2 hours"}</MenuItem>
                  <MenuItem value={2}>{"2 to 5 hours"}</MenuItem>
                  <MenuItem value={3}>{"5 to 10 hours"}</MenuItem>
                  <MenuItem value={4}>{"> 10 hours"}</MenuItem>
                </Select>
                <FormHelperText>{errors.studytime?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="failures"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.failures}>
                <InputLabel>Failures</InputLabel>
                <Select
                  value={field.value}
                  label="Failures"
                  onChange={field.onChange}
                >
                  <MenuItem value={0}>{"0 times"}</MenuItem>
                  <MenuItem value={1}>{"1 time"}</MenuItem>
                  <MenuItem value={2}>{"2 times"}</MenuItem>
                  <MenuItem value={3}>{"3 times"}</MenuItem>
                  <MenuItem value={4}>{">= 4 times"}</MenuItem>
                </Select>
                <FormHelperText>{errors.failures?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="famsup"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.famsup}>
                <InputLabel>Family educational support</InputLabel>
                <Select
                  value={field.value}
                  label="Family educational support"
                  onChange={field.onChange}
                >
                  {enumKeys(Binary).map((key) => (
                    <MenuItem value={Binary[key]} key={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.famsup?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="activities"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.activities}>
                <InputLabel>Extra-curricular activities</InputLabel>
                <Select
                  value={field.value}
                  label="Extra-curricular activities"
                  onChange={field.onChange}
                >
                  {enumKeys(Binary).map((key) => (
                    <MenuItem value={Binary[key]} key={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.activities?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="romantic"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.romantic}>
                <InputLabel>With a romantic relationship</InputLabel>
                <Select
                  value={field.value}
                  label="With a romantic relationship"
                  onChange={field.onChange}
                >
                  {enumKeys(Binary).map((key) => (
                    <MenuItem value={Binary[key]} key={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.romantic?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="famrel"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.famrel}>
                <InputLabel>Quality of family relationships</InputLabel>
                <Select
                  value={field.value}
                  label="Quality of family relationships"
                  onChange={field.onChange}
                >
                  <MenuItem value={1}>{"Very bad"}</MenuItem>
                  <MenuItem value={2}>{"Below average"}</MenuItem>
                  <MenuItem value={3}>{"Medium"}</MenuItem>
                  <MenuItem value={4}>{"Above average"}</MenuItem>
                  <MenuItem value={5}>{"Excellent"}</MenuItem>
                </Select>
                <FormHelperText>{errors.famrel?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="freetime"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.freetime}>
                <InputLabel>Free time after school</InputLabel>
                <Select
                  value={field.value}
                  label="Free time after school"
                  onChange={field.onChange}
                >
                  <MenuItem value={1}>{"Very low"}</MenuItem>
                  <MenuItem value={2}>{"Below average"}</MenuItem>
                  <MenuItem value={3}>{"Medium"}</MenuItem>
                  <MenuItem value={4}>{"Above average"}</MenuItem>
                  <MenuItem value={5}>{"Very high"}</MenuItem>
                </Select>
                <FormHelperText>{errors.freetime?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="goout"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.goout}>
                <InputLabel>Going out with friends</InputLabel>
                <Select
                  value={field.value}
                  label="Going out with friends"
                  onChange={field.onChange}
                >
                  <MenuItem value={1}>{"Very low"}</MenuItem>
                  <MenuItem value={2}>{"Below average"}</MenuItem>
                  <MenuItem value={3}>{"Medium"}</MenuItem>
                  <MenuItem value={4}>{"Above average"}</MenuItem>
                  <MenuItem value={5}>{"Very high"}</MenuItem>
                </Select>
                <FormHelperText>{errors.goout?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="health"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.health}>
                <InputLabel>Current health status</InputLabel>
                <Select
                  value={field.value}
                  label="Current health status"
                  onChange={field.onChange}
                >
                  <MenuItem value={1}>{"Very low"}</MenuItem>
                  <MenuItem value={2}>{"Below average"}</MenuItem>
                  <MenuItem value={3}>{"Medium"}</MenuItem>
                  <MenuItem value={4}>{"Above average"}</MenuItem>
                  <MenuItem value={5}>{"Very high"}</MenuItem>
                </Select>
                <FormHelperText>{errors.health?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name={"absences"}
            control={control}
            rules={{
              required: { value: true, message: "Required" },
              min: { value: 0, message: "Min - 0" },
              max: { value: 93, message: "Max - 93" },
            }}
            render={({ field }) => (
              <TextField
                error={!!errors.absences && !!errors.absences.message}
                helperText={errors.absences?.message}
                label="Number of absences"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
                type={"number"}
                value={field.value}
                onChange={(e) =>
                  field.onChange(parseIntOrEmpty(e.target.value))
                }
              />
            )}
          />

          <Button type={"submit"}>Submit</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
