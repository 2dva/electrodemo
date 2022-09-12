import { ReactNode, useEffect, useState } from 'react';
import { Avatar, Snackbar } from '@vkontakte/vkui';
import { Icon16Done, Icon16ErrorCircle } from '@vkontakte/icons';
import { modalStore } from '../stores/modalStore';

export const Toast = () => {
  const [snackbar, setSnackbar] = useState<ReactNode | null>(null);

  const onCloseSnackbar = () => {
    modalStore.hideToast();
    setSnackbar(null);
  };

  const openBase = () => {
    if (snackbar || !modalStore.toast.open) return;
    setSnackbar(
      <Snackbar
        onClose={onCloseSnackbar}
        before={
          <Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
            {modalStore.toast.status === 'valid' && <Icon16Done fill="#fff" width={14} height={14} />}
            {modalStore.toast.status === 'error' && <Icon16ErrorCircle fill="#fff" width={14} height={14} />}
          </Avatar>
        }
      >
        {modalStore.toast.text}
      </Snackbar>
    );
  };

  useEffect(() => {
    openBase();
  }, [modalStore.toast.open]);

  return <>{snackbar}</>;
};
