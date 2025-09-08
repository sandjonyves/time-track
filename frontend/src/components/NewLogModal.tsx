
import type { NewLogModalProps } from "../types";
import TimeLogForm from "./TimeLogForm";
import ModalWrapper from "./ui/ModalWrapper";

const NewLogModal: React.FC<NewLogModalProps> = (props) => {
  const isTimerSession = props.startTime && props.endTime;
  return (
    <ModalWrapper
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={isTimerSession ? "Save Timer Session" : "Add New Time Log"}
    >
      <TimeLogForm {...props} onClose={props.onClose} />
    </ModalWrapper>
  );
};

export default NewLogModal;
