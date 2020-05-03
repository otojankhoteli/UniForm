import * as React from 'react';

export const isMountedRef = React.createRef<boolean | null>();

export const navigationRef = React.createRef<any>();

export function navigate(name, params = null) {
  if ( navigationRef.current) {
    // Perform navigation if the app has mounted
    (navigationRef.current as any).navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}