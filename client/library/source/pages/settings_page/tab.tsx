import * as React from 'react';

interface tabProperties {
  label: string;
  style?: React.CSSProperties;
  isActive: boolean;
  imgSrc: string;
  onClick: () => void;
}

export function Tab(props: tabProperties): JSX.Element {
  const activeStyle = (props.isActive && ACTIVE_TAB_STYLE || {});
  return (
    <div
        style={{...TAB_CONTAINER_STYLE, ...activeStyle, ...props.style}}
        onClick={props.onClick}
    >
      <img style={TAB_ICON_STYLE} src={props.imgSrc} alt='Icon' />
      <div style={TAB_TEXT_STYLE} >{props.label}</div>
    </div>);
}

const TAB_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '12px 15px 12px 10px',
  backgroundColor: '#F6F6F6',
  gap: '10px',
  height: '100%',
  borderTop: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  cursor: 'pointer'
};

const ACTIVE_TAB_STYLE: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  borderTop: '1px solid #F26B55',
  borderBottom: 'none',
  borderLeft: 'none',
  borderRight: 'none'
};

const TAB_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '21px',
  height: '21px',
  color: '#000000',
  textTransform: 'capitalize'
};

const TAB_ICON_STYLE: React.CSSProperties = {
  width: '25px',
  height: '25px',
  backgroundColor: 'transparent'
};
