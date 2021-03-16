import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

const ConfirmModal = (record) => {
  Modal.confirm({
    title: "Delete",
    icon: <ExclamationCircleOutlined />,
    content: `Are you sure you want to delete ${record.firstName} ${record.lastName}.`,
    onOk: () => this.props.deleteUser(record.id),
  });
};
export default ConfirmModal;
