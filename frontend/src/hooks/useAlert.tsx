import { useState, useCallback } from 'react';

/**
 * Alert types supported by the useAlert hook
 * @typedef {'success' | 'error' | 'warning' | 'info'} AlertType
 */
export type AlertType = 'success' | 'error' | 'warning' | 'info';

/**
 * State interface for the alert
 * @interface AlertState
 */
interface AlertState {
  message: string;
  title?: string;
  type: AlertType;
  isVisible: boolean;
}

/**
 * Custom hook for managing alert notifications in React applications.
 * 
 * @returns {{
*   alert: AlertState,
*   showAlert: (type: AlertType, message: string) => void
* }}
* 
* @example
* // Basic usage
* function MyComponent() {
*   const { alert, showAlert } = useAlert();
*   
*   return (
*     <>
*       <Alert {...alert} />
*       <button onClick={() => showAlert('success', 'It worked!', 10000)}>
*         Show Success
*       </button>
*     </>
*   );
* }
* 
* @example
* // All alert types
* showAlert('success', 'Operation completed successfully', 10000);
* showAlert('error', 'An error occurred', 10000);
* showAlert('warning', 'Please be careful', 10000);
* showAlert('info', 'Just so you know...');
*/
export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showAlert = useCallback(
    (type: AlertType, message: string, title?: string, duration: number = 5000) => {
      setAlert({
        type,
        title,
        message,
        isVisible: true,
      });

    // Auto-hide after 5 seconds
    setTimeout(() => {
        setAlert((prev) => ({ ...prev, isVisible: false }));
      }, duration);
    },
    []
  );

  return {
    alert,
    showAlert,
  };
};

export default useAlert;
