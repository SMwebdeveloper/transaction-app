"use client";
import React, { useEffect, useState } from "react";
import { Offcanvas, Button, Form, Badge } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

function EditTransactionSidebar({ show, close, id }) {
  const [moneyStatus, setMoneyStatus] = useState("UZS");
  const [costType, setCostType] = useState(false);

  // useForm setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "uzs",
      price: "",
      purpose: "Benefit",
      costType: "Car",
      comment: "",
      date: null,
    },
  });
  const purpose = watch("purpose"); // `purpose`ni kuzatish
  const selectedDate = watch("date");
  useEffect(() => {
    if (purpose === "Cost") {
      setCostType(true);
    } else {
      setCostType(false);
    }
  }, [purpose]);
  // OnSubmit function
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    close(); // Sidebarni yopish
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={close}
        placement="end"
        className="bg-body-tertiary w-auto"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-dark">
            Edit transaction
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Category */}
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                {...register("category", { required: "Kategoriya tanlang" })}
              >
                <option value="uzs">UZS</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </Form.Select>
              {errors.category && (
                <Form.Text className="text-danger">
                  {errors.category.message}
                </Form.Text>
              )}
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Pul"
                {...register("price", {
                  required: "Narxni kiriting",
                  min: { value: 1, message: "Narx 1 dan katta bo'lishi kerak" },
                })}
              />
              {errors.price && (
                <Form.Text className="text-danger">
                  {errors.price.message}
                </Form.Text>
              )}
              <div className="d-flex align-items-center mt-2">
                <h4 className="h5 d-flex align-items-center">
                  UZS:{" "}
                  <Badge bg="info" className="mx-2">
                    0
                  </Badge>
                </h4>
                <h4 className="h5 d-flex align-items-center">
                  USD:{" "}
                  <Badge bg="info" className="mx-2">
                    0
                  </Badge>
                </h4>
                <h4 className="h5 d-flex align-items-center">
                  EUR:{" "}
                  <Badge bg="info" className="mx-2">
                    0
                  </Badge>
                </h4>
              </div>
            </Form.Group>

            {/* Purpose */}
            <Form.Group className="mb-3" controlId="formPurpose">
              <Form.Label>Purpose</Form.Label>
              <Form.Select
                {...register("purpose", { required: "Maqsadni tanlang" })}
                onChange={(e) => setCostType(e.target.value === "Cost")}
              >
                <option value="Benefit">Benefit</option>
                <option value="Cost">Cost</option>
                <option value="Damage">Damage</option>
              </Form.Select>
              {errors.purpose && (
                <Form.Text className="text-danger">
                  {errors.purpose.message}
                </Form.Text>
              )}
            </Form.Group>

            {/* Cost Type */}
            {costType && (
              <Form.Group className="mb-3" controlId="formCostType">
                <Form.Label>Cost type</Form.Label>
                <Form.Select
                  {...register("costType", { required: "Turi tanlang" })}
                >
                  <option value="car">Car</option>
                  <option value="food">Food</option>
                  <option value="utility service">Utility service</option>
                </Form.Select>
                {errors.costType && (
                  <Form.Text className="text-danger">
                    {errors.costType.message}
                  </Form.Text>
                )}
              </Form.Group>
            )}

            {/* Comment */}
            <Form.Group className="mb-3" controlId="formComment">
              <Form.Label>Izoh</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                {...register("comment", {
                  maxLength: {
                    value: 200,
                    message: "Izoh 200 belgidan oshmasligi kerak",
                  },
                })}
              />
              {errors.comment && (
                <Form.Text className="text-danger">
                  {errors.comment.message}
                </Form.Text>
              )}
            </Form.Group>

            {/* Date Picker */}
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Pick a date:</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setValue("date", date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
              />
              {errors.date && (
                <Form.Text className="text-danger">
                  {errors.date.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="outline-primary" type="submit" className="w-100">
              Edit
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default EditTransactionSidebar;
