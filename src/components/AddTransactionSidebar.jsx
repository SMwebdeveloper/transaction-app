"use client";
import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/reducer/loadingSlice";
import {
  clearToast,
  setToastText,
  setToastVisibility,
} from "../store/reducer/toastSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import moment from "moment";

function AddTransactionSidebar({ show, close, addFn }) {
  const [costType, setCostType] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  // useForm setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currency: "uzs",
      price: "",
      category: "Cost",
      costType: "",
      comment: "",
    },
  });

  const category = watch("category"); // `category`ni kuzatish

  // `category` o'zgarishiga qarab `costType`ni boshqarish
  useEffect(() => {
    if (category === "Cost") {
      setCostType(true);
    } else {
      setCostType(false);
    }
  }, [category]);

  // OnSubmit function
  const onSubmit = async (data) => {
    addFn(data);
    reset();
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
            Add transaction
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* currency */}
            <Form.Group className="mb-3" controlId="formcurrency">
              <Form.Label>currency</Form.Label>
              <Form.Select
                {...register("currency", { required: "Kategoriya tanlang" })}
              >
                <option value="uzs">UZS</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </Form.Select>
              {errors.currency && (
                <Form.Text className="text-danger">
                  {errors.currency.message}
                </Form.Text>
              )}
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
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
            </Form.Group>

            {/* category */}
            <Form.Group className="mb-3" controlId="formcategory">
              <Form.Label>category</Form.Label>
              <Form.Select
                {...register("category", { required: "Maqsadni tanlang" })}
              >
                <option value="Cost">Cost</option>
                <option value="Benefit">Benefit</option>
                <option value="Damage">Damage</option>
              </Form.Select>
              {errors.category && (
                <Form.Text className="text-danger">
                  {errors.category.message}
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
              <Form.Label>Comment</Form.Label>
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

            <Button
              variant="outline-primary"
              type="submit"
              className="w-100"
              disabled={isLoading}
            >
              Add
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AddTransactionSidebar;
