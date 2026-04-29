import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/form.png";
import TrackVisibility from "react-on-screen";
import emailjs from 'emailjs-com';

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    try {
      // EmailJS configuration - Replace these with your actual EmailJS credentials
      // 1. Go to https://www.emailjs.com/ and create an account
      // 2. Add an email service (Gmail, Outlook, etc.)
      // 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}, {{to_email}}, {{reply_to}}
      // 4. Replace the IDs below with your actual EmailJS credentials
      const serviceId = 'your_service_id'; // Get this from EmailJS dashboard -> Email Services
      const templateId = 'your_template_id'; // Get this from EmailJS dashboard -> Email Templates
      const userId = 'your_user_id'; // Get this from EmailJS dashboard -> Account -> General

      // Prepare email parameters
      const templateParams = {
        from_name: `${formDetails.firstName} ${formDetails.lastName}`,
        from_email: formDetails.email,
        phone: formDetails.phone,
        message: formDetails.message,
        to_email: '20235939@fue.edu.eg', // Your email address
        reply_to: formDetails.email
      };

      // Send email using EmailJS
      const result = await emailjs.send(serviceId, templateId, templateParams, userId);

      if (result.status === 200) {
        setStatus({
          success: true,
          message: "Message sent successfully! I'll get back to you soon."
        });
        setFormDetails(formInitialDetails); // Reset form
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email send error:', error);
      setStatus({
        success: false,
        message: "Failed to send message. Please try again or contact me directly."
      });
    } finally {
      setButtonText("Send");
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>

          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) =>
                            onFormUpdate("firstName", e.target.value)
                          }
                        />
                      </Col>

                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) =>
                            onFormUpdate("lastName", e.target.value)
                          }
                        />
                      </Col>

                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address"
                          onChange={(e) =>
                            onFormUpdate("email", e.target.value)
                          }
                        />
                      </Col>

                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone No."
                          onChange={(e) =>
                            onFormUpdate("phone", e.target.value)
                          }
                        />
                      </Col>

                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Message"
                          onChange={(e) =>
                            onFormUpdate("message", e.target.value)
                          }
                        ></textarea>

                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>

                      {status.message && (
                        <Col>
                          <p
                            className={
                              status.success === false
                                ? "danger"
                                : "success"
                            }
                          >
                            {status.message}
                          </p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

