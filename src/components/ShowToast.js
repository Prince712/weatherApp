export const ShowToast = (title, Toast,status='warning',id = 'toast',) => {
  // let id = 'toast';
  if (!Toast.isActive(id)) {
    Toast.show({
      id,
      title: title,
      placement: 'top',
      status: status,
    });
  }
};

export const ShowToastError = (title, Toast, id = 'toast') => {
    // let id = 'toast';
    if (!Toast.isActive(id)) {
      Toast.show({
        id,
        title: title,
        placement: 'top',
        status: 'error',
      });
    }
  };