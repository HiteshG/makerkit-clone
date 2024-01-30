import Modal from '~/core/ui/Modal';
import TaskForm from './TaskForm';
import Trans from '~/core/ui/Trans';
 
function CreateTaskModal(props: React.PropsWithChildren) {
  return (
    <Modal heading={<Trans i18nKey={'task:createTaskLabel'} />} Trigger={props.children}>
      <TaskForm />
    </Modal>
  );
}
 
export default CreateTaskModal;