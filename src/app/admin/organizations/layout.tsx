function OrganizationsLayout(
  props: React.PropsWithChildren<{
    modal: React.ReactNode;
  }>,
) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  );
}

export default OrganizationsLayout;
