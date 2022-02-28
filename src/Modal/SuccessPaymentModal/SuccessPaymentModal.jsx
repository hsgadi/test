import { Button, Col, Modal, Row, Typography } from "antd";
import React from "react";
import "./SuccessPaymentModal.css";
import * as moment from "moment";
import { CustIcon } from "../../Svgs";

const { Title } = Typography;

export const SuccessPaymentModal = ({ visible, onCancel }) => {
  return (
    <Modal centered visible={visible} footer={null} onCancel={onCancel}>
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center pb-3">
            <CustIcon type="success" className="successIcon" />
          </div>
          <Title level={2} className="text-center px-5">
            Payment Successful
          </Title>
        </div>

        <div className="py-3 border-top">
          <strong className="d-block text-center">Thank you</strong>
          <span className="d-block text-center">
            your payment was successful. Check your email for your receipt.
          </span>
        </div>
        <div className="py-3 border-top">
          <Row gutter={16}>
            <Col md={8} className="pb-3">
              <strong>Time</strong>
            </Col>
            <Col md={16} className="text-right">
              <span>
                {moment().format("MMMM DD, YYYY")} at {moment().format("h:mma")}
              </span>
            </Col>
          </Row>
        </div>
        <div className="pt-2">
          <Button type="primary" shape="round" htmlType="submit" block>
            Sign In
          </Button>
        </div>
      </div>
    </Modal>
  );
};
