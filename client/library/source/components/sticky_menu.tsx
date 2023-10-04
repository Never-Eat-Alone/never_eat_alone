import * as React from 'react';
import { PrimaryTextButton, SecondaryTextButton } from '../components';
import { DisplayMode } from '../definitions';

interface Properties extends React.HTMLAttributes<HTMLDivElement> {
  displayMode: DisplayMode;
  isSaveDisabled: boolean;

  /** Indicates the save button is clicked. */
  onSaveClick: () => void;

  /** Indicates the cancel button is clicked. */
  onCancelClick: () => void;
}

/** Displays the sticky menu on pages with save and cancel buttons. */
export function SaveCancelStickyMenu({ displayMode, isSaveDisabled, onSaveClick,
    onCancelClick, ...props }: Properties) {
  const contentStyle = (() => {
    if (displayMode === DisplayMode.MOBILE) {
      return MOBILE_CONTENT_CONTAINER;
    }
    return CONTENT_STYLE;
  })();
  return (
    <div {...props} style={{...CONTAINER_STYLE, ...props.style}} >
      <div style={contentStyle} >
        <PrimaryTextButton
          label='Save'
          style={SAVE_BUTTON_STYLE}
          disabled={isSaveDisabled}
          onClick={onSaveClick}
        />
        <SecondaryTextButton
          label='Cancel'
          style={CANCEL_BUTTON_STYLE}
          labelStyle={CANCEL_TEXT_STYLE}
          onClick={onCancelClick}
        />
      </div>
    </div>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'sticky',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '111px',
  backgroundColor: '#FFFFFF',
  bottom: '0px',
  left: '0px',
  right: '0px',
  boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.05)'
};

const CONTENT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '530px',
  height: '100%',
  gap: '20px'
};

const MOBILE_CONTENT_CONTAINER: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '100%',
  padding: '20px'
};

const SAVE_BUTTON_STYLE: React.CSSProperties = {
  width: '98px',
  height: '35px'
};

const CANCEL_BUTTON_STYLE: React.CSSProperties = {
  width: '113px',
  height: '35px'
};

const CANCEL_TEXT_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px'
};
