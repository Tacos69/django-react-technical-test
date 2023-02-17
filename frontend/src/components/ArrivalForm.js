import { useRef, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";
import CheckButton from "react-validation/build/button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const validateName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The Name must be between 2 and 20 characters.
      </div>
    );
  }
};

const ArrivalForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const { data, setFormData, setDisplay } = props;
  const [date, setDate] = useState(
    dayjs(data && data.arrivedAt ? data.arrivedAt : "2014-08-18T21:11:54")
  );
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    setFormData({ ...data, name: e.target.value });
  };

  const onChangeDateTime = (e) => {
    setDate(e);
  };

  const handleArrival = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const convertedDate = date.format();

      data.arrivedAt = convertedDate;
      UserService.updateArrival(data).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setDisplay(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div
        className="card card-container"
        style={{
          width: 600,
          margin: "auto",
          borderRadius: "20px",
        }}
      >
        <Form onSubmit={handleArrival} ref={form}>
          {!successful && (
            <div>
              <div className="form-group" style={{ margin: "20px" }}>
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={data ? data.name : ""}
                  onChange={onChangeName}
                  validations={[required, validateName]}
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div
                className="form-group"
                style={{
                  margin: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="arrivedAt">Date of arrival</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date&Time picker"
                    value={date}
                    onChange={onChangeDateTime}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className="form-group" style={{ margin: "20px" }}>
                <button
                  className="btn btn-primary btn-block"
                  style={{ borderRadius: "20px" }}
                >
                  {data && data.id ? "Update arrival" : "Create arrival"}
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div
          className="form-group"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        >
          <button
            className="btn btn-secondary btn-block"
            style={{ borderRadius: "20px" }}
            onClick={() => setDisplay(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrivalForm;
