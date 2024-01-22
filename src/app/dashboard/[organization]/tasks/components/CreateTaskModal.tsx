import Modal from '~/core/ui/Modal';
import TaskForm from './TaskForm';
 
function CreateTaskModal(props: React.PropsWithChildren) {
  return (
    <Modal heading={`Create Task`} Trigger={props.children}>
      <TaskForm />
    </Modal>
  );
}
 
export default CreateTaskModal;