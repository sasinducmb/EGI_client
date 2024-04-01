import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { UserContext } from "../auth/userContext";
import axios from "axios";
function Fedback() {
  const [feedbackmessage, setFeedbackmessage] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { user, isLoading, error } = useContext(UserContext);
  const { id, productName } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`/feedback/getFeedbacks/${id}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleFeedback = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/feedback/addfeedback`, {
        user: user._id,
        product: id,
        message: feedbackmessage,
      });
      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <section class="bg-light py-3 py-md-5">
        <div class="container ">
         
          {feedbacks.length > 0 ? (
            <div className="show-feedback">
              {feedbacks.map((feedback) => (
                <div key={feedback._id}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <FaCircleUser size={25} />
                      <h5 className="mx-2">{feedback.user.name}</h5>
                    </div>
                    <h6 className="d-flex justify-content-end">
                      {new Date(feedback.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h6>
                  </div>
                  <div className="d-flex align-items-center ">
                    <h6 style={{ color: "red", fontWeight: "bold" }}>
                      {feedback.product.productName}
                    </h6>
                    <h6 className="mx-2">{feedback.rating}</h6>
                  </div>
                  <div className="feedback-message">
                    <p>{feedback.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No feedbacks available</p>
          )}
        </div>
      </section>
      <div className="d-flex mx-2 mb-4">
            <div class="container">
              <div class="row justify-content-lg-center">
                <div class="col-12 col-lg-9">
                  <h2 className="text-center">Feedback Form</h2>
                  {message ? (
                    <p className="alert alert-success">{message}</p>
                  ) : errMsg ? (
                    <p className="alert alert-danger">{errMsg}</p>
                  ) : null}
                  <div class="bg-white border rounded shadow-sm overflow-hidden">
                    <form action="#!">
                      <div class="row gy-4 gy-xl-5 p-4 p-xl-5">
                        <div class="col-12">
                          <label for="fullname" class="form-label">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="fullname"
                            name="fullname"
                            value={user && user.name}
                            readOnly
                          />
                        </div>
                        <div class="col-12">
                          <label for="fullname" class="form-label">
                            Product Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="fullname"
                            name="fullname"
                            value={productName && productName}
                            readOnly
                          />
                        </div>
                        <div class="col-12 col-md-12">
                          <label for="email" class="form-label">
                            Email
                          </label>
                          <div class="input-group">
                            <span class="input-group-text">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-envelope"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                              </svg>
                            </span>
                            <input
                              type="email"
                              class="form-control"
                              id="email"
                              name="email"
                              value={user && user.username}
                              readOnly
                            />
                          </div>
                        </div>

                        <div class="col-12">
                          <label for="message" class="form-label">
                            Message
                          </label>
                          <textarea
                            class="form-control"
                            id="message"
                            name="message"
                            rows="3"
                            required
                            onChange={(e) => setFeedbackmessage(e.target.value)}
                          ></textarea>
                        </div>
                        <div class="col-12">
                          <div class="d-grid">
                            <button
                              class="btn btn-primary btn-lg"
                              type="submit"
                              onClick={handleFeedback}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Fedback;
