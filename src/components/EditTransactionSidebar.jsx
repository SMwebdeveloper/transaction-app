"use client";
import React, { useEffect, useState } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  clearToast,
  setToastText,
  setToastVisibility,
} from "../store/reducer/toastSlice";
import { setLoading } from "../store/reducer/loadingSlice";
import Loader from "./Loader";

function EditTransactionSidebar({ idOrShow, close, editFn }) {
  const [costType, setCostType] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
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
      category: "Benefit",
      costType: "",
      comment: "",
    },
  });

  const category = watch("category"); // watch category

  // fetch single transaction in firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "transaction", idOrShow);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);

        // Ma'lumotni formga o'rnatish
        Object.keys(data).forEach((key) => {
          if (key === "date" && data[key]) {
            setValue(key, data[key].toDate());
          } else {
            setValue(key, data[key]);
          }
        });
      } else {
        console.error("Hujjat topilmadi");
      }
    } catch (error) {
      console.error("Xato ma'lumotni olishda:", error);
    }
    setLoading(false);
  };

  // add form
  const onSubmit = (data) => {
    editFn(data, idOrShow);
    reset();
  };

  useEffect(() => {
    if (category === "Cost") {
      setCostType(true);
    } else {
      setCostType(false);
    }
  }, [category]);

  useEffect(() => {
    if (idOrShow) {
      fetchData();
    }
  }, [idOrShow]);

  return (
    <>
      <Offcanvas
        show={idOrShow}
        onHide={() => {
          close();
          reset();
        }}
        placement="end"
        className="bg-body-tertiary w-auto "
        style={{ minWidth: "300px" }}
      >
        {loading ? (
          <>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-dark"></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Loader />
            </Offcanvas.Body>
          </>
        ) : (
          <>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-dark">
                Edit transaction
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* currency */}
                <Form.Group className="mb-3" controlId="formcurrency">
                  <Form.Label>currency</Form.Label>
                  <Form.Select
                    {...register("currency", {
                      required: "Kategoriya tanlang",
                    })}
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
                    placeholder="Pul"
                    {...register("price", {
                      required: "Narxni kiriting",
                      min: {
                        value: 1,
                        message: "Narx 1 dan katta bo'lishi kerak",
                      },
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
                    onChange={(e) => setCostType(e.target.value === "Cost")}
                  >
                    <option value="Benefit">Benefit</option>
                    <option value="Cost">Cost</option>
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
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Edit
                </Button>
              </Form>
            </Offcanvas.Body>
          </>
        )}
      </Offcanvas>
    </>
  );
}

export default EditTransactionSidebar;
