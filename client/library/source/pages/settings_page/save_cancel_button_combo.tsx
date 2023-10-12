import * as React from 'react';
import { PrimaryTextButton, SecondaryTextButton } from '../../components';

interface Properties {
  onSave: () => void;
  onCancel: () => void;
}

export function SaveCancelButtonCombo(props: Properties) {
  return (
    <div style={CONTAINER_STYLE} >
      <PrimaryTextButton label='save' style={BUTTON_STYLE}
        onClick={props.onSave} />
      <SecondaryTextButton label='cancel' style={BUTTON_STYLE}
        onClick={props.onCancel} />
    </div>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '20px',
  marginTop: '20px',
  marginBottom: '30px'
};

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  minHeight: '35px',
  height: '35px',
  width: 'auto',
  paddingLeft: '36px',
  paddingRight: '36px',
  justifyContent: 'center',
  alignItems: 'center'
};
